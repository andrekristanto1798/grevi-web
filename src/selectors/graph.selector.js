import { createSelector } from 'reselect';

const selectGraphData = state => state.graph.data;

export const selectGraphNodes = createSelector(
  selectGraphData,
  data => data.nodes,
);

export const selectGraphLinks = createSelector(
  selectGraphData,
  data => data.links,
);

export const selectGraphFocusedNodeId = createSelector(
  state => state.graph.focusedNodeId,
  focusedNodeId => focusedNodeId,
);

export const selectGraphFilename = createSelector(
  state => state.graph.filename,
  filename => filename,
);
