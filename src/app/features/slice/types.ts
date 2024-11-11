import { ClienteEntity } from 'app/api/clientes/types';
import {
  DetalleVentaSpecialEntity,
  IDetalleVentaSimple,
  VentaSimplifyEntity as VentasGetAllSimplifyEntity,
} from 'app/api/detalleVenta/types';
import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';
import {
  GetUsuarioSimpleResponse,
  SaveUsuarioRequest,
} from 'app/api/usuarios/types';
import { VentaGetByIdEntity } from 'app/api/venta/types';
import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';

export interface GeneralStatesReduxSaga {
  roles: Entity[];
  categorias: Entity[];
  productos: ProductEntityGetAll[];
  productosGuardados: ProductEntitySave;
  productoById: ProductEntityGetById;
  loadingStates: LoadingStates;
  loginSuccess: boolean;
  userSimpleById: GetUsuarioSimpleResponse;
  sucursales: Entity[];
  empleados: Entity[];
  clientes: ClienteEntity[];
  clienteById: ClienteEntity;
  usuariosGuardados: SaveUsuarioRequest;
  detalleVentaById: IDetalleVentaSimple;
  ventas: VentasGetAllSimplifyEntity[];
  ventaById: VentaGetByIdEntity;
  detallesVenta: DetalleVentaSpecialEntity[];
}

// Define una interfaz para centralizar los estados de carga
export interface LoadingStates {
  rolesLoading: LoadingState; // Estado de carga para roles
  categoriasLoading: LoadingState;
  productosLoading: LoadingState;
  productosSaveLoading: LoadingState;
  productosDeleteLoading: LoadingState;
  productosUpdateLoading: LoadingState;
  productosGetByIdLoading: LoadingState;
  loginLoading: LoadingState;
  logoutLoading: LoadingState;
  userSimpleByIdLoading: LoadingState;
  sucursalesLoading: LoadingState;
  empleadosLoading: LoadingState;
  usuariosSaveLoading: LoadingState;
  clientesLoading: LoadingState;
  ventasSaveLoading: LoadingState;
  detalleVentaSaveLoading: LoadingState;
  clienteSaveLoading: LoadingState;
  movimientoInventarioSaveLoading: LoadingState;
  fidelizacionSaveLoading: LoadingState;
  clienteGetByIdLoading: LoadingState;
  clienteUpdateLoading: LoadingState;
  detalleVentaGetByIdLoading: LoadingState;
  ventasLoading: LoadingState;
  ventaGetByIdLoading: LoadingState;
  detalleVentaSpecialLoading: LoadingState;
  ventaDeleteLoading: LoadingState;
  detalleVentaUpdateLoading: LoadingState;
}
export interface LoadingState {
  state: ResponseState;
  status?: boolean;
  message?: string;
}

export enum ResponseState {
  Started,
  InProgress,
  Finished,
  Waiting,
}

export interface Entity {
  id: string;
  nombre: string;
}

export interface StateType {
  state: any;
  setState: Function;
}
