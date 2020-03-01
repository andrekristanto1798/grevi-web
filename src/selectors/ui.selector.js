import { createSelector } from 'reselect';

export const selectLoading = createSelector(
  state => state.ui.loading,
  loading => loading,
);

export const selectTabIndex = createSelector(
  state => state.ui.tabIndex,
  tabIndex => tabIndex,
);
