import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { GeneralStatesReduxSaga, ResponseState, Entity } from './types';
import { GeneralStatesReduxSaga_empty } from './emptyTypes';
import { ProductEntityGetAll } from 'app/api/products/types';
import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';

export const initialState: GeneralStatesReduxSaga =
  GeneralStatesReduxSaga_empty;

const slice = createSlice({
  name: 'generalStates',
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
    reducerProductsSuccess(
      state,
      action: PayloadAction<ProductEntityGetAll[]>,
    ) {
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
    // Save Products
    reducerSaveProductSuccess(state, action: PayloadAction<ProductEntitySave>) {
      state.productosGuardados = action.payload;
      state.loadingStates.productosSaveLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerSaveProductFailure(state, action: PayloadAction<any>) {
      state.loadingStates.productosSaveLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadSaveProducts(state, actions: PayloadAction<ResponseState>) {
      state.loadingStates.productosSaveLoading = {
        state: actions.payload,
      };
    },
    // Delete Products
    reducerDeleteProductSuccess(state, action: PayloadAction<string>) {
      state.productos = state.productos.filter(
        producto => producto.id !== action.payload,
      );
      state.loadingStates.productosDeleteLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    reducerDeleteProductFailure(state, action: PayloadAction<any>) {
      state.loadingStates.productosDeleteLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },

    loadDeleteProducts(state, action: PayloadAction<ResponseState>) {
      debugger;
      state.loadingStates.productosDeleteLoading = {
        state: action.payload,
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
