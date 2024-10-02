import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { ProdctGeneralSelects, ResponseState, Entity } from './types';
import { ProdctGeneralSelects_empty } from './emptyTypes';

export const initialState: ProdctGeneralSelects = ProdctGeneralSelects_empty;

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    //Roles
    fetchRolesSuccess(state, action: PayloadAction<Entity[]>) {
      state.roles = action.payload;
      state.rolesLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllSkillsByRoleIdFailed(state, action: PayloadAction<any>) {
      state.rolesLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadRoles(state, actions: PayloadAction<ResponseState>) {
      state.rolesLoading = {
        state: actions.payload,
      };
    },

    //Categorias
    fetchCategoriaSuccess(state, action: PayloadAction<Entity[]>) {
      state.categorias = action.payload;
      state.categoriasLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllcategoriasFailed(state, action: PayloadAction<any>) {
      state.categoriasLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadCategorias(state, actions: PayloadAction<ResponseState>) {
      state.categoriasLoading = {
        state: actions.payload,
      };
    },
  },
});

// export const { actions: Actions } = slice;
export const { actions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
