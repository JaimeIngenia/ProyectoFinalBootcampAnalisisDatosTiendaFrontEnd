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

// Eliminar un producto por ID
// export async function deleteProduct(productId: string): Promise<void> {
//   try {
//     debugger;
//     await axios.delete(
//       `https://localhost:7029/api/Producto/DeleteProducto/${productId}`,
//     );
//     console.log(`Producto ${productId} eliminado exitosamente`);
//   } catch (error) {
//     console.error(`Error eliminando el producto ${productId}:`, error);
//     throw error;
//   }
// }

// export const deleteProduct = async (productId: string) => {
//   try {
//     const response = await axios.delete(
//       `https://localhost:7029/api/Producto/DeleteProducto/${productId}`,
//     );
//     console.log('Producto eliminado exitosamente', response.data);
//   } catch (error) {
//     console.error('Error eliminando el producto', error);
//   }
// };

export const deleteProduct = async (productId: string) => {
  console.log('ID enviado a la API:', productId); // Verifica si esto imprime correctamente el GUID

  try {
    const response = await axios.delete(
      `https://localhost:7029/api/Producto/DeleteProducto/${productId}`,
    );
    console.log('Producto eliminado exitosamente', response.data);
  } catch (error) {
    console.error('Error eliminando el producto', error);
  }
};
