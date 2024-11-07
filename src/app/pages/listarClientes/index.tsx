import {
  Button,
  ConfigProvider,
  Input,
  message,
  Modal,
  Space,
  Spin,
  Table,
  theme,
} from 'antd';
import { ClienteEntity, ClienteEntitySave } from 'app/api/clientes/types';
import { CustomTitleGeneal, GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import React, { useEffect, useState } from 'react';
import { FilterDropdownProps } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSlice } from 'app/features/slice';
import { useDispatch } from 'react-redux';
import { ResponseState } from 'app/features/slice/types';
import { LOAD_CLIENTES_LIST } from 'app/features/slice/sagaActions';

export default function ListarClientes() {
  //   Context
  const {
    darkMode,
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
    loadinClientes,
    clientes,
    clienteSaveLoading,
  } = useGeneralContext();

  //redux
  const { actions } = useSlice();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //Columns

  // const columns: ColumnsType<ClienteEntitySave> = [
  const columns: ColumnsType<ClienteEntity> = [
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
      title: 'Apellido',
      dataIndex: 'apellido',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar apellido"
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
        String(record.apellido)
          .toLowerCase()
          .includes(String(value).toLowerCase()),
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar email"
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button
              //   onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Limpiar
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        String(record.email)
          .toLowerCase()
          .includes(String(value).toLowerCase()),
    },
    {
      key: '3',
      title: 'Telefono',
      dataIndex: 'telefono',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Buscar telefono"
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
        String(record.telefono)
          .toLowerCase()
          .includes(String(value).toLowerCase()),
    },
    {
      key: '6',
      title: 'Actions',
      render: record => {
        return (
          <>
            <EditOutlined onClick={() => handleEditClient(record.id)} />
            <DeleteOutlined
              onClick={() => onDeleteProduct(record)}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  // Update client
  // -> Funciones

  const handleEditClient = id => {
    navigate(`/editarCliente/${id}`);
  };
  // Delete client
  // -> Funciones
  const onDeleteProduct = record => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este producto?',
      //   onOk: () => {
      //     dispatch(actions.loadDeleteProducts(ResponseState.InProgress));
      //     dispatch({
      //       type: DELETE_PRODUCT,
      //       payload: record.id,
      //     });
      //     // Actualizar la lista de productos en el estado local
      //     setProductosListState(prevState =>
      //       prevState.filter(product => product.id !== record.id),
      //     );
      //   },

      onCancel: () => {
        console.log('Eliminación cancelada');
      },
    });
  };

  // Manejo estado de carga

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinClientes, setLoadingSpinClientes] =
    useState<boolean>(false);

  const [clienteListState, setClienteListState] = useState<ClienteEntity[]>([]);

  // First Charge
  useEffect(() => {
    if (firstCharge) {
      if (loadinClientes?.state === ResponseState.Waiting) {
        dispatch(actions.loadClientes(ResponseState.Started));
      } else if (loadinClientes?.state === ResponseState.Started) {
        setFirstCharge(false);
        dispatch(actions.loadClientes(ResponseState.InProgress));

        dispatch({
          type: LOAD_CLIENTES_LIST,
        });
      }
    }
    if (loadinClientes?.state === ResponseState.InProgress) {
      setLoadingSpinClientes(true);
    } else if (loadinClientes?.state === ResponseState.Finished) {
      if (loadinClientes?.status) {
        if (clientes && clientes.length > 0) {
          let dataList: Array<ClienteEntity> = [];

          clientes?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
              apellido: r.apellido,
              email: r.email,
              telefono: r.telefono,
            });
          });
          setClienteListState(dataList);
          if (loadingSpinClientes) setLoadingSpinClientes(false);
        }
      } else {
        alert(loadinClientes?.message);
      }
      dispatch(actions.loadClientes(ResponseState.Waiting));
    }
  }, [clientes, loadinClientes, dispatch]);

  // UseEffect para save products
  //   useEffect(() => {
  //     if (clienteSaveLoading.state === ResponseState.InProgress) {
  //       message.loading('Guardando cliente...');
  //     } else if (clienteSaveLoading.state === ResponseState.Finished) {
  //       if (clienteSaveLoading.status) {
  //         message.success('Cliente guardado con éxito.');

  //         // navigate(`/listarClientes`);
  //       } else {
  //         message.error(
  //           `Error al guardar el cliente: ${clienteSaveLoading.message}`,
  //         );
  //       }
  //       dispatch(actions.loadSaveProducts(ResponseState.Waiting));
  //     }
  //   }, [clienteSaveLoading, dispatch]);

  return (
    <GeneralContainer>
      {' '}
      <CustomTitleGeneal>Lista clientes de la tienda</CustomTitleGeneal>
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
        <Spin spinning={false}>
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
            <Table columns={columns} dataSource={clienteListState}></Table>
          </ConfigProvider>
        </Spin>
      </div>
    </GeneralContainer>
  );
}
