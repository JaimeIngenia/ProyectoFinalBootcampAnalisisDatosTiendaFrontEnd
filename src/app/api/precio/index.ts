import axios from 'axios';
import { PrecioEntitySave, PrecioEntityUpdate } from './types';

export async function savePrecio(
  precioData: PrecioEntitySave,
): Promise<PrecioEntitySave> {
  try {
    const response = await axios.post<PrecioEntitySave>(
      'https://localhost:7029/api/Precio/SavePrecio',
      precioData,
    );
    return response.data;
  } catch (error) {
    console.error('Error saving precio:', error);
    throw error;
  }
}

export async function updatePrecio(
  id: string,
  precioData: PrecioEntitySave,
): Promise<PrecioEntitySave> {
  try {
    const response = await axios.put<PrecioEntityUpdate>(
      `https://localhost:7029/api/Precio/UpdatePrecio/${id}`,
      precioData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating precio ${id}:`, error);
    throw error;
  }
}

export async function getPrecioByProductId(
  productoId: string,
): Promise<PrecioEntitySave> {
  try {
    const response = await axios.get<PrecioEntityUpdate>(
      `https://localhost:7029/api/Precio/GetPrecioByProductId/${productoId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching precio for productoId ${productoId}:`, error);
    throw error;
  }
}
