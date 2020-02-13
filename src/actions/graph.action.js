import {
  selectGraphNodes,
  selectGraphLinks,
  selectGraphFilename,
  selectClickedNodeId,
  selectIsAddLinkMode,
  selectNodeKeys,
  selectEditedNode,
  selectDeletedNode,
} from '../selectors/graph.selector';
import { downloadJSON } from '../utils/download';
import {
  SELECT_MODE,
  ADD_LINK_MODE,
  ADD_NODE_MODE,
} from '../components/EditingTools';
import {
  getNewNode,
  getNewLink,
  isLinkDuplicate,
  removeLinksWithNode,
  editLinksWithNewNode,
  isIdExisted,
} from '../utils/graph';
import {
  getUniqueKeys,
  isArrayEqual,
  cleanLinksFromIgnoredKeys,
  cleanNodesFromIgnoredKeys,
} from '../utils/objects';
import { showLoading, hideLoading } from './ui.action';

export const RESET_ALL = 'RESET_ALL';
export const SET = 'GRAPH_SET';
export const SET_GRAPH_NODES = 'SET_GRAPH_NODES';
export const SET_GRAPH_LINKS = 'SET_GRAPH_LINKS';
export const GRAPH_ADD_NODE = 'GRAPH_ADD_NODE';
export const GRAPH_ADD_LINK = 'GRAPH_ADD_LINK';

const set = (key, value) => ({ type: SET, key, value });
const setGraphNodes = nodes => ({ type: SET_GRAPH_NODES, nodes });
const setGraphLinks = links => ({ type: SET_GRAPH_LINKS, links });
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
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const filename = selectGraphFilename(state);
  downloadJSON(
    JSON.stringify(
      {
        nodes: cleanNodesFromIgnoredKeys(nodes),
        links: cleanLinksFromIgnoredKeys(links),
      },
      null,
      4,
    ),
    `${filename}.json`,
  );
};

export const setMode = mode => (dispatch, getState) => {
  dispatch(set('clickedNodeId', null));
  if (mode === SELECT_MODE) {
    dispatch(set('mode', SELECT_MODE));
  }
  if (mode === ADD_NODE_MODE) {
    const state = getState();
    const nodes = selectGraphNodes(state);
    const newNode = getNewNode(nodes);
    dispatch(setGraphNodes([...nodes, newNode]));
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
    const newLink = getNewLink(links, clickedNodeId, nodeId);
    dispatch(setGraphLinks([...links, newLink]));
    dispatch(set('clickedNodeId', null));
  } else {
    dispatch(set('clickedNodeId', nodeId));
  }
};

export const hoverNode = node => dispatch => {
  dispatch(set('hoveredNodeId', node ? [node.id] : []));
};

export const hoverNodes = nodes =>
  set('hoveredNodeId', nodes.map(node => node.id));

export const hoverLink = link => dispatch => {
  dispatch(set('hoveredLinkId', link ? link.id : null));
  dispatch(set('hoveredNodeId', link ? [link.source.id, link.target.id] : []));
};

export const focusNodeOn = node => set('focusedNode', node);

export const resetFocusedNode = () => set('focusedNode', null);

export const editNode = node => set('editedNode', node);

export const cancelEditNode = () => set('editedNode', null);

export const submitEditedNode = editedNode => (dispatch, getState) => {
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const prevEditedNode = selectEditedNode(state);
  const index = nodes.findIndex(node => node.id === prevEditedNode.id);
  const nodeKeys = selectNodeKeys(state);
  const editedNodeUniqueKeys = getUniqueKeys([editedNode]);
  // check if new node id exists in the original node list
  if (
    prevEditedNode.id !== editedNode.id &&
    isIdExisted(nodes, editedNode.id)
  ) {
    // eslint-disable-next-line no-alert
    window.alert('cannot use the same node id');
    return;
  }
  const newNodes = [
    ...nodes.slice(0, index),
    editedNode,
    ...nodes.slice(index + 1),
  ];
  const newLinks = cleanLinksFromIgnoredKeys(
    editLinksWithNewNode(links, prevEditedNode.id, editedNode.id),
  );
  if (!isArrayEqual(editedNodeUniqueKeys, nodeKeys)) {
    // if not the same keys, then nodeKeys = editedNodeUniqueKeys + nodeKeys
    dispatch(set('nodeKeys', getUniqueKeys(newNodes)));
  }
  dispatch(set('data', { nodes: newNodes, links: newLinks }));
  dispatch(set('editedNode', null));
};

export const deleteNode = node => set('deletedNode', node);

export const cancelDeleteNode = () => set('deletedNode', null);

export const submitDeleteNode = () => (dispatch, getState) => {
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const deletedNode = selectDeletedNode(state);
  const index = nodes.findIndex(node => node.id === deletedNode.id);
  const nodeKeys = selectNodeKeys(state);
  const newNodes = [...nodes.slice(0, index), ...nodes.slice(index + 1)];
  const newLinks = removeLinksWithNode(links, deletedNode.id);
  if (!isArrayEqual(getUniqueKeys(newNodes), nodeKeys)) {
    dispatch(set('nodeKeys', getUniqueKeys(newNodes)));
  }
  dispatch(set('data', { nodes: newNodes, links: newLinks }));
  dispatch(set('deletedNode', null));
};

export const refreshGraphLayout = () => (dispatch, getState) => {
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  dispatch(set('data', { nodes, links }));
};

export const handleChangeSearchValue = searchValue =>
  set('searchValue', searchValue);

export const toogleSearchAsFilter = prevValue =>
  set('searchAsFilter', !prevValue);
