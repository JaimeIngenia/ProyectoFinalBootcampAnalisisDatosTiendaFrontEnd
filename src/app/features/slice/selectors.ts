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
// Update Productos
export const productosUpdateLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.productosUpdateLoading,
);
// Get Productos By Id
export const productosGetByIdSelector = createSelector(
  [selectSlice],
  state => state.productoById,
);

export const productosGetByIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.productosGetByIdLoading,
);

//Usuarios

export const LoginSelector = createSelector(
  [selectSlice],
  state => state.loginSuccess,
);

export const loginLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.loginLoading,
);
export const logoutLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.logoutLoading,
);
// Get Usuario By Id
export const ususarioSimpleGetByIdSelector = createSelector(
  [selectSlice],
  state => state.userSimpleById,
);

export const ususarioSimpleGetByIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.userSimpleByIdLoading,
);

// sucursales

export const sucursalesSelector = createSelector(
  [selectSlice],
  state => state.sucursales,
);

export const sucursalesSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.sucursalesLoading,
);
// Empleados

export const empleadosSelector = createSelector(
  [selectSlice],
  state => state.empleados,
);

export const empleadosSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.empleadosLoading,
);

//Usuario
export const usuarioSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.usuariosSaveLoading,
);

// Clientes

export const clientesSelector = createSelector(
  [selectSlice],
  state => state.clientes,
);

export const clientesSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.clientesLoading,
);

//Venta
export const ventaSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.ventasSaveLoading,
);
//Detalle Venta
export const detalleVentaSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.detalleVentaSaveLoading,
);

//Cliente
export const clienteSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.clienteSaveLoading,
);
//Movimiento Inventario
export const movimientoInventarioSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.movimientoInventarioSaveLoading,
);
//Fidelización save
export const fidelizacionSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.fidelizacionSaveLoading,
);

// Get Client By Id
export const clienteGetByIdSelector = createSelector(
  [selectSlice],
  state => state.clienteById,
);

export const clienteGetByIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.clienteGetByIdLoading,
);

// Update Client
export const clienteUpdateLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.clienteUpdateLoading,
);

// Get DetalleVenta By Id
export const detalleVentaGetByIdSelector = createSelector(
  [selectSlice],
  state => state.detalleVentaById,
);

export const detalleVentaGetByIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.detalleVentaGetByIdLoading,
);

// ventas Simplyfy

export const ventasSelector = createSelector(
  [selectSlice],
  state => state.ventas,
);

export const ventasSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.ventasLoading,
);

// Get Venta By Id

export const ventaGetByIdSelector = createSelector(
  [selectSlice],
  state => state.ventaById,
);

export const ventaGetByIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.ventaGetByIdLoading,
);

// Get AllDetalleVenta Special By Id

export const detalleVentaSpecialGetByIdSelector = createSelector(
  [selectSlice],
  state => state.detallesVenta,
);

export const detalleVentaSpecialGetByIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.detalleVentaSpecialLoading,
);

// Delete Venta Loading

export const ventasDeleteLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.ventaDeleteLoading,
);

// Update Detalle Venta

export const detalleVentaUpdateLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.detalleVentaUpdateLoading,
);

// Delete Detalle Venta

export const detalleVentaDeleteLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.detalleVentaDeleteLoading,
);

// Uptdate Venta

export const ventaUpdateLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.ventaUpdateLoading,
);

// Collpase

export const selectIsMenuCollapsedSelector = createSelector(
  [selectSlice],
  state => state.isMenuCollapsed,
);

// Precios Guardados

export const precioSaveSelector = createSelector(
  [selectSlice],
  state => state.preciosGuardados,
);

export const precioSaveSelectorLoading = createSelector(
  [selectSlice],
  state => state.loadingStates.preciosSaveLoading,
);

// Update Precios
export const precioUpdateLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.preciosUpdateLoading,
);

// Get Precio By ProductId
export const precioGetByProductIdSelector = createSelector(
  [selectSlice],
  state => state.precioByProductId,
);

export const precioGetByProductIdLoadingSelector = createSelector(
  [selectSlice],
  state => state.loadingStates.preciosGetByProductIdLoading,
);
