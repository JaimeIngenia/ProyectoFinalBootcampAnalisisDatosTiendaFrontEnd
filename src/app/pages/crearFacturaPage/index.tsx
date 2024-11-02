import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Table,
  InputNumber,
  ConfigProvider,
  theme,
  Spin,
  FormInstance,
  message,
} from 'antd';
import { CustomButtonn, GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import CustomSelect from 'app/features/customSelect';
import {
  formClientSelectValidation,
  formDetalleVentaValidation,
  formRegisterValidation,
} from '../agregarProducto/utils/formValidation';
import { Entity, ResponseState } from 'app/features/slice/types';
import { useSlice } from 'app/features/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOAD_CLIENTES_LIST,
  LOAD_PRODUCTOS_LIST,
} from 'app/features/slice/sagaActions';
import { GetUsuarioSimpleResponse } from 'app/api/usuarios/types';
import { usuarioById_Empty } from 'app/features/slice/emptyTypes';
import { rulesForm } from '../agregarProducto/utils/rulesForm';
import { set } from 'shelljs';
import {
  productosSelector,
  productosSelectorLoading,
} from 'app/features/slice/selectors';

const { Option } = Select;

export default function CrearFacturaPage() {
  //redux
  const { actions } = useSlice();
  const dispatch = useDispatch();
  //   Context
  const {
    darkMode,
    categorias,
    loadingCategorias,
    themeColors,
    productosSaveLoading,
    clientes,
    loadinClientes,
    loadingusuarioSimpleGetById,
    usuarioSimpleGetById,
    ventasSaveLoading,
    productos,
    loadingProductos,
    detalleVentaSaveLoading,
  } = useGeneralContext();

  const [ventaId, setVentaId] = useState('');

  const [visible, setVisible] = useState(false); // Modal para agregar producto
  const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Lista de productos seleccionados
  const [total, setTotal] = useState(0); // Total de la factura

  // Productos y clientes - Simulación de datos o consulta a la API

  // Función para cerrar el modal
  const closeModal = () => {
    setVisible(false);
  };

  // Guardar el producto seleccionado en el detalle de la factura
  const handleAgregarProducto = (producto, cantidad) => {
    // Preparar el payload para la acción de guardar venta
    if (ventaId !== '') {
      const payload = {
        cantidad: cantidad,
        productoId: producto,
        ventaId: ventaId,
      };
      debugger;
      dispatch(actions.loadSaveDetalleVenta(ResponseState.InProgress)); // Cambiamos el estado a Started
      dispatch({
        type: 'SAVE_DETALLE_VENTA',
        payload: payload,
      });
      closeModal();
    }
  };

  // Columnas de la tabla para el resumen de productos
  const columns = [
    { title: 'Producto', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    { title: 'Precio Unitario', dataIndex: 'precio', key: 'precio' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];
  //----
  // form
  //----

  const [clientFormData, setClientFormData] = useState({
    clienteId: '',
  });
  const [detalleVentaFormData, setdetalleVentaFormData] = useState({
    cantidad: 0,
    productoId: '',
    ventaId: '',
  });

  const [clientForm] = Form.useForm();
  const clientFormRef = useRef<FormInstance>(null);

  const [detalleVentaForm] = Form.useForm();
  const detalleVentaFormRef = useRef<FormInstance>(null);

  const [isButtonAgregarProductoDisabled, setIsButtonAgregarProductoDisabled] =
    useState(true);
  const [isButtonConfrimarFacturaDisabled, setIsButtonConfrimarFacturaisabled] =
    useState(true);
  const [
    isButtonConfrimarDetalleVentaDisabled,
    setIsButtonConfrimarDetalleVentaDisabled,
  ] = useState(true);

  const handleSelectChange = (value: string) => {
    // Actualizar el Form y el estado local
    clientFormRef.current?.setFieldsValue({
      clienteId: value,
    });

    setClientFormData(prev => ({
      ...prev,
      clienteId: value,
    }));

    // Validar solo el campo 'categoriaId'
    clientFormRef.current
      ?.validateFields(['clienteId']) // Valida solo el campo de categoría
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };
  const handleSelectProductoChange = (value: string) => {
    // Actualizar el Form y el estado local
    detalleVentaFormRef.current?.setFieldsValue({
      productoId: value,
    });

    setdetalleVentaFormData(prev => ({
      ...prev,
      productoId: value,
    }));

    // Validar solo el campo 'categoriaId'
    detalleVentaFormRef.current
      ?.validateFields(['productoId']) // Valida solo el campo de categoría
      .then(() => {
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar el Form y el estado local
    detalleVentaFormRef.current?.setFieldsValue({
      [name]: name === 'cantidad' ? Number(value) : value,
    });

    setdetalleVentaFormData(prev => ({
      ...prev,
      [name]: name === 'cantidad' ? Number(value) : value,
    }));

    // Validar solo el campo que ha cambiado
    detalleVentaFormRef.current
      ?.validateFields([name]) // Valida solo el campo actual
      .then(() => {
        // debugger;
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  useEffect(() => {
    const errors = formClientSelectValidation(clientFormData); // Ejecuta la validación completa

    setIsButtonAgregarProductoDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
    console.log('isButtonRegisterDisabled:', Object.keys(errors).length > 0);
  }, [clientFormData]);

  useEffect(() => {
    const errors = formDetalleVentaValidation(detalleVentaFormData); // Ejecuta la validación completa
    setIsButtonConfrimarDetalleVentaDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
  }, [detalleVentaFormData]);
  // Manejo estado de carga

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinClientes, setLoadingSpinClientes] =
    useState<boolean>(false);

  const [clienteListState, setClienteListState] = useState<Entity[]>([]);

  useEffect(() => {
    if (firstCharge) {
      if (
        loadinClientes?.state === ResponseState.Waiting &&
        loadingProductos?.state === ResponseState.Waiting
      ) {
        dispatch(actions.loadClientes(ResponseState.Started));
        dispatch(actions.loadProducts(ResponseState.Started));
      } else if (
        loadinClientes?.state === ResponseState.Started &&
        loadingProductos?.state === ResponseState.Started
      ) {
        setFirstCharge(false);
        dispatch(actions.loadClientes(ResponseState.InProgress));
        dispatch(actions.loadProducts(ResponseState.InProgress));
        dispatch({
          type: LOAD_PRODUCTOS_LIST,
        });
        dispatch({
          type: LOAD_CLIENTES_LIST,
        });
      }
    }
    if (loadinClientes?.state === ResponseState.InProgress) {
      setLoadingSpinClientes(true);
      setLoadingSpinProductos(true);
    } else if (
      loadinClientes?.state === ResponseState.Finished &&
      loadingProductos?.state === ResponseState.Finished
    ) {
      if (loadinClientes?.status) {
        if (clientes && clientes.length > 0) {
          let dataList: Array<Entity> = [];

          clientes?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setClienteListState(dataList);
          if (loadingSpinClientes) setLoadingSpinClientes(false);
        }
      }
      if (loadingProductos?.status) {
        if (productos && productos.length > 0) {
          let dataList: Array<Entity> = [];

          productos?.forEach(r => {
            dataList.push({
              id: r.id,
              nombre: r.nombre,
            });
          });
          setProductosListStateSelect(dataList);

          if (loadingSpinProductos) setLoadingSpinProductos(false);
        }
      } else {
        alert(loadinClientes?.message);
        alert(loadingProductos?.message);
      }
      dispatch(actions.loadClientes(ResponseState.Waiting));
      dispatch(actions.loadProducts(ResponseState.Waiting));
    }
  }, [clientes, loadinClientes, productos, loadingProductos, dispatch]);

  // para traer el usuario y con el idEmpleado

  const [loadingSpinProductById, setLoadingSpinProductById] =
    useState<boolean>(false);
  const [productByIdListState, setProductByIdListState] =
    useState<GetUsuarioSimpleResponse>(usuarioById_Empty);

  // Efecto para cargar el usuario por ID
  useEffect(() => {
    if (loadingusuarioSimpleGetById.state === ResponseState.Started) {
      setLoadingSpinProductById(true);
    } else if (loadingusuarioSimpleGetById.state === ResponseState.Finished) {
      setLoadingSpinProductById(false);

      if (loadingusuarioSimpleGetById.status && usuarioSimpleGetById) {
        setProductByIdListState(usuarioSimpleGetById);
      } else {
        alert(
          loadingusuarioSimpleGetById.message || 'Error al cargar el usuario',
        );
      }
    }
  }, [loadingusuarioSimpleGetById, usuarioSimpleGetById]);
  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Función para abrir el modal
  const openModal = () => {
    // Genera el ID en el frontend
    const ventaId = generateGUID();
    setVentaId(ventaId);
    // aqui esta el id del empleado
    const idEmpleado = productByIdListState.empleadoId;
    // aquí esta el id del cliente
    if (!clientFormRef.current) {
      return;
    }
    const formValues = clientFormRef.current.getFieldsValue();

    const idCliente = formValues.clienteId;

    // Obtiene la fecha actual en el formato necesario
    const fecha = new Date().toISOString();

    // Preparar el payload para la acción de guardar venta
    const payload = {
      id: ventaId,
      clienteId: idCliente,
      empleadoId: idEmpleado,
      fecha: fecha,
    };

    debugger;
    dispatch(actions.loadSaveVenta(ResponseState.InProgress)); // Cambiamos el estado a Started
    dispatch({
      type: 'SAVE_VENTA',
      payload: payload,
    });

    setVisible(true);
  };

  // UseEffect para save products
  useEffect(() => {
    if (ventasSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando producto...');
    } else if (ventasSaveLoading.state === ResponseState.Finished) {
      if (ventasSaveLoading.status) {
        message.success('Venta guardada con éxito.');

        if (clientFormRef.current) {
          clientFormRef.current.resetFields();
          setClientFormData({
            clienteId: '',
          });
        }
      } else {
        message.error(
          `Error al guardar la venta(factura): ${ventasSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveVenta(ResponseState.Waiting));
    }
  }, [ventasSaveLoading, dispatch]);
  // UseEffect para save detalleVentas
  useEffect(() => {
    if (detalleVentaSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando Detalle Venta...');
    } else if (detalleVentaSaveLoading.state === ResponseState.Finished) {
      if (detalleVentaSaveLoading.status) {
        message.success('DetalleVenta guardada con éxito.');

        if (detalleVentaFormRef.current) {
          detalleVentaFormRef.current.resetFields();
          setdetalleVentaFormData({
            cantidad: 0,
            productoId: '',
            ventaId: '',
          });
        }
      } else {
        message.error(
          `Error al guardar la Detalleventa(factura-productodetalle): ${detalleVentaSaveLoading.message}`,
        );
      }
      dispatch(actions.loadSaveDetalleVenta(ResponseState.Waiting));
    }
  }, [detalleVentaSaveLoading, dispatch]);

  //Productos Selectors

  const [loadingSpinProductos, setLoadingSpinProductos] =
    useState<boolean>(false);

  const [productosListStateSelect, setProductosListStateSelect] = useState<
    Entity[]
  >([]);
  return (
    <GeneralContainer>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColors.colorPrimary,
            colorTextBase: themeColors.colorTextBase,
            colorTextLightSolid: themeColors.colorTextLightSolid,
            // Otros tokens personalizados
            colorBgBase: themeColors.background, // Fondo general
            colorBorder: themeColors.colorBorderCustom,
          },
        }}
      >
        <Form
          form={clientForm}
          //   layout="vertical"
          ref={clientFormRef}
          name="clientFormularioName"
        >
          <Form.Item
            required
            label="Cliente"
            name="clienteId"
            rules={rulesForm.rulesVentaId}
            validateTrigger="onBlur"
          >
            <Spin spinning={loadingSpinClientes}>
              <CustomSelect
                list={clienteListState}
                onChange={handleSelectChange}
                label="Un Cliente"
                value={clientFormData.clienteId}
              ></CustomSelect>
            </Spin>
          </Form.Item>
        </Form>

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
            dataSource={productosSeleccionados}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </ConfigProvider>
        <div
          style={{
            marginTop: '20px',
            fontWeight: 'bold',
            color: themeColors.text,
          }}
        >
          Total: {total}
        </div>
        <CustomButtonn
          type="primary"
          onClick={openModal}
          disabled={isButtonAgregarProductoDisabled}
        >
          Agregar Producto
        </CustomButtonn>
        <CustomButtonn
          type="primary"
          style={{ marginLeft: '10px' }}
          onClick={() => {
            /* Guardar factura */
          }}
          disabled={isButtonConfrimarFacturaDisabled}
        >
          Confirmar Factura
        </CustomButtonn>
      </ConfigProvider>

      {/* Modal para agregar productos */}
      <Modal
        title="Agregar Producto"
        visible={visible}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={detalleVentaForm}
          layout="vertical"
          ref={detalleVentaFormRef}
          name={'detalleVentaForm'}
          onFinish={values =>
            handleAgregarProducto(values.productoId, values.cantidad)
          }
        >
          <Form.Item
            required
            label="Pdoducto"
            name="productoId"
            rules={rulesForm.rulesProductoId}
            validateTrigger="onBlur"
          >
            <Spin spinning={loadingSpinProductos}>
              <CustomSelect
                list={productosListStateSelect}
                onChange={handleSelectProductoChange}
                label="Un Producto"
                value={detalleVentaFormData.productoId}
              ></CustomSelect>
            </Spin>
          </Form.Item>
          <Form.Item
            required
            label="Cantidad"
            name="cantidad"
            // rules={[{ required: true, message: 'Ingrese la cantidad' }]}
            rules={rulesForm.rulesPrecio}
            validateTrigger="onBlur"
          >
            <Input
              type="number"
              //   min={1}
              placeholder="Cantidad del Producto"
              onChange={handleProductoChange}
              name="cantidad"
              style={
                darkMode
                  ? { border: `2px solid ${themeColors.colorBorderCustom}` }
                  : { border: `1px solid ${themeColors.colorBorderCustom}` }
              }
            />
          </Form.Item>
          <Form.Item>
            <CustomButtonn
              type="primary"
              htmlType="submit"
              disabled={isButtonConfrimarDetalleVentaDisabled}
            >
              Agregar
            </CustomButtonn>
          </Form.Item>
        </Form>
      </Modal>
    </GeneralContainer>
  );
}
