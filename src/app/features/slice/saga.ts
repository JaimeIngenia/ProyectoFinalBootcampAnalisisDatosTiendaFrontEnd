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
  SAVE_CLIENTE,
  SAVE_MOVIMIENTO_INVENTARIO,
  SAVE_FIDELIZACION,
  GET_CLIENT_BY_ID,
  UPDATE_CLIENT,
  GET_DETALLE_VENTA_BY_ID,
  LOAD_VENTAS_LIST,
  GET_VENTA_BY_ID,
  GET_DETALLE_VENTA_SPECIAL_BY_ID,
  GET_DELETE_VENTA,
  UPDATE_DETALLE_VENTA,
  DELETE_DETALLE_VENTA,
  UPDATE_VENTA,
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
import { ClienteEntity, ClienteEntitySave } from 'app/api/clientes/types';
import {
  getAllClientes,
  getClientById,
  saveCliente,
  updateClient,
} from 'app/api/clientes';
import { SaveVentaRequest, VentaGetByIdEntity } from 'app/api/venta/types';
import {
  deleteVenta,
  getVentaById,
  saveVenta,
  updateVenta,
} from 'app/api/venta';
import {
  deleteDetalleVenta,
  getAllVentasSimplify,
  getDetalleVentaById,
  getDetalleVentaSpecialById,
  saveDetalleVenta,
  updateDetalleVenta,
} from 'app/api/detalleVenta';
import { MovimientoInventarioEntitySave } from 'app/api/movimientoInventario/types';
import { saveMovimientoInventario } from 'app/api/movimientoInventario';
import { Fidelizacion } from 'app/api/fidelizacion/types';
import { saveFidelizacion } from 'app/api/fidelizacion';
import {
  DetalleVentaPayload,
  DetalleVentaSpecialEntity,
  VentaSimplifyEntity,
} from 'app/api/detalleVenta/types';

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
    const clientes: ClienteEntity[] = yield call(getAllClientes);

    yield put(actions.fetchClientesSuccess(clientes));
  } catch (error) {
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

function* fetchSaveClienteSaga(action: any) {
  try {
    const savedCliente: ClienteEntitySave = yield call(
      saveCliente,
      action.payload,
    );
    yield put(actions.reducerSaveClienteSuccess(savedCliente));
  } catch (error) {
    yield put(actions.reducerSaveClienteFailure(error));
  }
}

// Movimiento Inventario

function* saveMovimientoInventarioSaga(action: any) {
  try {
    const savedMovimiento: MovimientoInventarioEntitySave = yield call(
      saveMovimientoInventario,
      action.payload,
    );
    yield put(actions.reducerSaveMovimientoInventarioSuccess(savedMovimiento));
  } catch (error) {
    yield put(actions.reducerSaveMovimientoInventarioFailure(error));
  }
}

// Fidelización

function* saveFidelizacionSaga(action: any) {
  try {
    const savedFidelizacion = yield call(saveFidelizacion, action.payload);
    yield put(actions.saveFidelizacionSuccess(savedFidelizacion));
  } catch (error) {
    yield put(actions.saveFidelizacionFailure(error));
  }
}

// GetClientById

function* fetchClientById(action: any) {
  try {
    const client = yield call(getClientById, action.payload); // Llama a la API con el ID
    yield put(actions.reducerGetClientByIdSuccess(client)); // Acción de éxito
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    yield put(actions.reducerGetClientByIdFailure(errorMessage)); // Acción de fallo
  }
}

// Actualizar Cliente

function* fetchUpdateClientSaga(action) {
  try {
    const { id, clientData } = action.payload;
    const updatedClient = yield call(updateClient, id, clientData);
    yield put(actions.reducerUpdateClientSuccess(updatedClient));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    yield put(actions.reducerUpdateClientFailure(errorMessage));
  }
}

//GetDetalleBentaById

function* fetchDetalleVentaById(action: any) {
  try {
    const detalleVenta = yield call(getDetalleVentaById, action.payload);
    yield put(actions.reducerGetDetalleVentaByIdSuccess(detalleVenta)); // Acción de éxito
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    yield put(actions.reducerGetDetalleVentaByIdFailure(errorMessage)); // Acción de fallo
  }
}

// GetAllVentas Simplify

function* fetchVentasSaga() {
  try {
    const ventas: VentaSimplifyEntity[] = yield call(getAllVentasSimplify); // Llama a la API
    yield put(actions.fetchVentasSuccess(ventas)); // Acción de éxito
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.getAllVentasFailed(errorMessage)); // Acción de fallo
  }
}

// GetbVentaById

function* fetchVentaById(action: any) {
  try {
    const venta: VentaGetByIdEntity = yield call(getVentaById, action.payload);
    yield put(actions.reducerGetVentaByIdSuccess(venta));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    yield put(actions.reducerGetVentaByIdFailure(errorMessage));
  }
}

// GetAllDetalleVentaSpecialById

function* fetchDetalleVentaSpecialByIdSaga(action: any) {
  try {
    const detallesVenta: DetalleVentaSpecialEntity[] = yield call(
      getDetalleVentaSpecialById,
      action.payload,
    ); // Llama a la API con ventaId
    yield put(actions.fetchDetalleVentaSpecialSuccess(detallesVenta)); // Acción de éxito
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.fetchDetalleVentaSpecialFailed(errorMessage)); // Acción de fallo
  }
}

// DeleteVenta with sons

function* fetchDeleteVentaSaga(action: any) {
  try {
    yield call(deleteVenta, action.payload);
    yield put(actions.reducerDeleteVentaSuccess(action.payload));
  } catch (error) {
    yield put(actions.reducerDeleteVentaFailure(error));
  }
}

// Update DetalleVenta

function* fetchUpdateDetalleVentaSaga(action: any) {
  try {
    const { id, detalleVentaData } = action.payload;
    const updatedDetalleVentaData = yield call(
      updateDetalleVenta,
      id,
      detalleVentaData,
    );
    yield put(
      actions.reducerUpdateDetalleVentaSuccess(updatedDetalleVentaData),
    );
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.reducerUpdateDetalleVentaFailure(errorMessage));
  }
}

// Delete DetalleVenta

function* fetchDeleteDetalleVentaSaga(action: any) {
  try {
    yield call(deleteDetalleVenta, action.payload);

    yield put(actions.reducerDeleteDetalleVentaSuccess(action.payload));
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(actions.reducerDeleteDetalleVentaFailure(errorMessage));
  }
}

// update Detalle Venta

function* fetchUpdateVentaSaga(action: any) {
  try {
    const { ventaId, ventaData } = action.payload;
    const updatedVenta = yield call(updateVenta, ventaId, ventaData);

    yield put(actions.reducerUpdateVentaSuccess(updatedVenta));
  } catch (error) {
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(actions.reducerUpdateVentaFailure(errorMessage));
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
  yield takeLatest(SAVE_CLIENTE, fetchSaveClienteSaga);
  yield takeLatest(SAVE_FIDELIZACION, saveFidelizacionSaga);
  yield takeLatest(GET_CLIENT_BY_ID, fetchClientById);
  yield takeLatest(UPDATE_CLIENT, fetchUpdateClientSaga);
  yield takeLatest(GET_DETALLE_VENTA_BY_ID, fetchDetalleVentaById);
  yield takeLatest(LOAD_VENTAS_LIST, fetchVentasSaga);
  yield takeLatest(GET_VENTA_BY_ID, fetchVentaById);
  yield takeLatest(
    GET_DETALLE_VENTA_SPECIAL_BY_ID,
    fetchDetalleVentaSpecialByIdSaga,
  );
  yield takeLatest(GET_DELETE_VENTA, fetchDeleteVentaSaga);
  yield takeLatest(SAVE_MOVIMIENTO_INVENTARIO, saveMovimientoInventarioSaga);
  yield takeLatest(UPDATE_DETALLE_VENTA, fetchUpdateDetalleVentaSaga);
  yield takeLatest(DELETE_DETALLE_VENTA, fetchDeleteDetalleVentaSaga);
  yield takeLatest(UPDATE_VENTA, fetchUpdateVentaSaga);
}
