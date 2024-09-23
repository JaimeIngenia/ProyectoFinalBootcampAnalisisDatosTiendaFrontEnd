import { Role } from 'app/features/slice/types';
import axios from 'axios';

export async function getAllRoles(): Promise<Role[]> {
  try {
    const response = await axios.get<Role[]>(
      'https://localhost:7029/api/Rol/GetAllRoles',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
}
