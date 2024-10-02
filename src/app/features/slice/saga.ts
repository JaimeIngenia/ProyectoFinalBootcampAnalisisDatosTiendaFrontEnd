import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Entity } from './types';
import { getAllRoles } from 'app/api/roles';
import { LOAD_CATEGORIAS_LIST, LOAD_ROLES_LIST } from './sagaActions';
import { getAllCategorias } from 'app/api/categorias';

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

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
  yield takeLatest(LOAD_CATEGORIAS_LIST, fetchCategoriasSaga);
}
