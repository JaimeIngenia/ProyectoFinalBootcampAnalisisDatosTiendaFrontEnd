// Función para obtener todos los clientes
import axios from 'axios';
import { ClienteEntity, ClienteEntitySave } from './types';
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

export async function saveCliente(
  clienteData: ClienteEntitySave,
): Promise<ClienteEntitySave> {
  try {
    const response = await axios.post<ClienteEntitySave>(
      'https://localhost:7029/api/Cliente/SaveCliente',
      clienteData,
    );
    return response.data;
  } catch (error) {
    console.error('Error saving client:', error);
    throw error;
  }
}

// Obtener un cliente por ID
export async function getClientById(clientId: string): Promise<ClienteEntity> {
  try {
    const response = await axios.get<ClienteEntity>(
      `https://localhost:7029/api/Cliente/GetClientById/${clientId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching client ${clientId}:`, error);
    throw error;
  }
}

// Actualizar un cliente existente
export async function updateClient(
  id: string,
  clientData: ClienteEntity,
): Promise<ClienteEntity> {
  try {
    const response = await axios.put<ClienteEntity>(
      `https://localhost:7029/api/Cliente/UpdateCliente/${id}`,
      clientData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating client ${id}:`, error);
    throw error;
  }
}
