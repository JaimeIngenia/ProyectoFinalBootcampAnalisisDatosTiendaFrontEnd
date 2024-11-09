export interface SaveVentaRequest {
  id: string;
  clienteId: string;
  empleadoId: string;
  fecha: string; // Puedes usar Date si prefieres manejar objetos Date
}

export interface VentaGetByIdEntity {
  id: string;
  clienteId: string;
  empleadoId: string;
  fecha: string;
}
