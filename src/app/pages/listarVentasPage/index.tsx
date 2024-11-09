import { ConfigProvider, Spin, Table, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DataItemVenta, VentaSimplifyEntity } from 'app/api/detalleVenta/types';
import { CustomTitleGeneal, GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import { LOAD_VENTAS_LIST } from 'app/features/slice/sagaActions';
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
            {/* <DeleteOutlined
              onClick={() => onDeleteProduct(record)}
              style={{ color: 'red', marginLeft: 12 }}
            /> */}
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
  } = useGeneralContext();

  // Redux

  const { actions } = useSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manejo estado de carga

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinVentas, setLoadingSpinVentas] = useState<boolean>(false);

  const [clienteListState, setClienteListState] = useState<DataItemVenta[]>([]);

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
