import { ProductEntityGetAll } from 'app/api/products/types';
import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';

export interface GeneralStatesReduxSaga {
  roles: Entity[];
  categorias: Entity[];
  productos: ProductEntityGetAll[];
  productosGuardados: ProductEntitySave;
  loadingStates: LoadingStates;
}

// Define una interfaz para centralizar los estados de carga
export interface LoadingStates {
  rolesLoading: LoadingState; // Estado de carga para roles
  categoriasLoading: LoadingState; // Estado de carga para categorías
  productosLoading: LoadingState; // Estado de carga para productos
  productosSaveLoading: LoadingState; // Estado de carga para productos
}

export interface Entity {
  id: number;
  nombre: string;
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

export interface StateType {
  state: any;
  setState: Function;
}
