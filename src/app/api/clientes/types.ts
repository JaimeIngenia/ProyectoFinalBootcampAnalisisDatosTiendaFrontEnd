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

export interface ClienteEntitySave {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}
