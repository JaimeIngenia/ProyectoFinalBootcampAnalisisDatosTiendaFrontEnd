import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, notification, Spin, Table } from 'antd';
import { ProductEntityGetAll } from 'app/api/products/types';
import { GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import {
  DELETE_PRODUCT,
  LOAD_PRODUCTOS_LIST,
} from 'app/features/slice/sagaActions';
import {
  productosDeleteLoadingSelector,
  productosSelector,
  productosSelectorLoading,
  productosUpdateLoadingSelector,
} from 'app/features/slice/selectors';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [productosListState, setProductosListState] = useState<
    ProductEntityGetAll[]
  >([]);

  //updatwe

  useEffect(() => {
    setProductosListState(productos);
  }, [productos]);

  //UseEffect para cargar los productos
  useEffect(() => {
    if (firstCharge) {
      // debugger;
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
  }, [productos, loadingProductos, dispatch]);

  //UseEffect para eliminar un producto

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
        // Jaime esto está raro
        dispatch(actions.loadProducts(ResponseState.InProgress));
        dispatch({
          type: LOAD_PRODUCTOS_LIST,
        });
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
    </>
  );
}
