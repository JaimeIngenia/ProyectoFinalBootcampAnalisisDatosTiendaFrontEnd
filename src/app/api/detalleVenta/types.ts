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

export interface VentaSimplifyEntity {
  id: string;
  fecha: string;
  cliente: {
    id: string;
    nombre: string;
    apellido: string;
  };
  empleado: {
    id: string;
    nombre: string;
    apellido: string;
  };
}

export interface DataItemVenta {
  id: string | number;
  cliente: string;
  empleado: string;
  fecha: string | Date;
}
//Special ById

export interface ProductoSpecialEntity {
  precio: number;
  nombre: string;
}

export interface DetalleVentaSpecialEntity {
  id: string;
  ventaId: string;
  cantidad: number;
  producto: ProductoSpecialEntity;
}
