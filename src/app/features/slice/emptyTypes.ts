import { LoadingState, ResponseState } from './types';

const defaultLoadingState: LoadingState = {
  state: ResponseState.Waiting,
  status: false,
  message: '',
};

export const ProdctGeneralSelects_empty = {
  roles: [],
  // rolesLoading: {
  //   state: ResponseState.Waiting,
  //   status: false,
  //   message: '',
  // },
  categorias: [],
  // categoriasLoading: {
  //   state: ResponseState.Waiting,
  //   status: false,
  //   message: '',
  // },
  productos: [],
  // productosLoading: {
  //   state: ResponseState.Waiting,
  //   status: false,
  //   message: '',
  // },
  loadingStates: {
    rolesLoading: defaultLoadingState,
    categoriasLoading: defaultLoadingState,
    productosLoading: defaultLoadingState,
  },
};
