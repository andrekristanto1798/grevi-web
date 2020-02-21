import { createSelector } from 'reselect';
import pick from 'lodash/pick';
import { ADD_LINK_MODE } from '../components/EditingTools';
import { selectMstGraph, selectIsMstApplied } from './mst.selector';
import { getLinkTarget, getLinkSource } from '../utils/graph';
import {
  selectShortestPathGraph,
  selectIsShortestPathApplied,
} from './shortestPath.selector';

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

export const selectGraphFocusedLink = createSelector(
  state => state.graph.focusedLink,
  focusedLink => focusedLink,
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

export const selectLinkKeys = createSelector(
  state => state.graph.linkKeys,
  linkKeys => linkKeys,
);

export const selectEditedNode = createSelector(
  state => state.graph.editedNode,
  editedNode => editedNode,
);

export const selectDeletedNode = createSelector(
  state => state.graph.deletedNode,
  deletedNode => deletedNode,
);

export const selectEditedLink = createSelector(
  state => state.graph.editedLink,
  editedLink => editedLink,
);

export const selectDeletedLink = createSelector(
  state => state.graph.deletedLink,
  deletedLink => deletedLink,
);

export const selectNodeSearchValue = createSelector(
  state => state.graph.nodeSearchValue,
  nodeSearchValue => nodeSearchValue,
);

export const selectLinkSearchValue = createSelector(
  state => state.graph.linkSearchValue,
  linkSearchValue => linkSearchValue,
);

export const selectSearchAsFilter = createSelector(
  state => state.graph.searchAsFilter,
  searchAsFilter => searchAsFilter,
);

export const selectValidData = createSelector(
  selectGraphData,
  selectMstGraph,
  selectShortestPathGraph,
  selectNodeKeys,
  selectLinkKeys,
  selectNodeSearchValue,
  selectLinkSearchValue,
  selectIsMstApplied,
  selectIsShortestPathApplied,
  (
    graphData,
    mstData,
    shortestPathGraph,
    nodeDataKey,
    linkDataKey,
    nodeSearchValue,
    linkSearchValue,
    isMstApplied,
    isShortestPathApplied,
  ) => {
    let data = graphData;
    if (isMstApplied) data = mstData;
    if (isShortestPathApplied) data = shortestPathGraph;
    if (nodeSearchValue === '' && linkSearchValue === '') return data;
    const nodeRegex = new RegExp(nodeSearchValue, 'i');
    const linkRegex = new RegExp(linkSearchValue, 'i');
    const validNodes =
      nodeSearchValue === ''
        ? data.nodes
        : data.nodes.filter(node =>
          nodeRegex.test(JSON.stringify(pick(node, nodeDataKey), ';')),
        );
    const validNodeIds = new Set(validNodes.map(node => node.id));
    const validLinksFromValidNodeIds = data.links.filter(
      link =>
        validNodeIds.has(getLinkSource(link)) &&
        validNodeIds.has(getLinkTarget(link)),
    );
    const validLinks =
      linkSearchValue === ''
        ? validLinksFromValidNodeIds
        : validLinksFromValidNodeIds.filter(link => {
          const cloneLink = {
            ...link,
            source: getLinkSource(link),
            target: getLinkTarget(link),
          };
          return linkRegex.test(
            JSON.stringify(pick(cloneLink, linkDataKey), ';'),
          );
        });
    return { nodes: validNodes, links: validLinks };
  },
);

export const selectVisualizedGraphData = createSelector(
  selectGraphData,
  selectValidData,
  selectMstGraph,
  selectShortestPathGraph,
  selectSearchAsFilter,
  selectIsMstApplied,
  selectIsShortestPathApplied,
  (
    graphData,
    validData,
    mstGraph,
    shortestPathGraph,
    searchAsFilter,
    isMstApplied,
    isShortestPathApplied,
  ) => {
    if (searchAsFilter && isMstApplied) return validData;
    if (searchAsFilter && isShortestPathApplied) return validData;
    if (isMstApplied) return mstGraph;
    if (isShortestPathApplied) return shortestPathGraph;
    return graphData;
  },
);
