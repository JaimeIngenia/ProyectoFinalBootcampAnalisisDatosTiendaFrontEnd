import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Entity } from './types';
import { getAllRoles } from 'app/api/roles';
import {
  LOAD_CATEGORIAS_LIST,
  LOAD_PRODUCTOS_LIST,
  LOAD_ROLES_LIST,
  SAVE_PRODUCTOS,
} from './sagaActions';
import { getAllCategorias } from 'app/api/categorias';
import { getAllProductos, saveProduct } from 'app/api/products';
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

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
  yield takeLatest(LOAD_CATEGORIAS_LIST, fetchCategoriasSaga);
  yield takeLatest(LOAD_PRODUCTOS_LIST, fetchProductsSaga);
  yield takeLatest(SAVE_PRODUCTOS, fetchSaveProductSaga);
}
