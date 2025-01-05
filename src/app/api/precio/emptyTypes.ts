import { PrecioEntitySave, PrecioEntityUpdate } from './types';

export const precioGuardados_Empty: PrecioEntitySave = {
  productoId: '',
  fechaInicio: undefined,
  precioVenta: undefined,
};

export const preciosUpdate_Empty: PrecioEntityUpdate = {
  // nota agregar el id
  id: '',
  precioVenta: 0,
};
