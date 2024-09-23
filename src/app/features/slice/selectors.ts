import { createSelector } from '@reduxjs/toolkit';
import { initialState } from 'styles/theme/slice';

import { RootState } from 'types';

const selectSlice = (state: RootState) => state.roles || initialState;

export const select = createSelector([selectSlice], state => state.roles);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.rolesLoading,
);
