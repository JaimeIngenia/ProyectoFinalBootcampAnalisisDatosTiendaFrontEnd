import { ResponseState } from './types';

export const ProdctGeneralSelects_empty = {
  roles: [],
  rolesLoading: {
    state: ResponseState.Waiting,
    status: false,
    message: '',
  },
};
