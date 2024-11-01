import axios from 'axios';
import {
  GetUsuarioSimpleResponse,
  LoginResponse,
  LogoutResponse,
  SaveUsuarioRequest,
} from './types';

export async function loginUser(
  correo: string,
  contrasena: string,
): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(
      'https://localhost:7029/api/Usuario/Login',
      { correo, contrasena },
    );
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Método para cerrar sesión del usuario
export async function logoutUser(id: string): Promise<LogoutResponse> {
  try {
    // Llamada a la API para actualizar el estado de ValidationLogin a false
    const response = await axios.put<LogoutResponse>(
      `https://localhost:7029/api/Usuario/UpdateUsuarioLogin/${id}`,
      { ValidationLogin: false }, // Envía false para cerrar sesión
    );
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Método para obtener un usuario simple por ID
export async function getUserById(
  id: string,
): Promise<GetUsuarioSimpleResponse> {
  console.log('ID enviado:', id);
  try {
    const response = await axios.get<GetUsuarioSimpleResponse>(
      `https://localhost:7029/api/Usuario/GetByIdSimple/${id}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data); // Detalles del error
      console.error('Código de estado:', error.response?.status);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
}

// Metodo para save empleado

export async function saveUsuario(data: SaveUsuarioRequest): Promise<void> {
  try {
    const response = await axios.post(
      'https://localhost:7029/api/Usuario/SaveUsuario',
      data,
    );
    console.log('Usuario guardado con éxito:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data); // Detalles del error
      console.error('Código de estado:', error.response?.status);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
}
