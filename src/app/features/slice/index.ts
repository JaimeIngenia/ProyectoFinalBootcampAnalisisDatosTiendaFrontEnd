import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { ProdctGeneralSelects, ResponseState, Role } from './types';
import { ProdctGeneralSelects_empty } from './emptyTypes';

export const initialState: ProdctGeneralSelects = ProdctGeneralSelects_empty;

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

// export const { actions: Actions } = slice;
export const { actions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
