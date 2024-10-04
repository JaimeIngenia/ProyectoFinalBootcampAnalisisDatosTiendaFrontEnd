import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { ProdctGeneralSelects, ResponseState, Entity } from './types';
import { ProdctGeneralSelects_empty } from './emptyTypes';
import { ProductEntity } from 'app/api/products/types';

export const initialState: ProdctGeneralSelects = ProdctGeneralSelects_empty;

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    //Roles
    fetchRolesSuccess(state, action: PayloadAction<Entity[]>) {
      state.roles = action.payload;
      state.loadingStates.rolesLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllSkillsByRoleIdFailed(state, action: PayloadAction<any>) {
      state.loadingStates.rolesLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadRoles(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.rolesLoading = {
        state: actions.payload,
      };
    },

    //Categorias
    fetchCategoriaSuccess(state, action: PayloadAction<Entity[]>) {
      state.categorias = action.payload;
      state.loadingStates.categoriasLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllcategoriasFailed(state, action: PayloadAction<any>) {
      state.loadingStates.categoriasLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadCategorias(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.categoriasLoading = {
        state: actions.payload,
      };
    },

    // Products
    reducerProductsSuccess(state, action: PayloadAction<ProductEntity[]>) {
      state.productos = action.payload;
      state.loadingStates.productosLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerProductsFailed(state, action: PayloadAction<any>) {
      state.loadingStates.productosLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadProducts(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.productosLoading = {
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
