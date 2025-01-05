import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';
import { LoadingState, ResponseState } from './types';
import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';
import {
  GetUsuarioSimpleResponse,
  SaveUsuarioRequest,
} from 'app/api/usuarios/types';
import { ClienteEntity } from 'app/api/clientes/types';
import {
  DetalleVentaSpecialEntity,
  IDetalleVentaSimple,
} from 'app/api/detalleVenta/types';
import { VentaGetByIdEntity } from 'app/api/venta/types';
import {
  precioGuardados_Empty,
  preciosUpdate_Empty,
} from 'app/api/precio/emptyTypes';

const defaultLoadingState: LoadingState = {
  state: ResponseState.Waiting,
  status: false,
  message: '',
};

export const productosGuardados_Empty: ProductEntitySave = {
  // nota agregar el id
  nombre: '',
  descripcion: '',
  // precio: 0,
  categoriaId: '',
  stockActual: 0,
};
export const usuariosGuardados_Empty: SaveUsuarioRequest = {
  nombre: '',
  correo: '',
  contrasena: '',
  empleadoId: '',
  rolId: '',
  sucursalId: '',
};
export const productoById_Empty: ProductEntityGetById = {
  id: '',
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: { id: '', nombre: '' },
  imagen: '',
  stockActual: 0, // nota cuidado con esta propiedad
};
export const usuarioById_Empty: GetUsuarioSimpleResponse = {
  id: '',
  nombre: '',
  correo: '',
  contrasena: '',
  validationLogin: false,
  imagen: '',
  empleadoId: '',
};

export const clienteById_Empty: ClienteEntity = {
  id: '',
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
};
export const detalleVentaById_Empty: IDetalleVentaSimple = {
  id: '',
  cantidad: 0,
  productoId: '',
  ventaId: '',
};
export const ventaById_Empty: VentaGetByIdEntity = {
  id: '',
  clienteId: '',
  empleadoId: '',
  fecha: '',
};
export const DetalleVentaGetAllById_EmptyList: DetalleVentaSpecialEntity[] = [
  {
    id: '',
    ventaId: '',
    cantidad: 0,
    producto: {
      nombre: '',
      precio: 0,
    },
  },
];

export const GeneralStatesReduxSaga_empty = {
  roles: [],

  categorias: [],

  productos: [],

  productosGuardados: productosGuardados_Empty,

  productoById: productoById_Empty,

  loginSuccess: false,

  userSimpleById: usuarioById_Empty,

  sucursales: [],

  empleados: [],

  clientes: [],

  ventas: [],

  ventaById: ventaById_Empty,

  usuariosGuardados: usuariosGuardados_Empty,

  clienteById: clienteById_Empty,

  detalleVentaById: detalleVentaById_Empty,

  detallesVenta: [],

  isMenuCollapsed: false,

  preciosGuardados: precioGuardados_Empty,

  precios: [],

  precioByProductId: preciosUpdate_Empty,

  loadingStates: {
    rolesLoading: defaultLoadingState,
    categoriasLoading: defaultLoadingState,
    productosLoading: defaultLoadingState,
    productosSaveLoading: defaultLoadingState,
    productosDeleteLoading: defaultLoadingState,
    productosUpdateLoading: defaultLoadingState,
    productosGetByIdLoading: defaultLoadingState,
    loginLoading: defaultLoadingState,
    logoutLoading: defaultLoadingState,
    userSimpleByIdLoading: defaultLoadingState,
    sucursalesLoading: defaultLoadingState,
    empleadosLoading: defaultLoadingState,
    usuariosSaveLoading: defaultLoadingState,
    clientesLoading: defaultLoadingState,
    ventasSaveLoading: defaultLoadingState,
    detalleVentaSaveLoading: defaultLoadingState,
    clienteSaveLoading: defaultLoadingState,
    movimientoInventarioSaveLoading: defaultLoadingState,
    fidelizacionSaveLoading: defaultLoadingState,
    clienteGetByIdLoading: defaultLoadingState,
    clienteUpdateLoading: defaultLoadingState,
    detalleVentaGetByIdLoading: defaultLoadingState,
    ventasLoading: defaultLoadingState,
    ventaGetByIdLoading: defaultLoadingState,
    detalleVentaSpecialLoading: defaultLoadingState,
    ventaDeleteLoading: defaultLoadingState,
    detalleVentaUpdateLoading: defaultLoadingState,
    detalleVentaDeleteLoading: defaultLoadingState,
    ventaUpdateLoading: defaultLoadingState,
    preciosSaveLoading: defaultLoadingState,
    preciosUpdateLoading: defaultLoadingState,
    preciosGetByProductIdLoading: defaultLoadingState,
  },
};
