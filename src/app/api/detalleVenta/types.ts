export interface DetalleVentaForm {
  productoId: string;
  cantidad: number;
}

export interface DetalleVentaPayload {
  cantidad: number;
  productoId: string;
  ventaId: string;
}

export interface IDetalleVentaSimple {
  id: string;
  cantidad: number;
  productoId: string;
  ventaId: string;
}
