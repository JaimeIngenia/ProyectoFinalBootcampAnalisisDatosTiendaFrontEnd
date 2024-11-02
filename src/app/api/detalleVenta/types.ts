export interface DetalleVentaForm {
  productoId: string;
  cantidad: number;
}

export interface DetalleVentaPayload {
  cantidad: number;
  productoId: string;
  ventaId: string;
}
