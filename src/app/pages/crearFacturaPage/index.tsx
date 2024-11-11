import {
  ConfigProvider,
  Form,
  FormInstance,
  message,
  Modal,
  Select,
  Spin,
} from 'antd';
import { IDetalleVentaSimple } from 'app/api/detalleVenta/types';
import { ProductEntityGetAll } from 'app/api/products/types';
import { GetUsuarioSimpleResponse } from 'app/api/usuarios/types';
import { VentaGetByIdEntity } from 'app/api/venta/types';
import { GeneralContainer } from 'app/components/containers';
import { useGeneralContext } from 'app/context/GeneralContext';
import { useSlice } from 'app/features/slice';
import {
  detalleVentaById_Empty,
  DetalleVentaGetAllById_EmptyList,
  usuarioById_Empty,
  ventaById_Empty,
} from 'app/features/slice/emptyTypes';
import {
  GET_DETALLE_VENTA_BY_ID,
  GET_DETALLE_VENTA_SPECIAL_BY_ID,
  GET_VENTA_BY_ID,
  LOAD_CLIENTES_LIST,
  LOAD_PRODUCTOS_LIST,
} from 'app/features/slice/sagaActions';
import { Entity, ResponseState } from 'app/features/slice/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  formClientSelectValidation,
  formDetalleVentaValidation,
} from '../agregarProducto/utils/formValidation';
import MainFormDetalleVenta from './features/MainFormDetalleVenta';
import MainFormVenta from './features/mainFormVenta';
import { generateGUID } from './features/utils/functions';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const { Option } = Select;

export default function CrearFacturaPage() {
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  // Obtén el ID de los parámetros de la URL
  const { id: idVentaParams } = useParams();
  // Redux
  const { actions } = useSlice();
  const dispatch = useDispatch();
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
    fidelizacionSaveLoading,
    detalleVentaGetById,
    loadingDetalleVentaGetById,
    ventaGetById,
    loadingVentaGetById,
    detalleVentaGetAllById,
    loadingDetalleVentaGetAllById,
    loadingUpdateDetalleVenta,
  } = useGeneralContext();

  const [ventaId, setVentaId] = useState('');
  // Estado para verificar si la venta ya ha sido creada
  const [ventaCreada, setVentaCreada] = useState(false);

  const [visible, setVisible] = useState(false); // Modal para agregar producto
  const [productosListStateCompletos, setProductoListStateCompletos] = useState<
    Array<ProductEntityGetAll>
  >([]);
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

  const [fidelizacionData, setFidelizacionData] = useState({
    puntos: 0,
    clienteId: '',
    membresiaId: '',
  });

  const [total, setTotal] = useState(0);

  // -----------------------------------
  // Funciones
  // -----------------------------------

  // Fucnion Guardar el producto seleccionado en el detalle de la factura

  const handleAgregarDetalleVenta = (producto, cantidad) => {
    if (ventaId !== '') {
      // debugger;
      // Datos del producto seleccionados (puedes adaptar estos datos según tu estructura real)
      const productoSeleccionado = productosListStateCompletos.find(
        p => p.id === producto,
      );
      // debugger;

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

        closeModal();
      }
    }
    if (detalleVentaFormRef.current) {
      detalleVentaFormRef.current.resetFields();
      setdetalleVentaFormData({
        id: '',
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
    if (fidelizacionData.clienteId) {
      // Calcular el total de productos seleccionados
      const totalProductos = productosSeleccionados.reduce(
        (total, producto) => total + producto.cantidad,
        0,
      );

      // Determinar los puntos de fidelización según el total de productos
      let puntos = 0;
      if (totalProductos > 30) {
        puntos = 50;
      } else if (totalProductos > 25) {
        puntos = 25;
      } else if (totalProductos > 20) {
        puntos = 20;
      } else if (totalProductos > 15) {
        puntos = 15;
      } else if (totalProductos > 10) {
        puntos = 10;
      } else if (totalProductos > 5) {
        puntos = 5;
      }

      productosSeleccionados.forEach(producto => {
        const payloadFidelizacion = {
          puntos: puntos,
          clienteId: fidelizacionData.clienteId,
          membresiaId: '9F3B5F63-618F-4E9D-8890-AB219C3C3586', //Basic
        };

        // Enviar cada producto al backend
        dispatch(
          actions.loadSaveMovimientoInventario(ResponseState.InProgress),
        );
        dispatch({
          type: 'SAVE_FIDELIZACION',
          payload: payloadFidelizacion,
        });
      });
    }

    // Puedes agregar un reset aquí si deseas limpiar los productos seleccionados y el total después de confirmar
    setProductosSeleccionados([]);
    setTotal(0);
    setVentaCreada(false);
    navigate(`/listarVentas`);
  };

  // Fucnión para guardar venta al abrir el modal

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

      setFidelizacionData(prevState => ({
        ...prevState,
        clienteId: idCliente,
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

  // Fucnión para actualizar Detallesventa al abrir el modal cuando se edita

  const openModalUpdateDetalleVenta = ({ id }: { id: string }) => {
    debugger;
    dispatch(actions.loadGetDetalleVentaById(ResponseState.InProgress));
    dispatch({
      type: 'GET_DETALLE_VENTA_BY_ID',
      payload: id,
    });
    setFirstChargeDetalleVentaById(true);

    // Abre el modal para actualizar DetalleVenta
    setVisible(true);
  };

  // Función para actualizar Detalle Venta

  const updateDetalleVenta = () => {
    const id = detalleVentaFormData.id;
    const ventaId = detalleVentaFormData.ventaId;
    const cantidad = detalleVentaFormData.cantidad;
    const productoId = detalleVentaFormData.productoId;
    const detalleVentaDataUpdated = {
      ventaId: ventaId,
      cantidad: cantidad,
      productoId: productoId,
    };
    debugger;
    if (!detalleVentaFormRef.current) {
      return;
    }
    // debugger;

    // Obtenemos los valores del formulario
    // const formValues = detalleVentaFormRef.current.getFieldsValue();

    // // Preparamos los datos que vamos a enviar con la acción
    // const detalleVentaDataUpdated = {
    //   ...formValues,
    //   producto: {
    //     ...formValues.producto,
    //     nombre: formValues.producto.nombre, // Asegúrate de que nombre esté aquí si es necesario
    //   },
    // };

    debugger;
    // Disparamos la acción para actualizar el detalle de venta
    dispatch(actions.loadUpdateDetalleVenta(ResponseState.InProgress));
    dispatch({
      type: 'UPDATE_DETALLE_VENTA',
      payload: {
        id: id,
        detalleVentaData: detalleVentaDataUpdated,
      },
    });

    // Cierra el modal
    setVisible(false);
  };

  // Función para cerrar el modal

  const closeModal = () => {
    setVisible(false);
  };

  // Función para actualizar detalleVenta

  const handleEditDetalleVentaClick = (id: string) => {
    debugger;
    openModalUpdateDetalleVenta({ id });
  };

  // Columnas de la tabla para el resumen de productos

  const columns = [
    { title: 'Producto', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    { title: 'Precio Unitario', dataIndex: 'precio', key: 'precio' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    ...(idVentaParams
      ? [
          {
            key: '5',
            title: 'Actions',
            render: (record: any) => {
              return (
                <>
                  <EditOutlined
                    // onClick={() =>
                    //   openModalUpdateDetalleVenta({ id: record.id })
                    // }
                    onClick={() => handleEditDetalleVentaClick(record.id)}
                  />
                  <DeleteOutlined
                    // onClick={() => onDeleteProduct(record)}
                    style={{ color: 'red', marginLeft: 12 }}
                  />
                </>
              );
            },
          },
        ]
      : []),
  ];

  //-------
  // Form
  //-------

  const [clientFormData, setClientFormData] = useState({
    clienteId: '',
  });
  const [detalleVentaFormData, setdetalleVentaFormData] = useState({
    id: '',
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

    clientFormRef.current
      ?.validateFields(['clienteId'])
      .then(() => {})
      .catch(() => {});
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
      ?.validateFields(['productoId'])
      .then(() => {})
      .catch(() => {});
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

  //------------------------
  // Manejo estado de carga
  //------------------------

  const [firstCharge, setFirstCharge] = useState<boolean>(true);

  const [loadingSpinClientes, setLoadingSpinClientes] =
    useState<boolean>(false);

  const [clienteListState, setClienteListState] = useState<Entity[]>([]);

  // Manejo estado de carga para traer GetVentaById

  const [firstChargeVenta, setFirstChargeVenta] = useState<boolean>(true);

  const [loadingSpinVentaById, setLoadingSpinVentaById] =
    useState<boolean>(false);

  const [ventaByIdListState, setVentaByIdListState] =
    useState<VentaGetByIdEntity>(ventaById_Empty);

  // Manejo estado de carga para traer GetVentaBDetalleVentaSpecial llenado

  const [firstChargeDetalleVentaSpecial, setFirstChargeDetalleVentaSpecial] =
    useState<boolean>(true);

  const [
    loadingSpinDetalleVentaSpecialById,
    setLoadingSpinDetalleVentaSpecialById,
  ] = useState<boolean>(false);

  // Manejo de carga para traer el usuario y con el idEmpleado

  const [loadingSpinProductById, setLoadingSpinProductById] =
    useState<boolean>(false);
  const [productByIdListState, setProductByIdListState] =
    useState<GetUsuarioSimpleResponse>(usuarioById_Empty);

  // Manejor de carga de Productos

  const [loadingSpinProductos, setLoadingSpinProductos] =
    useState<boolean>(false);

  const [productosListStateSelect, setProductosListStateSelect] = useState<
    Entity[]
  >([]);

  // Manejo estado de carga para traer GetByIdDetalleVenta

  const [firstChargeDetalleVentaById, setFirstChargeDetalleVentaById] =
    useState<boolean>(true);

  const [loadingSpinDetalleVentaById, setLoadingSpinDetalleVentaById] =
    useState<boolean>(false);

  const [detalleVentaByIdNoListState, setDetalleVentaByIdNoListState] =
    useState<IDetalleVentaSimple>(detalleVentaById_Empty);

  //------------------------
  // useEffects
  //------------------------

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

  // useEffect para validaciones constantes del formulario

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

  //UseEffect para productos seleccionados

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

  //UseEffect para getVentaById son dos

  useEffect(() => {
    if (idVentaParams) {
      if (firstChargeVenta) {
        if (loadingVentaGetById?.state === ResponseState.Waiting) {
          dispatch(actions.loadGetVentaById(ResponseState.Started));
        } else if (loadingVentaGetById?.state === ResponseState.Started) {
          setFirstChargeVenta(false);
          dispatch(actions.loadGetVentaById(ResponseState.InProgress));
          dispatch({
            type: GET_VENTA_BY_ID,
            payload: idVentaParams,
          });
        }
      }
      if (loadingVentaGetById?.state === ResponseState.InProgress) {
        setLoadingSpinVentaById(true);
        setLoadingSpinDetalleVentaSpecialById(true); //aqui
      } else if (loadingVentaGetById?.state === ResponseState.Finished) {
        if (loadingVentaGetById?.status) {
          if (ventaGetById && clientFormRef.current) {
            setVentaByIdListState(ventaGetById);
            if (loadingSpinVentaById) setLoadingSpinVentaById(false);
          }
        } else {
          alert(loadingVentaGetById?.message);
        }
        dispatch(actions.loadGetVentaById(ResponseState.Waiting));
      }
    } else {
      setClientFormData({
        clienteId: '',
      });
    }
  }, [ventaGetById, loadingVentaGetById, idVentaParams, dispatch]);

  // El dos UseEffect necesario para getVentaById

  useEffect(() => {
    if (
      idVentaParams &&
      ventaByIdListState !== ventaById_Empty
      // && a
    ) {
      const ventaForTable = {
        clienteId: ventaGetById.clienteId,
      };

      dispatch(actions.loadDetalleVentaSpecialById(ResponseState.InProgress));
      dispatch({
        type: GET_DETALLE_VENTA_SPECIAL_BY_ID,
        payload: ventaGetById.id,
      });
      clientFormRef.current?.setFieldsValue(ventaForTable);

      setClientFormData(ventaForTable);
    } else {
      // Resetear todos los campos
      clientFormRef.current?.resetFields();
    }
  }, [idVentaParams, ventaByIdListState]);

  // UseEffect para DetalleVentaSpecial llenado son dos

  // El dos UseEffect necesario para DetalleVentaSpecial llenado

  useEffect(() => {
    if (
      idVentaParams &&
      detalleVentaGetAllById !== DetalleVentaGetAllById_EmptyList
      // && a
    ) {
      let detalleVentaForTableList: any[] = [];

      detalleVentaGetAllById?.forEach(r => {
        detalleVentaForTableList.push({
          id: r.id,
          nombre: r.producto.nombre,
          cantidad: r.cantidad,
          precio: r.producto.precio,
          total: r.producto.precio * r.cantidad,
        });
      });
      setProductosSeleccionados(detalleVentaForTableList);
      setLoadingSpinDetalleVentaSpecialById(false);
    } else {
      setProductosSeleccionados([]);
    }
  }, [idVentaParams, ventaByIdListState]);

  // UseEffect para getDetalleVentaById son dos

  useEffect(() => {
    if (idVentaParams) {
      if (firstChargeDetalleVentaById) {
        if (loadingDetalleVentaGetById?.state === ResponseState.InProgress) {
          setLoadingSpinDetalleVentaById(true);
        } else if (
          loadingDetalleVentaGetById?.state === ResponseState.Finished
        ) {
          if (loadingDetalleVentaGetById?.status) {
            if (detalleVentaGetById && detalleVentaFormRef.current) {
              detalleVentaFormRef.current?.setFieldsValue(detalleVentaGetById);
              setdetalleVentaFormData(detalleVentaGetById);
              if (loadingSpinDetalleVentaById)
                setLoadingSpinDetalleVentaById(false);
            }
          } else {
            alert(loadingDetalleVentaGetById?.message);
          }
          dispatch(actions.loadGetDetalleVentaById(ResponseState.Waiting));
        }
      } else {
        setdetalleVentaFormData({
          id: '',
          cantidad: 0,
          productoId: '',
          ventaId: '',
        });
        setFirstChargeDetalleVentaById(false);
      }
    }
  }, [
    detalleVentaGetById,
    loadingDetalleVentaGetById,
    idVentaParams,
    dispatch,
  ]);

  // El dos no hizo falta porque la acción ya se hizo con el botón modal

  // UseEffect para cargar el usuario por ID

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

  // UseEffect para save Venta

  useEffect(() => {
    if (ventasSaveLoading.state === ResponseState.InProgress) {
      message.loading('Guardando Venta...');
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
            id: '',
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
        <Spin spinning={loadingSpinDetalleVentaSpecialById}>
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
        </Spin>
      </ConfigProvider>

      {/* Modal para agregar productos */}
      <Modal
        title="Agregar Producto"
        visible={visible}
        onCancel={closeModal}
        footer={null}
      >
        <Spin tip="Cargando..." size="large" spinning={loadingSpinVentaById}>
          <MainFormDetalleVenta
            detalleVentaForm={detalleVentaForm}
            detalleVentaFormRef={detalleVentaFormRef}
            detalleVentaFormData={detalleVentaFormData}
            handleAgregarDetalleVenta={handleAgregarDetalleVenta}
            loadingSpinProductos={loadingSpinProductos}
            productosListStateSelect={productosListStateSelect}
            handleSelectProductoChange={handleSelectProductoChange}
            handleProductoChange={handleProductoChange}
            isButtonConfrimarDetalleVentaDisabled={
              isButtonConfrimarDetalleVentaDisabled
            }
            id={idVentaParams}
            updateDetalleVenta={updateDetalleVenta}
          />
        </Spin>
      </Modal>
    </GeneralContainer>
  );
}
