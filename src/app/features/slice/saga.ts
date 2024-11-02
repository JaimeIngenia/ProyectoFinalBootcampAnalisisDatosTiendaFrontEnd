import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Entity, ResponseState } from './types';
import { getAllRoles } from 'app/api/roles';
import {
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_USER_BY_ID,
  LOAD_CATEGORIAS_LIST,
  LOAD_EMPLEADOS_LIST,
  LOAD_PRODUCTOS_LIST,
  LOAD_ROLES_LIST,
  LOAD_SUCURSALES_LIST,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_USUARIO,
  SAVE_PRODUCTOS,
  UPDATE_PRODUCT,
  LOAD_CLIENTES_LIST,
  SAVE_VENTA,
  SAVE_DETALLE_VENTA,
} from './sagaActions';
import { getAllCategorias } from 'app/api/categorias';
import {
  deleteProduct,
  getAllProductos,
  getProductById,
  saveProduct,
  updateProduct,
} from 'app/api/products';
import { ProductEntityGetAll } from 'app/api/products/types';
import {
  LoginResponse,
  LogoutResponse,
  SaveUsuarioRequest,
} from 'app/api/usuarios/types';
import {
  getUserById,
  loginUser,
  logoutUser,
  saveUsuario,
} from 'app/api/usuarios';
import { getAllSucursales } from 'app/api/sucursales';
import { EmpleadoEntity } from 'app/api/empleados/types';
import { getAllEmpleados } from 'app/api/empleados';
import { ClienteEntity } from 'app/api/clientes/types';
import { getAllClientes } from 'app/api/clientes';
import { SaveVentaRequest } from 'app/api/venta/types';
import { saveVenta } from 'app/api/venta';
import { saveDetalleVenta } from 'app/api/detalleVenta';

function* fetchRolesSaga() {
  try {
    const roles: Entity[] = yield call(getAllRoles);
    yield put(actions.fetchRolesSuccess(roles));
  } catch (error) {
    yield put(actions.getAllSkillsByRoleIdFailed(error));
  }
}
function* fetchCategoriasSaga() {
  try {
    const categorias: Entity[] = yield call(getAllCategorias);
    yield put(actions.fetchCategoriaSuccess(categorias));
  } catch (error) {
    yield put(actions.getAllcategoriasFailed(error));
  }
}
function* fetchProductsSaga() {
  try {
    const productos: ProductEntityGetAll[] = yield call(getAllProductos);
    yield put(actions.reducerProductsSuccess(productos));
  } catch (error) {
    yield put(actions.reducerProductsFailed(error));
  }
}

function* fetchSaveProductSaga(action: any) {
  try {
    const savedProduct = yield call(saveProduct, action.payload);
    yield put(actions.reducerSaveProductSuccess(savedProduct));
  } catch (error) {
    yield put(actions.reducerSaveProductFailure(error));
  }
}

function* fetchDeleteProductSaga(action: any) {
  try {
    yield call(deleteProduct, action.payload);
    yield put(actions.reducerDeleteProductSuccess(action.payload));
  } catch (error) {
    yield put(actions.reducerDeleteProductFailure(error));
  }
}

// Saga para actualizar un producto existente
function* fetchUpdateProductSaga(action) {
  try {
    const { id, productData } = action.payload;
    const updatedProduct = yield call(updateProduct, id, productData);
    yield put(actions.reducerUpdateProductSuccess(updatedProduct));
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.reducerUpdateProductFailure(errorMessage));
  }
}
// Saga para traer un producto existente por id
function* fetchProductById(action) {
  try {
    const product = yield call(getProductById, action.payload); // Llama a la API con el ID
    yield put(actions.reducerGetProductByIdSuccess(product)); // Llama a la acción de éxito
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.reducerGetProductByIdFailure(errorMessage)); // Llama a la acción de fallo
  }
}

// Usuario Login

function* fetchLoginSaga(action: any) {
  try {
    // Llamar a la función de API loginUser con las credenciales
    const loginResponse: LoginResponse = yield call(
      loginUser,
      action.payload.correo,
      action.payload.contrasena,
    );

    // Despachar acción de éxito con la información del usuario
    yield put(actions.reducerLoginSuccess(loginResponse.usuario));
    // Ahora despachamos la acción para obtener el usuario por ID
    if (loginResponse.usuario && loginResponse.usuario.id) {
      yield put(actions.loadUserById(ResponseState.InProgress)); // Cambiamos el estado a Started
      yield put({
        type: 'GET_USER_BY_ID', // Asegúrate de que esta acción esté definida
        payload: { id: loginResponse.usuario.id },
      });
    }
  } catch (error) {
    // Despachar acción de error
    yield put(actions.reducerLoginFailure(error));
  }
}

function* fetchLogoutSaga(action: any) {
  try {
    // Llamar a la función de API logoutUser con el ID del usuario
    const logoutResponse: LogoutResponse = yield call(
      logoutUser,
      action.payload.id,
    );

    // Despachar acción de éxito si se cierra sesión correctamente
    yield put(actions.reducerLogoutSuccess(logoutResponse.message));
  } catch (error) {
    // Despachar acción de error en caso de fallo
    yield put(actions.reducerLogoutFailure(error));
  }
}

function* fetchUserById(action: any) {
  try {
    const user = yield call(getUserById, action.payload.id); // Llama a la API con el ID
    yield put(actions.reducerGetUserByIdSuccess(user)); // Llama a la acción de éxito
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.reducerGetUserByIdFailure(errorMessage)); // Llama a la acción de fallo
  }
}
function* saveUsuarioSaga(action: any) {
  try {
    yield call(saveUsuario, action.payload);
    yield put(actions.saveUsuarioSuccess()); // Actualizar el estado en caso de éxito
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.saveUsuarioFailed(errorMessage)); // Enviar mensaje de error al reducer
  }
}

// sUCURSALES
function* fetchSucursalesSaga() {
  try {
    // Llamada a la API para obtener todas las sucursales
    const sucursales = yield call(getAllSucursales);

    // Desestructuración y conversión de los datos en el formato Entity
    const entidades: Entity[] = sucursales.map(sucursal => ({
      id: sucursal.id,
      nombre: sucursal.region, // Nombre se asigna como región
    }));

    // Enviar los datos procesados al reducer
    yield put(actions.fetchSucursalesSuccess(entidades));
  } catch (error) {
    // Manejo del error y envío del mensaje al reducer
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.getAllSucursalesFailed(errorMessage));
  }
}

//Empleados

function* fetchEmpleadosSaga() {
  try {
    // Llamada a la API para obtener todos los empleados
    const empleados: EmpleadoEntity[] = yield call(getAllEmpleados);

    // Convertir los datos en formato Entity
    const entidades: Entity[] = empleados.map(empleado => ({
      id: empleado.id,
      nombre: `${empleado.nombre} ${empleado.apellido}`, // Concatenar nombre completo
    }));

    // Enviar los datos procesados al reducer
    yield put(actions.fetchEmpleadosSuccess(entidades));
  } catch (error) {
    // Manejo del error y envío al reducer
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.getAllEmpleadosFailed(errorMessage));
  }
}

// Clientes

// Saga para obtener y transformar los datos de clientes
function* fetchClientesSaga() {
  try {
    // Llamada a la API para obtener todos los clientes
    const clientes: ClienteEntity[] = yield call(getAllClientes);

    // Desestructuración y conversión de los datos en el formato ClienteSimple
    const clientesFiltrados: Entity[] = clientes.map(cliente => ({
      id: cliente.id,
      nombre: cliente.nombre, // Usar solo el nombre completo sin apellido
    }));

    // Enviar los datos procesados al reducer
    yield put(actions.fetchClientesSuccess(clientesFiltrados));
  } catch (error) {
    // Manejo del error y envío del mensaje al reducer
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.getAllClientesFailed(errorMessage));
  }
}

//Ventas

function* saveVentaSaga(action: any) {
  try {
    yield call(saveVenta, action.payload);
    yield put(actions.saveVentaSuccess()); // Actualizar el estado en caso de éxito
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.saveVentaFailed(errorMessage)); // Enviar mensaje de error al reducer
  }
}

//DetalleVentas

function* saveDetalleVentaSaga(action: any) {
  try {
    // Llama a la función de API con el payload
    const response = yield call(saveDetalleVenta, action.payload);
    yield put(actions.saveDetalleVentaSuccess(response));
  } catch (error) {
    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.saveDetalleVentaFailed(errorMessage));
  }
}

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
  yield takeLatest(LOAD_CATEGORIAS_LIST, fetchCategoriasSaga);
  yield takeLatest(LOAD_PRODUCTOS_LIST, fetchProductsSaga);
  yield takeLatest(SAVE_PRODUCTOS, fetchSaveProductSaga);
  yield takeLatest(DELETE_PRODUCT, fetchDeleteProductSaga);
  yield takeLatest(UPDATE_PRODUCT, fetchUpdateProductSaga);
  yield takeLatest(GET_PRODUCT_BY_ID, fetchProductById);
  yield takeLatest(LOGIN_USER, fetchLoginSaga);
  yield takeLatest(LOGOUT_USER, fetchLogoutSaga);
  yield takeLatest(GET_USER_BY_ID, fetchUserById);
  yield takeLatest(LOAD_SUCURSALES_LIST, fetchSucursalesSaga);
  yield takeLatest(LOAD_EMPLEADOS_LIST, fetchEmpleadosSaga);
  yield takeLatest(SAVE_USUARIO, saveUsuarioSaga);
  yield takeLatest(LOAD_CLIENTES_LIST, fetchClientesSaga);
  yield takeLatest(SAVE_VENTA, saveVentaSaga);
  yield takeLatest(SAVE_DETALLE_VENTA, saveDetalleVentaSaga);
}
