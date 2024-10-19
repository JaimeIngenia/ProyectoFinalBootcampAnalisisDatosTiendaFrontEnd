import { ProductEntitySave } from 'app/pages/agregarProducto/utils/types';
import { ProductEntityGetAll, ProductEntityGetById } from './types'; // Asegúrate de que esta ruta sea correcta
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

// Eliminar un producto por ID
export async function deleteProduct(productId: string): Promise<void> {
  try {
    await axios.delete(
      `https://localhost:7029/api/Producto/DeleteProducto/${productId}`,
    );
  } catch (error) {
    console.error(`Error eliminando el producto ${productId}:`, error);
    throw error;
  }
}

// Actualizar un producto existente
export async function updateProduct(
  id: string,
  productData: ProductEntitySave,
): Promise<ProductEntitySave> {
  try {
    const response = await axios.put<ProductEntitySave>(
      `https://localhost:7029/api/Producto/UpdateProducto/${id}`,
      productData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
}

// Obtener un producto por ID
export async function getProductById(
  productId: string,
): Promise<ProductEntityGetById> {
  try {
    const response = await axios.get<ProductEntityGetById>(
      `https://localhost:7029/api/Producto/GetProductById/${productId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
}
