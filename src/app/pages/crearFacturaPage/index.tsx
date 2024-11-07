import {
  ConfigProvider,
  Form,
  FormInstance,
  message,
  Modal,
  Select,
} from 'antd';
import { GetUsuarioSimpleResponse } from 'app/api/usuarios/types';
import { GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import { usuarioById_Empty } from 'app/features/slice/emptyTypes';
import {
  LOAD_CLIENTES_LIST,
  LOAD_PRODUCTOS_LIST,
} from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  formClientSelectValidation,
  formDetalleVentaValidation,
} from '../agregarProducto/utils/formValidation';
import MainFormDetalleVenta from './features/MainFormDetalleVenta';
import MainFormVenta from './features/mainFormVenta';
import { generateGUID } from './features/utils/functions';
import { ProductEntityGetAll } from 'app/api/products/types';
import { useNavigate } from 'react-router-dom';
import { sucursalesSelector } from 'app/features/slice/selectors';

const { Option } = Select;

export default function CrearFacturaPage() {
  // Redux
  const { actions } = useSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Context
  const {
    themeColors,
    clientes,
    loadinClientes,
    loadingusuarioSimpleGetById,
    usuarioSimpleGetById,
    ventasSaveLoading,
    productos,
    loadingProductos,
    detalleVentaSaveLoading,
    movimientoInventarioSaveLoading,
  } = useGeneralContext();

  const [ventaId, setVentaId] = useState('');
  // Estado para verificar si la venta ya ha sido creada
  const [ventaCreada, setVentaCreada] = useState(false);

  const [visible, setVisible] = useState(false); // Modal para agregar producto
  const [productosListStateCompletos, setProductoListStateCompletos] = useState<
    Array<ProductEntityGetAll>
  >([]); // Lista de productos seleccionados
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    {
      id: string;
      nombre: string;
      cantidad: number;
      precio: number;
      total: number;
    }[]
  >([]);

  const [nuevoProducto, setNuevoProducto] = useState<{
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;
  } | null>(null);

  const [movimientoInventario, setMovimientoInventario] = useState({
    productoId: '',
    cantidad: 0,
    empleadoId: '',
    tipoMovimientoId: '',
    fecha: '',
  });
  const [total, setTotal] = useState(0); // Total de la factura

  // Productos y clientes - Simulación de datos o consulta a la API

  // Función para cerrar el modal
  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    console.log('ventaCreada:', ventaCreada);
  }, [ventaCreada]);

  // Guardar el producto seleccionado en el detalle de la factura
  const handleAgregarProducto = (producto, cantidad) => {
    if (ventaId !== '') {
      // Datos del producto seleccionados (puedes adaptar estos datos según tu estructura real)
      const productoSeleccionado = productosListStateCompletos.find(
        p => p.id === producto,
      );

      if (productoSeleccionado) {
        if (productosListStateCompletos) {
          const nuevoProducto = {
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            cantidad: cantidad,
            precio: productoSeleccionado.precio,
            total: productoSeleccionado.precio * cantidad,
          };

          // Actualizar productos seleccionados
          setNuevoProducto(nuevoProducto);
          setTotal(prevTotal => prevTotal + nuevoProducto.total);
        }

        // Actualizar el total general

        // const payload = {
        //   cantidad: cantidad,
        //   productoId: producto,
        //   ventaId: ventaId,
        // };
        // dispatch(actions.loadSaveDetalleVenta(ResponseState.InProgress)); // Cambiamos el estado a Started
        // dispatch({
        //   type: 'SAVE_DETALLE_VENTA',
        //   payload: payload,
        // });
        closeModal();
      }
    }
    if (detalleVentaFormRef.current) {
      detalleVentaFormRef.current.resetFields();
      setdetalleVentaFormData({
        cantidad: 0,
        productoId: '',
        ventaId: '',
      });
    }
  };

  // Función para confirmar la factura y enviar los productos al backend
  const handleConfirmarFactura = () => {
    productosSeleccionados.forEach(producto => {
      const payload = {
        cantidad: producto.cantidad,
        productoId: producto.id,
        ventaId: ventaId,
      };

      // Enviar cada producto al backend
      dispatch(actions.loadSaveDetalleVenta(ResponseState.InProgress));
      dispatch({
        type: 'SAVE_DETALLE_VENTA',
        payload: payload,
      });
    });

    if (movimientoInventario.empleadoId) {
      productosSeleccionados.forEach(producto => {
        const payloadMovimientoInventario = {
          productoId: producto.id,
          cantidad: producto.cantidad,
          empleadoId: movimientoInventario.empleadoId,
          tipoMovimientoId: '1b49d538-1317-4a53-b07e-196a80027dd1', //Salida de producto
          fecha: new Date().toISOString(),
        };
        debugger;

        // Enviar cada producto al backend
        dispatch(
          actions.loadSaveMovimientoInventario(ResponseState.InProgress),
        );
        dispatch({
          type: 'SAVE_MOVIMIENTO_INVENTARIO',
          payload: payloadMovimientoInventario,
        });
      });
    }

    // Puedes agregar un reset aquí si deseas limpiar los productos seleccionados y el total después de confirmar
    setProductosSeleccionados([]);
    setTotal(0);
    setVentaCreada(false);
    navigate(`/listaProductos`);
  };

  useEffect(() => {
    if (nuevoProducto) {
      setProductosSeleccionados(prev => [...prev, nuevoProducto]);
      setNuevoProducto(null); // Restablecer el estado de nuevoProducto
    }
    if (setProductosSeleccionados.length > 0) {
      setIsButtonConfrimarFacturaisabled(false);
    } else {
      setIsButtonConfrimarFacturaisabled(true);
    }
  }, [nuevoProducto]);

  // Columnas de la tabla para el resumen de productos
  const columns = [
    { title: 'Producto', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    { title: 'Precio Unitario', dataIndex: 'precio', key: 'precio' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];
  //-------
  // form
  //-------

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
        // setIsButtonDisabled(false); // Habilitar el botón si no hay errores
      })
      .catch(() => {
        // setIsButtonDisabled(true); // Deshabilitar el botón si hay errores
      });
  };

  // useEffect para validar el formulario solo la primera vez
  useEffect(() => {
    const errors = formClientSelectValidation(clientFormData);
    if (!ventaCreada) {
      setIsButtonAgregarProductoDisabled(Object.keys(errors).length > 0);
    }
  }, [clientFormData, ventaCreada]);

  useEffect(() => {
    const errors = formDetalleVentaValidation(detalleVentaFormData); // Ejecuta la validación completa
    setIsButtonConfrimarDetalleVentaDisabled(Object.keys(errors).length > 0); // Habilita/deshabilita el botón en base a los errores
  }, [detalleVentaFormData]);

  // Manejo estado de carga

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinClientes, setLoadingSpinClientes] =
    useState<boolean>(false);

  const [clienteListState, setClienteListState] = useState<Entity[]>([]);

  // useEffect para firstCharge

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
              nombre: r.nombre + ' ' + r.apellido,
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

          let dataList2: Array<ProductEntityGetAll> = [];

          productos?.forEach(r => {
            dataList2.push({
              id: r.id,
              nombre: r.nombre,
              descripcion: r.descripcion,
              precio: r.precio,
              categoriaNombre: r.categoriaNombre,
            });
          });
          setProductoListStateCompletos(dataList2);

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

  const openModal = () => {
    if (!ventaCreada) {
      // Genera el ID en el frontend
      const ventaId = generateGUID();
      setVentaId(ventaId);

      if (!clientFormRef.current) {
        return;
      }
      const formValues = clientFormRef.current.getFieldsValue();
      const idCliente = formValues.clienteId;
      const idEmpleado = productByIdListState.empleadoId;

      // Obtiene la fecha actual en el formato necesario
      const fecha = new Date().toISOString();

      // Preparar el payload para la acción de guardar venta
      const payload = {
        id: ventaId,
        clienteId: idCliente,
        empleadoId: idEmpleado,
        fecha: fecha,
      };
      // Actualizar solo el campo clienteId en el estado movimientoInventario
      setMovimientoInventario(prevState => ({
        ...prevState, // Mantiene los valores previos en movimientoInventario
        empleadoId: productByIdListState.empleadoId, // Actualiza solo el idCliente
      }));

      // Enviar la acción de guardar venta solo la primera vez
      dispatch(actions.loadSaveVenta(ResponseState.InProgress));
      dispatch({
        type: 'SAVE_VENTA',
        payload: payload,
      });
      // Marcar que la venta ha sido creada
      setVentaCreada(true);
    }

    // Abre el modal para agregar productos
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
            colorBgBase: themeColors.background,
            colorBorder: themeColors.colorBorderCustom,
          },
        }}
      >
        <MainFormVenta
          clientForm={clientForm}
          clientFormRef={clientFormRef}
          loadingSpinClientes={loadingSpinClientes}
          clienteListState={clienteListState}
          handleSelectChange={handleSelectChange}
          clientFormData={clientFormData}
          productosSeleccionados={productosSeleccionados}
          columns={columns}
          openModal={openModal}
          total={total}
          isButtonAgregarProductoDisabled={isButtonAgregarProductoDisabled}
          isButtonConfrimarFacturaDisabled={isButtonConfrimarFacturaDisabled}
          handleConfirmarFactura={handleConfirmarFactura}
          ventaCreada
        />
      </ConfigProvider>

      {/* Modal para agregar productos */}
      <Modal
        title="Agregar Producto"
        visible={visible}
        onCancel={closeModal}
        footer={null}
      >
        <MainFormDetalleVenta
          detalleVentaForm={detalleVentaForm}
          detalleVentaFormRef={detalleVentaFormRef}
          detalleVentaFormData={detalleVentaFormData}
          handleAgregarProducto={handleAgregarProducto}
          loadingSpinProductos={loadingSpinProductos}
          productosListStateSelect={productosListStateSelect}
          handleSelectProductoChange={handleSelectProductoChange}
          handleProductoChange={handleProductoChange}
          isButtonConfrimarDetalleVentaDisabled={
            isButtonConfrimarDetalleVentaDisabled
          }
        />
      </Modal>
    </GeneralContainer>
  );
}
