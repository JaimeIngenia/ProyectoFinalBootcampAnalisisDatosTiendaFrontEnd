import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  notification,
  Space,
  Spin,
  Table,
  theme,
} from 'antd';
import { ProductEntityGetAll } from 'app/api/products/types';
import { CustomTitleGeneal, GeneralContainer } from 'app/components/containers';
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
import FilterSection from './features/filterSection';
import type { ColumnsType } from 'antd/es/table';
import { FilterDropdownProps } from 'antd/es/table/interface';
import ImageWithLoading from './features/imageWithLoading';

const { darkAlgorithm } = theme;

export function ListaProductos() {
  const onSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  // Estado para controlar si la imagen está cargando
  const [loading, setLoading] = useState(true);

  const columns: ColumnsType<ProductEntityGetAll> = [
    {
      key: '1',
      title: 'Imagen',
      dataIndex: 'imagen',
      render: imagen => (
        <ImageWithLoading src={imagen} alt="Imagen del producto" width={100} />
      ),
    },
    // {
    //   key: '1',
    //   title: 'Imagen',
    //   dataIndex: 'imagen',
    //   render: (imagen: string) => (
    //     <img
    //       src={imagen}
    //       alt="Imagen del producto"
    //       style={{ width: 100, height: 'auto' }}
    //     />
    //   ),
    // },
    {
      key: '2',
      title: 'Nombre',
      dataIndex: 'nombre',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar nombre"
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Limpiar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        String(record.nombre)
          .toLowerCase()
          .includes(String(value).toLowerCase()),
    },
    {
      key: '3',
      title: 'Descripción',
      dataIndex: 'descripcion',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar descripción"
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Limpiar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        String(record.descripcion)
          .toLowerCase()
          .includes(String(value).toLowerCase()),
    },
    {
      key: '4',
      title: 'Precio',
      dataIndex: 'precio',
      sorter: (a, b) => a.precio - b.precio,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Mínimo"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys([e.target.value, selectedKeys[1]])}
            type="number"
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Input
            placeholder="Máximo"
            value={selectedKeys[1]}
            onChange={e => setSelectedKeys([selectedKeys[0], e.target.value])}
            type="number"
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
              Limpiar
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => {
        const [min, max] = Array.isArray(value)
          ? value
          : [undefined, undefined];
        const precio = record.precio;
        return (
          (!min || precio >= Number(min)) && (!max || precio <= Number(max))
        );
      },
    },
    {
      key: '5',
      title: 'Categoría',
      dataIndex: 'categoriaNombre',
      filters: [
        { text: 'Desechables', value: 'desechables' },
        { text: 'Plásticos', value: 'plásticos' },
        // Agrega más categorías según tu lista
      ],
      onFilter: (value, record) => record.categoriaNombre === value,
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
  const {
    darkMode,
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
  } = useGeneralContext();

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
        <CustomTitleGeneal>ListaProductos de la tienda</CustomTitleGeneal>

        {/* <FilterSection
          onFilterChange={filters => {}}
          categoriaListState={categorias}
        /> */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // border: 'solid blue 3px',
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
            {/* <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '0C9999',
                },
                algorithm: theme.darkAlgorithm,
              }}
            > */}
            {/* <ConfigProvider
              theme={{
                token: {
                  colorPrimary: themeColors.colorPrimary,
                  colorText: themeColors.colorTextBase,
                  colorTextHeading: themeColors.colorTextBase,
                  colorBgContainer: themeColors.background, // Fondo de tabla y de celdas
                  colorBgElevated: themeColors.background, // Fondo de encabezado
                  colorBorder: themeColors.colorPrimary, // Color de bordes
                  colorTextBase: themeColors.colorTextBase,
                  colorTextPlaceholder: themeColors.colorTextLightSolid,
                },
                algorithm: theme.darkAlgorithm, // Combinación con darkAlgorithm
              }}
            > */}
            <ConfigProvider
              theme={{
                ...(darkMode
                  ? {
                      token: {
                        colorPrimary: themeColors.colorPrimary,
                        colorText: themeColors.colorTextBase,
                        colorTextHeading: themeColors.colorTextBase,
                        colorBgContainer: themeColors.background,
                        colorBgElevated: themeColors.background,
                        colorBorder: themeColors.colorPrimary,
                        colorTextBase: themeColors.colorTextBase,
                        colorTextPlaceholder: themeColors.colorTextLightSolid,
                      },
                      algorithm: theme.darkAlgorithm,
                    }
                  : {}),
              }}
            >
              <Table
                columns={columns}
                dataSource={productosListState}
                size="small"
                pagination={{ pageSize: 3 }}
              ></Table>
            </ConfigProvider>
          </Spin>
        </div>
      </GeneralContainer>
    </>
  );
}
