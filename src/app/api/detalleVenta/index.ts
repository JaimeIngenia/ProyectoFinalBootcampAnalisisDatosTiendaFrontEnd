import axios from 'axios';
import {
  DetalleVentaPayload,
  DetalleVentaSpecialEntity,
  IDetalleVentaSimple,
  VentaSimplifyEntity,
} from './types';

// Función para guardar el detalle de venta
export async function saveDetalleVenta(payload: DetalleVentaPayload) {
  try {
    const response = await axios.post(
      'https://localhost:7029/api/DetalleVenta/SaveDetalleVenta',
      payload,
    );
    return response.data;
  } catch (error) {
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

// Función para obtener el detalle de venta por ID

export async function getDetalleVentaById(
  id: string,
): Promise<IDetalleVentaSimple> {
  try {
    debugger;
    const response = await axios.get<IDetalleVentaSimple>(
      `https://localhost:7029/api/DetalleVenta/GetDetalleVentaByIdSimple/${id}`,
    );
    return response.data;
  } catch (error) {
    debugger;
    console.error(`Error fetching DetalleVenta ${id}:`, error);
    throw error;
  }
}

// Llama al endpoint para obtener todas las ventas simplificadas
export async function getAllVentasSimplify(): Promise<VentaSimplifyEntity[]> {
  try {
    const response = await axios.get<VentaSimplifyEntity[]>(
      'https://localhost:7029/api/Venta/GetAllSimplify',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching ventas:', error);
    throw error;
  }
}

// Special ById

export async function getDetalleVentaSpecialById(
  ventaId: string,
): Promise<DetalleVentaSpecialEntity[]> {
  try {
    const response = await axios.get<DetalleVentaSpecialEntity[]>(
      `https://localhost:7029/api/DetalleVenta/GetAllDetalleVentaSpecialById/${ventaId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching DetalleVentaSpecial by ventaId:', error);
    throw error;
  }
}
