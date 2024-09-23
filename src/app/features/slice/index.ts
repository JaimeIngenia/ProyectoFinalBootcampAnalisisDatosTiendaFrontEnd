import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ProdctGeneralSelects, ResponseState, Role, State } from './types';

const initialState: ProdctGeneralSelects = {
  roles: [],
  rolesLoading: {
    state: ResponseState.Waiting,
    status: false,
    message: '',
  },
};

const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRolesSuccess(state, action: PayloadAction<Role[]>) {
      state.roles = action.payload;
      state.rolesLoading = {
        state: ResponseState.Finished,
        status: true,
      };
    },

    getAllSkillsByRoleIdFailed(state, action: PayloadAction<any>) {
      state.rolesLoading = {
        state: ResponseState.Finished,
        status: false,
        message: action.payload,
      };
    },
  },
});

export const { fetchRolesSuccess, getAllSkillsByRoleIdFailed } = slice.actions;

export default slice.reducer;
