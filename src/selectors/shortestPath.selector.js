import { createSelector } from 'reselect';

export const selectShortestPathGraph = createSelector(
  state => state.shortestPath.shortestPathGraph,
  shortestPathGraph => shortestPathGraph,
);

export const selectIsShortestPathApplied = createSelector(
  state => state.shortestPath.isShortestPathApplied,
  isShortestPathApplied => isShortestPathApplied,
);

export const selectError = createSelector(
  state => state.shortestPath.error,
  error => error,
);
