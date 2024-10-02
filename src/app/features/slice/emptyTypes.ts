import { ResponseState } from './types';

export const ProdctGeneralSelects_empty = {
  roles: [],
  rolesLoading: {
    state: ResponseState.Waiting,
    status: false,
    message: '',
  },
  categorias: [],
  categoriasLoading: {
    state: ResponseState.Waiting,
    status: false,
    message: '',
  },
};
