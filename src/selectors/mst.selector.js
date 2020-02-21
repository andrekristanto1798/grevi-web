import { createSelector } from 'reselect';

export const selectSelectedKey = createSelector(
  state => state.mst.selectedKey,
  selectedKey => selectedKey,
);

export const selectMstGraph = createSelector(
  state => state.mst.mstGraph,
  mstGraph => mstGraph,
);

export const selectIsMstApplied = createSelector(
  state => state.mst.isMstApplied,
  isMstApplied => isMstApplied,
);

export const selectError = createSelector(
  state => state.mst.error,
  error => error,
);
