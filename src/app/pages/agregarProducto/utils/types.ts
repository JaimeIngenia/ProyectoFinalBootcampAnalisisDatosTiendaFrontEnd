// Tipado del producto
export interface ProductoFormValues {
  id: string;
  nombre: string;
  descripcion: string;
  // precio: number;
  categoriaId: string;
  stockActual?: number; // Nuevo campo opcional
}

export interface ProductEntitySave {
  id?: string;

  nombre?: string;
  descripcion?: string;
  // precio?: number;
  categoriaId?: string;
  imagen?: string;
  stockActual?: number; // Nuevo campo opcional
  // porcentajeGanancia?: number; // nota
}
