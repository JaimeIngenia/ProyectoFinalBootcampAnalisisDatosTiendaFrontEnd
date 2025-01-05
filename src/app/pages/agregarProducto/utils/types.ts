// Tipado del producto
export interface ProductoFormValues {
  // nota agregar el id
  nombre: string;
  descripcion: string;
  // precio: number;
  categoriaId: string;
}

export interface ProductEntitySave {
  // nota agregar el id
  nombre?: string;
  descripcion?: string;
  // precio?: number;
  categoriaId?: string;
  imagen?: string;
}
