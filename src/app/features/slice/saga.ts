import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Entity } from './types';
import { getAllRoles } from 'app/api/roles';
import {
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  LOAD_CATEGORIAS_LIST,
  LOAD_PRODUCTOS_LIST,
  LOAD_ROLES_LIST,
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

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
  yield takeLatest(LOAD_CATEGORIAS_LIST, fetchCategoriasSaga);
  yield takeLatest(LOAD_PRODUCTOS_LIST, fetchProductsSaga);
  yield takeLatest(SAVE_PRODUCTOS, fetchSaveProductSaga);
  yield takeLatest(DELETE_PRODUCT, fetchDeleteProductSaga);
  yield takeLatest(UPDATE_PRODUCT, fetchUpdateProductSaga);
  yield takeLatest(GET_PRODUCT_BY_ID, fetchProductById);
}
