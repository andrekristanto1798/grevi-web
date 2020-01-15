import {
  selectGraphNodes,
  selectGraphLinks,
  selectGraphFilename,
  selectClickedNodeId,
  selectIsAddLinkMode,
} from '../selectors/graph.selector';
import { downloadJSON } from '../utils/download';
import {
  SELECT_MODE,
  ADD_LINK_MODE,
  ADD_NODE_MODE,
} from '../components/EditingTools';
import { getNewNode, getNewLink, isLinkDuplicate } from '../utils/graph';
import { getUniqueKeys, cleanFromIgnoredKeys } from '../utils/objects';
import { showLoading, hideLoading } from './ui.action';

export const RESET_ALL = 'RESET_ALL';
export const SET = 'GRAPH_SET';
export const GRAPH_ADD_NODE = 'GRAPH_ADD_NODE';
export const GRAPH_ADD_LINK = 'GRAPH_ADD_LINK';

const set = (key, value) => ({ type: SET, key, value });
const addNode = newNode => ({ type: GRAPH_ADD_NODE, newNode });
const addLink = newLink => ({ type: GRAPH_ADD_LINK, newLink });
const resetAll = () => ({ type: RESET_ALL });

export const changeFilename = filename => set('filename', filename);

export const loadGraphFile = (filename, { nodes, links }) => dispatch => {
  dispatch(resetAll());
  dispatch(showLoading());
  dispatch(changeFilename(filename));
  dispatch(set('data', { nodes, links }));
  dispatch(hideLoading());
  dispatch(set('nodeKeys', getUniqueKeys(nodes)));
};

export const downloadGraphFile = () => (_, getState) => {
  const state = getState();
  const nodes = selectGraphNodes(state).map(cleanFromIgnoredKeys);
  const links = selectGraphLinks(state)
    .map(cleanFromIgnoredKeys)
    .map(link => ({
      ...link,
      source: link.source.id,
      target: link.target.id,
    }));
  const filename = selectGraphFilename(state);
  downloadJSON(JSON.stringify({ nodes, links }, null, 4), `${filename}.json`);
};

export const focusNode = nodeId => set('focusedNodeId', nodeId);

export const setMode = mode => (dispatch, getState) => {
  dispatch(set('clickedNodeId', null));
  if (mode === SELECT_MODE) {
    dispatch(set('mode', SELECT_MODE));
  }
  if (mode === ADD_NODE_MODE) {
    const state = getState();
    const nodes = selectGraphNodes(state);
    const newNode = getNewNode(nodes);
    dispatch(addNode(newNode));
    // Setting up the nodeKeys when the graph is in empty state
    if (nodes.length === 0) {
      dispatch(set('nodeKeys', getUniqueKeys([newNode])));
    }
  }
  if (mode === ADD_LINK_MODE) {
    dispatch(set('mode', ADD_LINK_MODE));
  }
};

export const clickNode = ({ id: nodeId }) => (dispatch, getState) => {
  const state = getState();
  const isAddLinkMode = selectIsAddLinkMode(state);
  if (!isAddLinkMode) return;
  const clickedNodeId = selectClickedNodeId(state);
  if (!!clickedNodeId && clickedNodeId !== nodeId) {
    const links = selectGraphLinks(state);
    if (isLinkDuplicate(links, clickedNodeId, nodeId)) return;
    dispatch(addLink(getNewLink(clickedNodeId, nodeId)));
    dispatch(set('clickedNodeId', null));
  } else {
    dispatch(set('clickedNodeId', nodeId));
  }
};

export const hoverNode = node => dispatch => {
  dispatch(set('hoveredNodeId', node ? [node.id] : []));
};

export const hoverLink = link => dispatch => {
  dispatch(set('hoveredLinkId', link ? link.id : null));
  dispatch(set('hoveredNodeId', link ? [link.source.id, link.target.id] : []));
};
