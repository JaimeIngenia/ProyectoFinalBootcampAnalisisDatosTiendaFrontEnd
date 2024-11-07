import axios from 'axios';
import { MovimientoInventarioEntitySave } from './types';

export async function saveMovimientoInventario(
  movimientoData: MovimientoInventarioEntitySave,
): Promise<MovimientoInventarioEntitySave> {
  try {
    const response = await axios.post<MovimientoInventarioEntitySave>(
      'https://localhost:7029/api/MovimientoInventario/SaveMovimientoInventario',
      movimientoData,
    );
    return response.data;
  } catch (error) {
    console.error('Error saving movimiento de inventario:', error);
    throw error;
  }
}
