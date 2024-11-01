import axios from 'axios';
import { SucursalEntity } from './types';

export async function getAllSucursales(): Promise<SucursalEntity[]> {
  try {
    const response = await axios.get<SucursalEntity[]>(
      'https://localhost:7029/api/Sucursal/GetAllSucursales',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching sucursales:', error);
    throw error;
  }
}
