// Función para obtener todos los clientes
import axios from 'axios';
import { ClienteEntity } from './types';
export async function getAllClientes(): Promise<ClienteEntity[]> {
  try {
    const response = await axios.get<ClienteEntity[]>(
      'https://localhost:7029/api/Cliente/GetAllClientes',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching clientes:', error);
    throw error;
  }
}
