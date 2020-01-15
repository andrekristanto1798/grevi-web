import { createSelector } from 'reselect';

export const selectLoading = createSelector(
  state => state.ui.loading,
  loading => loading,
);
