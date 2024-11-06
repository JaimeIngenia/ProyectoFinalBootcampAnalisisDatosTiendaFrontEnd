import { Entity } from 'app/features/slice/types';

export interface ProductEntityGetAll {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoriaNombre: string;
  imagen?: string;
}
export interface ProductEntityGetById {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Entity;
}

// export interface ProductEntitySave {
//   nombre?: string;
//   descripcion?: string;
//   precio?: string;
//   categoriaId?: string;
// }
