import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Entity, ResponseState } from './types';
import { getAllRoles } from 'app/api/roles';
import {
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_USER_BY_ID,
  LOAD_CATEGORIAS_LIST,
  LOAD_PRODUCTOS_LIST,
  LOAD_ROLES_LIST,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_PRODUCTOS,
  UPDATE_PRODUCT,
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
import { LoginResponse, LogoutResponse } from 'app/api/usuarios/types';
import { getUserById, loginUser, logoutUser } from 'app/api/usuarios';

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
}
