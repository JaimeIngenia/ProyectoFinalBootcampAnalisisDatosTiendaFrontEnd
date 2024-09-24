import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './index';
import { Role } from './types';
import { getAllRoles } from 'app/api/roles';
import { LOAD_ROLES_LIST } from './sagaActions';

function* fetchRolesSaga() {
  try {
    const roles: Role[] = yield call(getAllRoles);
    yield put(actions.fetchRolesSuccess(roles));
  } catch (error) {
    yield put(actions.getAllSkillsByRoleIdFailed(error));
  }
}

export function* Saga() {
  yield takeLatest(LOAD_ROLES_LIST, fetchRolesSaga);
}
