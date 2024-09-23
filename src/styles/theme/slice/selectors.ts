import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';

const selectRolesSlice = (state: RootState) => state.roles;

// export const selectRoles = createSelector(
//   [selectRolesSlice],
//   rolesSlice => rolesSlice.roles,
// );

// export const selectRolesLoading = createSelector(
//   [selectRolesSlice],
//   rolesSlice => rolesSlice.loading,
// );
