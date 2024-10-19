import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';
import { LoadingState, ResponseState } from './types';
import {
  ProductEntityGetAll,
  ProductEntityGetById,
} from 'app/api/products/types';

const defaultLoadingState: LoadingState = {
  state: ResponseState.Waiting,
  status: false,
  message: '',
};

export const productosGuardados_Empty: ProductEntitySave = {
  nombre: '',
  descripcion: '',
  precio: 0,
  categoriaId: '',
};
export const productoById_Empty: ProductEntityGetById = {
  id: '',
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: { id: '', nombre: '' },
};

export const GeneralStatesReduxSaga_empty = {
  roles: [],

  categorias: [],

  productos: [],

  productosGuardados: productosGuardados_Empty,

  productoById: productoById_Empty,

  loadingStates: {
    rolesLoading: defaultLoadingState,
    categoriasLoading: defaultLoadingState,
    productosLoading: defaultLoadingState,
    productosSaveLoading: defaultLoadingState,
    productosDeleteLoading: defaultLoadingState,
    productosUpdateLoading: defaultLoadingState,
    productosGetByIdLoading: defaultLoadingState,
  },
};
