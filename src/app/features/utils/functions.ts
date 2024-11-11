import { VentaSimplifyEntity } from 'app/api/detalleVenta/types';
import { VentaGetByIdEntity } from 'app/api/venta/types';

export function mapVentaGetByIdToSimplify(
  venta: VentaGetByIdEntity,
): VentaSimplifyEntity {
  return {
    id: venta.id,
    fecha: venta.fecha,
    cliente: {
      id: venta.clienteId,
      nombre: 'NombreCliente', // Asigna el nombre y apellido correctos si están disponibles
      apellido: 'ApellidoCliente',
    },
    empleado: {
      id: venta.empleadoId,
      nombre: 'NombreEmpleado', // Asigna el nombre y apellido correctos si están disponibles
      apellido: 'ApellidoEmpleado',
    },
  };
}
