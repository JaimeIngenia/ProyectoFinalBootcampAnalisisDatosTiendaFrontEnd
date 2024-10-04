import { ProductEntity } from './types'; // Asegúrate de que esta ruta sea correcta
import axios from 'axios';

export async function getAllProductos(): Promise<ProductEntity[]> {
  try {
    const response = await axios.get<ProductEntity[]>(
      'https://localhost:7029/api/Producto/GetAllProductos',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
}
