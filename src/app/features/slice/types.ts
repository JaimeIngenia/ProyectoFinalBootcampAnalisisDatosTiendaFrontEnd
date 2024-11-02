import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';
import {
  GetUsuarioSimpleResponse,
  SaveUsuarioRequest,
} from 'app/api/usuarios/types';
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
  clientes: Entity[];
  usuariosGuardados: SaveUsuarioRequest;
}

// Define una interfaz para centralizar los estados de carga
export interface LoadingStates {
  rolesLoading: LoadingState; // Estado de carga para roles
  categoriasLoading: LoadingState; // Estado de carga para categorías
  productosLoading: LoadingState; // Estado de carga para productos
  productosSaveLoading: LoadingState; // Estado de carga para productos
  productosDeleteLoading: LoadingState;
  productosUpdateLoading: LoadingState;
  productosGetByIdLoading: LoadingState;
  loginLoading: LoadingState;
  logoutLoading: LoadingState;
  userSimpleByIdLoading: LoadingState;
  sucursalesLoading: LoadingState;
  empleadosLoading: LoadingState;
  usuariosSaveLoading: LoadingState; // Estado de carga para productos
  clientesLoading: LoadingState;
  ventasSaveLoading: LoadingState;
  detalleVentaLoading: LoadingState;
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
