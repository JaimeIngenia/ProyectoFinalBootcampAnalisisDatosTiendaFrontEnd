import axios from 'axios';
import { PrecioEntitySave } from './types';

export async function savePrecio(
  precioData: PrecioEntitySave,
): Promise<PrecioEntitySave> {
  debugger;
  try {
    const response = await axios.post<PrecioEntitySave>(
      'https://localhost:7029/api/Precio/SavePrecio',
      precioData,
    );
    return response.data;
  } catch (error) {
    debugger;
    console.error('Error saving precio:', error);
    throw error;
  }
}
