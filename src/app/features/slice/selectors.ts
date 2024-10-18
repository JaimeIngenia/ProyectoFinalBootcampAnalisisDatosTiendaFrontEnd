import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.generalStates || initialState;

//Roles

export const rolesSelector = createSelector(
  [selectSlice],
  state => state.roles,
);

export const rolesSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.rolesLoading,
);

// Categorías

export const categoriasSelector = createSelector(
  [selectSlice],
  state => state.categorias,
);

export const categoriasSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.categoriasLoading,
);

// Productos

export const productosSelector = createSelector(
  [selectSlice],
  state => state.productos,
);

export const productosSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.productosLoading,
);

// Productos Guardados

export const productoSaveSelector = createSelector(
  [selectSlice],
  state => state.productosGuardados,
);

export const productoSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.productosSaveLoading,
);

// Delete Productos
export const productosDeleteLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.productosDeleteLoading,
);
