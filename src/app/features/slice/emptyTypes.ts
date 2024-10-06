import { LoadingState, ResponseState } from './types';

const defaultLoadingState: LoadingState = {
  state: ResponseState.Waiting,
  status: false,
  message: '',
};

export const GeneralStatesReduxSaga_empty = {
  roles: [],

  categorias: [],

  productos: [],

  loadingStates: {
    rolesLoading: defaultLoadingState,
    categoriasLoading: defaultLoadingState,
    productosLoading: defaultLoadingState,
  },
};
