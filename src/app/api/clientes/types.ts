export interface ClienteEntity {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface ClienteSelect {
  clienteId: string;
}
