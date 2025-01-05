export interface PrecioFormValues {
  id: string;
  productoId: string;
  fechaInicio?: string;
  precioVenta?: number;
}

export interface PrecioEntitySave {
  id?: string;
  productoId?: string;
  fechaInicio?: string;
  precioVenta?: number;
}
