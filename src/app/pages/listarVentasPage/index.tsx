import {
  ConfigProvider,
  message,
  Modal,
  notification,
  Spin,
  Table,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DataItemVenta, VentaSimplifyEntity } from 'app/api/detalleVenta/types';
import { CustomTitleGeneal, GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import {
  GET_DELETE_VENTA,
  LOAD_VENTAS_LIST,
} from 'app/features/slice/sagaActions';
import { ResponseState } from 'app/features/slice/types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';

export default function ListaVentasPage() {
  const columns: ColumnsType<DataItemVenta> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Empleado',
      dataIndex: 'empleado',
      key: 'empleado',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (fecha: string | Date) => {
        const formattedDate =
          typeof fecha === 'string' ? fecha : fecha.toLocaleDateString();
        return <span>{formattedDate}</span>;
      },
    },
    {
      key: '6',
      title: 'Actions',
      render: record => {
        return (
          <>
            <EditOutlined onClick={() => handleEditClient(record.id)} />
            <DeleteOutlined
              onClick={() => onDeleteVenta(record)}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  // Context
  const {
    darkMode,
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
    clienteSaveLoading,
    ventas,
    loadinVentas,
    loadingDeleteVenta,
    movimientoInventarioSaveLoading,
    fidelizacionSaveLoading,
  } = useGeneralContext();

  // Redux

  const { actions } = useSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manejo estado de carga

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinVentas, setLoadingSpinVentas] = useState<boolean>(false);

  const [clienteListState, setClienteListState] = useState<DataItemVenta[]>([]);

  const [loadingSpinDeleteVenta, setLoadingSpinDeleteVenta] =
    useState<boolean>(false);

  // First Charge
  useEffect(() => {
    if (firstCharge) {
      if (loadinVentas?.state === ResponseState.Waiting) {
        dispatch(actions.loadVentas(ResponseState.Started));
      } else if (loadinVentas?.state === ResponseState.Started) {
        setFirstCharge(false);
        dispatch(actions.loadVentas(ResponseState.InProgress));

        dispatch({
          type: LOAD_VENTAS_LIST,
        });
      }
    }
    if (loadinVentas?.state === ResponseState.InProgress) {
      setLoadingSpinVentas(true);
    } else if (loadinVentas?.state === ResponseState.Finished) {
      if (loadinVentas?.status) {
        if (ventas && ventas.length > 0) {
          let dataList: Array<DataItemVenta> = [];

          ventas?.forEach(r => {
            dataList.push({
              id: r.id,
              cliente: r.cliente.nombre + ' ' + r.cliente.apellido,
              empleado: r.empleado.nombre,
              fecha: r.fecha,
            });
          });
          setClienteListState(dataList);
          if (loadingSpinVentas) setLoadingSpinVentas(false);
        }
      } else {
        alert(loadinVentas?.message);
      }
      dispatch(actions.loadVentas(ResponseState.Waiting));
    }
  }, [ventas, loadinVentas, dispatch]);

  // Update client
  // -> Funciones

  const handleEditClient = id => {
    navigate(`/editarFactura/${id}`);
  };

  // Delete ventas
  // -> Funciones
  //Delete products
  const onDeleteVenta = record => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar esta venta?',
      onOk: () => {
        dispatch(actions.loadDeleteVenta(ResponseState.InProgress));
        dispatch({
          type: GET_DELETE_VENTA,
          payload: record.id,
        });
        // Actualizar la lista de productos en el estado local
        setClienteListState(prevState =>
          prevState.filter(product => product.id !== record.id),
        );
      },

      onCancel: () => {
        console.log('Eliminación cancelada');
      },
    });
  };

  //UseEffect para eliminar una Venta

  useEffect(() => {
    if (loadingDeleteVenta?.state === ResponseState.InProgress) {
      setLoadingSpinDeleteVenta(true);
    } else if (loadingDeleteVenta?.state === ResponseState.Finished) {
      setLoadingSpinDeleteVenta(false);
      if (loadingDeleteVenta) setLoadingSpinDeleteVenta(false);
      if (loadingDeleteVenta?.status) {
        notification.success({
          message: 'Éxito',
          description: 'Eliminación completada correctamente.',
          placement: 'bottomRight', // Puedes cambiar la posición si deseas
        });
      } else {
        notification.error({
          message: 'Error',
          description:
            loadingDeleteVenta?.message || 'Error en la eliminación.',
          placement: 'bottomRight',
        });
      }

      dispatch(actions.loadDeleteVenta(ResponseState.Waiting));
    }
  }, [loadingDeleteVenta, dispatch]);

  // ---------------------------------------/

  // Respueta de otras paginas

  // ---------------------------------------/

  // UseEffect para save Movimiento inventario

  useEffect(() => {
    if (movimientoInventarioSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando Movimiento Inventario...');
    } else if (
      movimientoInventarioSaveLoading.state === ResponseState.Finished
    ) {
      if (movimientoInventarioSaveLoading.status) {
        message.success('Movimiento Inventario guardado con éxito.');
      } else {
        message.error(
          `Error al guardar Movimiento Inventario: ${movimientoInventarioSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveDetalleVenta(ResponseState.Waiting));
    }
  }, [movimientoInventarioSaveLoading, dispatch]);

  // UseEffect para save Fidelización

  useEffect(() => {
    if (fidelizacionSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando Fidelización...');
    } else if (fidelizacionSaveLoading.state === ResponseState.Finished) {
      if (fidelizacionSaveLoading.status) {
        message.success('Fidelización guardado con éxito.');
      } else {
        message.error(
          `Error al guardar Fidelización: ${fidelizacionSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveFidelizacion(ResponseState.Waiting));
    }
  }, [fidelizacionSaveLoading, dispatch]);

  return (
    <GeneralContainer>
      {' '}
      <CustomTitleGeneal>Lista de Ventas</CustomTitleGeneal>
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
