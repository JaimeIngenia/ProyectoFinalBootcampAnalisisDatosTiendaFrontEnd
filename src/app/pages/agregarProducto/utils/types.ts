// Tipado del producto
export interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: string;
}

export interface ProductEntitySave {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoriaId?: string;
  imagen?: string;
}
