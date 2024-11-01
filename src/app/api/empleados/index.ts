// api/empleados/index.ts

import axios from 'axios';
import { EmpleadoEntity } from './types';

export async function getAllEmpleados(): Promise<EmpleadoEntity[]> {
  try {
    const response = await axios.get<EmpleadoEntity[]>(
      'https://localhost:7029/api/Empleado/GetAllEmpleados',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching empleados:', error);
    throw error;
  }
}
