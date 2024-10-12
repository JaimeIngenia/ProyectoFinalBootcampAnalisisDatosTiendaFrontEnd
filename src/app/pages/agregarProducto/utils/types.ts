// Tipado del producto
export interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: number; // Campo que vendrá del select
}

export interface ProductEntitySave {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoriaId?: number;
}
