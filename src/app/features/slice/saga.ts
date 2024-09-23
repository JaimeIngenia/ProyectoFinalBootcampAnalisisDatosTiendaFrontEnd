import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchRolesSuccess, getAllSkillsByRoleIdFailed } from './index';
import { Role } from './types';
import { getAllRoles } from 'app/api/roles';
import { LOAD_ROLES_LIST } from './sagaActions';

function* fetchRolesSaga() {
  try {
    const roles: Role[] = yield call(getAllRoles);
    yield put(fetchRolesSuccess(roles));
  } catch (error) {
    yield put(getAllSkillsByRoleIdFailed(error));
  }
}

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
}
