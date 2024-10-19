import { GeneralContainer } from 'app/components/containers';
import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Table } from 'antd';
import { useSlice } from 'app/features/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  productosDeleteLoadingSelector,
  productosSelector,
  productosSelectorLoading,
  productosUpdateLoadingSelector,
} from 'app/features/slice/selectors';
import { ProductEntityGetAll } from 'app/api/products/types';
import { Entity, ResponseState } from 'app/features/slice/types';
import {
  DELETE_PRODUCT,
  LOAD_CATEGORIAS_LIST,
  LOAD_PRODUCTOS_LIST,
  UPDATE_PRODUCT,
} from 'app/features/slice/sagaActions';
import { Spin } from 'antd';
import { notification } from 'antd';
import CustomSelect from 'app/features/customSelect';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useNavigate } from 'react-router-dom';

export function ListaProductos() {
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Nombre',
      dataIndex: 'nombre',
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'descripcion',
    },
    {
      key: '4',
      title: 'Precio',
      dataIndex: 'precio',
    },
    {
      key: '5',
      title: 'Categoría',
      dataIndex: 'categoriaNombre',
    },
    {
      key: '6',
      title: 'Actions',
      render: record => {
        return (
          <>
            <EditOutlined onClick={() => handleEditProduct(record.id)} />
            <DeleteOutlined
              onClick={() => onDeleteProduct(record)}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleEditProduct = id => {
    navigate(`/editarProducto/${id}`); // Navega a la ruta con el ID como parámetro
  };
  //   Context
  const { categorias, loadingCategorias, themeColors, productosSaveLoading } =
    useGeneralContext();

  const { actions } = useSlice();
  const dispatch = useDispatch();

  //Productos Selectors
  const productos = useSelector(productosSelector);
  const loadingProductos = useSelector(productosSelectorLoading);
  const loadingDeleteProduct = useSelector(productosDeleteLoadingSelector);
  const loadingUpdateProduct = useSelector(productosUpdateLoadingSelector);

  const [loadingSpinProductos, setLoadingSpinProductos] =
    useState<boolean>(false);
  const [loadingSpinDeleteProductos, setLoadingSpinDeleteProductos] =
    useState<boolean>(false);
  const [loadingSpinUpdateProductos, setLoadingSpinUpdateProductos] =
    useState<boolean>(false);

  const [categoriaListState, setCategoriaListState] = useState<Entity[]>([]);

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [productosListState, setProductosListState] = useState<
    ProductEntityGetAll[]
  >([]);
  const [loadingSpinCategorias, setLoadingSpinCategorias] =
    useState<boolean>(false);

  //updatwe

  const [isEditing, setIsEditing] = useState(false); // Control del modal
  const [editingProduct, setEditingProduct] =
    useState<Partial<ProductEntityGetAll> | null>(null);

  const resetEditing = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  const onEditProduct = record => {
    setIsEditing(true); // Abre el modal
    setEditingProduct({ ...record }); // Copia el producto en edición
  };

  const handleInputChange = (campo: keyof ProductEntityGetAll, valor: any) => {
    setEditingProduct(prevProduct => ({
      ...(prevProduct || {}),
      [campo]: valor,
    }));
  };
  useEffect(() => {
    if (firstCharge) {
      if (loadingProductos?.state === ResponseState.Waiting) {
        dispatch(actions.loadProducts(ResponseState.Started));
      } else if (loadingProductos?.state === ResponseState.Started) {
        setFirstCharge(false);
        dispatch(actions.loadProducts(ResponseState.InProgress));
        dispatch({
          type: LOAD_PRODUCTOS_LIST,
        });
      }
    }
    if (loadingProductos?.state === ResponseState.InProgress) {
      setLoadingSpinProductos(true);
    } else if (loadingProductos?.state === ResponseState.Finished) {
      if (loadingProductos?.status) {
        if (productos && productos.length > 0) {
          let dataList: Array<ProductEntityGetAll> = [];

          productos?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
              descripcion: r.descripcion,
              precio: r.precio,
              categoriaNombre: r.categoriaNombre,
            });
          });
          setProductosListState(dataList);
          if (loadingSpinProductos) setLoadingSpinProductos(false);
        }
      } else {
        alert(loadingProductos?.message);
      }
      dispatch(actions.loadProducts(ResponseState.Waiting));
    }
  }, [productos, loadingProductos]);

  useEffect(() => {
    if (loadingDeleteProduct?.state === ResponseState.InProgress) {
      setLoadingSpinDeleteProductos(true);
    } else if (loadingDeleteProduct?.state === ResponseState.Finished) {
      setLoadingSpinDeleteProductos(false);
      if (loadingDeleteProduct) setLoadingSpinDeleteProductos(false);
      if (loadingDeleteProduct?.status) {
        notification.success({
          message: 'Éxito',
          description: 'Eliminación completada correctamente.',
          placement: 'bottomRight', // Puedes cambiar la posición si deseas
        });
      } else {
        notification.error({
          message: 'Error',
          description:
            loadingDeleteProduct?.message || 'Error en la eliminación.',
          placement: 'bottomRight',
        });
      }

      dispatch(actions.loadDeleteProducts(ResponseState.Waiting));
    }
  }, [loadingDeleteProduct, dispatch]);

  //UseEffect de update products

  useEffect(() => {
    if (loadingUpdateProduct?.state === ResponseState.InProgress) {
      setLoadingSpinUpdateProductos(true);
    } else if (loadingUpdateProduct?.state === ResponseState.Finished) {
      setLoadingSpinUpdateProductos(false);
      if (loadingUpdateProduct) setLoadingSpinUpdateProductos(false);
      if (loadingUpdateProduct?.status) {
        notification.success({
          message: 'Éxito',
          description: 'Actualización completada correctamente.',
          placement: 'bottomRight', // Puedes cambiar la posición si deseas
        });
      } else {
        notification.error({
          message: 'Error',
          description:
            loadingDeleteProduct?.message || 'Error en la Actualización.',
          placement: 'bottomRight',
        });
      }

      dispatch(actions.loadUpdateProducts(ResponseState.Waiting));
    }
  }, [loadingUpdateProduct, dispatch]);

  //UseEffect de categorias

  useEffect(() => {
    if (firstCharge) {
      if (loadingCategorias?.state === ResponseState.Waiting) {
        dispatch(actions.loadCategorias(ResponseState.Started));
      } else if (loadingCategorias?.state === ResponseState.Started) {
        setFirstCharge(false);
        dispatch(actions.loadCategorias(ResponseState.InProgress));
        dispatch({
          type: LOAD_CATEGORIAS_LIST,
        });
      }
    }
    if (loadingCategorias?.state === ResponseState.InProgress) {
      setLoadingSpinCategorias(true);
    } else if (loadingCategorias?.state === ResponseState.Finished) {
      if (loadingCategorias?.status) {
        if (categorias && categorias.length > 0) {
          let dataList: Array<Entity> = [];

          categorias?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setCategoriaListState(dataList);
          if (loadingSpinCategorias) setLoadingSpinCategorias(false);
        }
      } else {
        alert(loadingCategorias?.message);
      }
      dispatch(actions.loadCategorias(ResponseState.Waiting));
    }
  }, [categorias, loadingCategorias]);

  //Delete products
  const onDeleteProduct = record => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este producto?',
      onOk: () => {
        dispatch(actions.loadDeleteProducts(ResponseState.InProgress));
        dispatch({
          type: DELETE_PRODUCT,
          payload: record.id,
        });
        // Actualizar la lista de productos en el estado local
        setProductosListState(prevState =>
          prevState.filter(product => product.id !== record.id),
        );
      },

      onCancel: () => {
        console.log('Eliminación cancelada');
      },
    });
  };
  //update products
  const onUpdateProduct = () => {
    if (!editingProduct) return;

    // Dispatch al saga con el producto actualizado
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        id: editingProduct.id,
        productData: editingProduct, // El objeto con los datos actualizados
      },
    });
    resetEditing(); // Cierra el modal después de enviar la actualización
  };

  return (
    <>
      <GeneralContainer>
        <h1
          style={{
            height: '20vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: 'solid red 3px',
          }}
        >
          ListaProductos de la tienda
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'solid blue 3px',
            width: '100%',
            height: '80vh',
          }}
        >
          <Spin
            spinning={
              loadingSpinProductos ||
              loadingSpinDeleteProductos ||
              loadingSpinUpdateProductos
            }
          >
            <Table columns={columns} dataSource={productosListState}></Table>
          </Spin>
        </div>
      </GeneralContainer>
      {/* Modal para editar */}
      {/* <Modal
        title="Editar Producto"
        visible={isEditing}
        onCancel={resetEditing}
        onOk={onUpdateProduct}
      >
        <Input
          placeholder="Nombre"
          value={editingProduct?.nombre}
          onChange={e => handleInputChange('nombre', e.target.value)}
        />
        <Input
          placeholder="Descripción"
          value={editingProduct?.descripcion}
          onChange={e => handleInputChange('descripcion', e.target.value)}
          style={{ marginTop: 8 }}
        />
        <Input
          type="number"
          placeholder="Precio"
          value={editingProduct?.precio}
          onChange={e => handleInputChange('precio', e.target.value)}
          style={{ marginTop: 8 }}
        />
        <CustomSelect
          list={categoriaListState} // Asegúrate de tener la lista de categorías
          onChange={value => handleInputChange('categoriaId', value)} // Maneja el cambio del select
          label="Categoría"
          name="categoriaId"
          value={editingProduct?.categoriaId} // Asigna el valor del producto que estás editando
          style={{ marginTop: 8 }} // Estilo opcional
        />
      </Modal> */}
    </>
  );
}
