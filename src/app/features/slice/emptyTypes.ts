import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';
import { LoadingState, ResponseState } from './types';

const defaultLoadingState: LoadingState = {
  state: ResponseState.Waiting,
  status: false,
  message: '',
};

export const productosGuardados_Empty: ProductEntitySave = {
  nombre: '',
  descripcion: '',
  precio: 0,
  categoriaId: 0,
};

export const GeneralStatesReduxSaga_empty = {
  roles: [],

  categorias: [],

  productos: [],
  productosGuardados: productosGuardados_Empty,

  loadingStates: {
    rolesLoading: defaultLoadingState,
    categoriasLoading: defaultLoadingState,
    productosLoading: defaultLoadingState,
    productosSaveLoading: defaultLoadingState,
    productosDeleteLoading: defaultLoadingState,
  },
};
