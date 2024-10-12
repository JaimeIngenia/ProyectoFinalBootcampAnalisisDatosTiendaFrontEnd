import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';
import { ProductEntityGetAll } from './types'; // Asegúrate de que esta ruta sea correcta
import axios from 'axios';

export async function getAllProductos(): Promise<ProductEntityGetAll[]> {
  try {
    const response = await axios.get<ProductEntityGetAll[]>(
      'https://localhost:7029/api/Producto/GetAllProductos',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
}

// Función para guardar un producto
export async function saveProduct(
  productData: ProductEntitySave,
): Promise<ProductEntitySave> {
  try {
    const response = await axios.post<ProductEntitySave>(
      'https://localhost:7029/api/Producto/SaveProducto',
      productData,
    );
    return response.data;
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
}
