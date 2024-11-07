// src/api/fidelizacionApi.js
import axios from 'axios';
import { Fidelizacion } from './types';

export async function saveFidelizacion(fidelizacionData: Fidelizacion) {
  try {
    const response = await axios.post(
      'https://localhost:7029/api/Fidelizacion/SaveFidelizacion',
      fidelizacionData,
    );
    return response.data;
  } catch (error) {
    console.error('Error saving fidelizacion:', error);
    throw error;
  }
}
