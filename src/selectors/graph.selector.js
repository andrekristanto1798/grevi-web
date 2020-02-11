import { createSelector } from 'reselect';
import { ADD_LINK_MODE } from '../components/EditingTools';

const selectGraphData = state => state.graph.data;

export const selectGraphDataJS = createSelector(
  selectGraphData,
  data => data,
);

export const selectGraphNodes = createSelector(
  selectGraphData,
  data => data.nodes,
);

export const selectGraphLinks = createSelector(
  selectGraphData,
  data => data.links,
);

export const selectGraphFocusedNode = createSelector(
  state => state.graph.focusedNode,
  focusedNode => focusedNode,
);

export const selectGraphFilename = createSelector(
  state => state.graph.filename,
  filename => filename,
);

export const selectGraphMode = createSelector(
  state => state.graph.mode,
  mode => mode,
);

export const selectIsAddLinkMode = createSelector(
  selectGraphMode,
  mode => mode === ADD_LINK_MODE,
);

export const selectClickedNodeId = createSelector(
  state => state.graph.clickedNodeId,
  clickedNodeId => clickedNodeId,
);

export const selectHoveredNodeId = createSelector(
  state => state.graph.hoveredNodeId,
  hoveredNodeId => hoveredNodeId,
);

export const selectHoveredLinkId = createSelector(
  state => state.graph.hoveredLinkId,
  hoveredLinkId => hoveredLinkId,
);

export const selectNodeKeys = createSelector(
  state => state.graph.nodeKeys,
  nodeKeys => nodeKeys,
);

export const selectEditedNode = createSelector(
  state => state.graph.editedNode,
  editedNode => editedNode,
);

export const selectDeletedNode = createSelector(
  state => state.graph.deletedNode,
  deletedNode => deletedNode,
);