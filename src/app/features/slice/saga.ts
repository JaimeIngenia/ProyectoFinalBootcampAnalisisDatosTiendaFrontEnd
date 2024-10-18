import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Entity } from './types';
import { getAllRoles } from 'app/api/roles';
import {
  DELETE_PRODUCT,
  LOAD_CATEGORIAS_LIST,
  LOAD_PRODUCTOS_LIST,
  LOAD_ROLES_LIST,
  SAVE_PRODUCTOS,
} from './sagaActions';
import { getAllCategorias } from 'app/api/categorias';
import { deleteProduct, getAllProductos, saveProduct } from 'app/api/products';
import { ProductEntityGetAll } from 'app/api/products/types';

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

// function* fetchDeleteProductSaga(action: any) {
//   try {
//     yield call(deleteProduct, action.payload);
//     yield put(actions.reducerDeleteProductSuccess(action.payload));
//   } catch (error) {
//     yield put(actions.reducerDeleteProductFailure(error));
//   }
// }
function* fetchDeleteProductSaga(action: any) {
  try {
    yield call(deleteProduct, action.payload);
    yield put(actions.reducerDeleteProductSuccess(action.payload));
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Error desconocido';
    yield put(actions.reducerDeleteProductFailure(errorMessage));
  }
}

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
  yield takeLatest(LOAD_CATEGORIAS_LIST, fetchCategoriasSaga);
  yield takeLatest(LOAD_PRODUCTOS_LIST, fetchProductsSaga);
  yield takeLatest(SAVE_PRODUCTOS, fetchSaveProductSaga);
  yield takeLatest(DELETE_PRODUCT, fetchDeleteProductSaga);
}
