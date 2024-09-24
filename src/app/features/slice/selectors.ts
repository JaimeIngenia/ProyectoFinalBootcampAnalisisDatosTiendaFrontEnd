import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.roles || initialState;

export const select = createSelector([selectSlice], state => state.roles);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.rolesLoading,
);
