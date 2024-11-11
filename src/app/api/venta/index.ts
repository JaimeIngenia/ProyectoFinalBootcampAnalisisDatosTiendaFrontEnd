// api/ventas.ts

import axios from 'axios';
import {
  SaveVentaRequest,
  VentaGetByIdEntity,
  VentaUpdatePayload,
} from './types';

export async function saveVenta(data: SaveVentaRequest): Promise<void> {
  try {
    const response = await axios.post(
      'https://localhost:7029/api/Venta/SaveVenta',
      data,
    );
    console.log('Venta guardada con éxito:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data);
      console.error('Código de estado:', error.response?.status);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
}

// GetById

export async function getVentaById(
  ventaId: string,
): Promise<VentaGetByIdEntity> {
  try {
    const response = await axios.get<VentaGetByIdEntity>(
      `https://localhost:7029/api/Venta/GetById/${ventaId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching venta ${ventaId}:`, error);
    throw error;
  }
}

// Delete

export async function deleteVenta(ventaId: string): Promise<void> {
  try {
    await axios.delete(
      `https://localhost:7029/api/Venta/DeleteVenta/${ventaId}`,
    );
  } catch (error) {
    console.error(`Error eliminando la venta ${ventaId}:`, error);
    throw error;
  }
}

// Update

// Actualizar una venta
export async function updateVenta(
  ventaId: string,
  ventaData: VentaUpdatePayload,
): Promise<VentaGetByIdEntity> {
  debugger;
  try {
    const response = await axios.put<VentaGetByIdEntity>(
      `https://localhost:7029/api/Venta/UpdateVenta/${ventaId}`,
      ventaData,
    );

    debugger;
    return response.data;
  } catch (error) {
    console.error(`Error updating venta ${ventaId}:`, error);
    throw error;
  }
}
