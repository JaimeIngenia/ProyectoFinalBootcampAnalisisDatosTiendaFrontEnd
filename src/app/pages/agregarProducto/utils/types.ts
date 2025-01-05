// Tipado del producto
export interface ProductoFormValues {
  id: string;
  nombre: string;
  descripcion: string;
  // precio: number;
  categoriaId: string;
}

export interface ProductEntitySave {
  id?: string;

  nombre?: string;
  descripcion?: string;
  // precio?: number;
  categoriaId?: string;
  imagen?: string;
  // stockActual?: number; // nota
  // porcentajeGanancia?: number; // nota
}
