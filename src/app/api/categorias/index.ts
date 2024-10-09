import { Entity } from 'app/features/slice/types';
import axios from 'axios';

export async function getAllCategorias(): Promise<Entity[]> {
  try {
    const response = await axios.get<Entity[]>(
      'https://localhost:7029/api/Categoria/GetAllCategoria',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}
