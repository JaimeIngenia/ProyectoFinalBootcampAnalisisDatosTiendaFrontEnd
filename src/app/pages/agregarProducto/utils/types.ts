// Tipado del producto
export interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaId: string; // Campo que vendrá del select
}

export interface ProductEntitySave {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoriaId?: string;
}
