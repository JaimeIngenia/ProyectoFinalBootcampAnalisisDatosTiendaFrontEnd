// api/usuarios.ts

export interface UsuarioEntity {
  id: string;
  nombre: string;
  correo: string;
  validationLogin: boolean;
  tiempoSesionActivo: string;
  imagen: string;
  empleadoId: string;
  rolId: string;
  sucursalId: string;
  empleado?: any;
  rol?: any;
  sucursal?: any;
}

export interface LoginResponse {
  message: string;
  usuario: UsuarioEntity;
}

export interface LogoutResponse {
  message: string;
}

// Define la interfaz que representa la estructura del usuario simple
export interface GetUsuarioSimpleResponse {
  id: string; // GUID del usuario
  nombre: string; // Nombre del usuario
  correo: string; // Correo del usuario
  contrasena: string; // Contrasena del usuario
  validationLogin?: boolean; // Estado de validación del login
  imagen?: string; // Imagen del usuario (opcional)
}

export interface SaveUsuarioRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  empleadoId: string;
  rolId: string;
  sucursalId: string;
  validationLogin?: boolean;
  tiempoSesionActivo?: string; // Tiempo en formato "HH:mm:ss" (puede ser opcional)
  imagen?: string; // URL de la imagen (opcional)
}
