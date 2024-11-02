import axios from 'axios';
import { DetalleVentaPayload } from './types';

// Función para guardar el detalle de venta
export async function saveDetalleVenta(payload: DetalleVentaPayload) {
  debugger;
  try {
    debugger;
    const response = await axios.post(
      'https://localhost:7029/api/DetalleVenta/SaveDetalleVenta',
      payload,
    );
    debugger;
    return response.data;
  } catch (error) {
    debugger;
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data);
      throw new Error(
        error.response?.data?.message || 'Error al guardar el detalle de venta',
      );
    } else {
      console.error('Error desconocido:', error);
      throw error;
    }
  }
}
