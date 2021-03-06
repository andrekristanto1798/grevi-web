/* eslint-disable no-alert */
import throttle from 'lodash/throttle';
import {
  selectGraphNodes,
  selectGraphLinks,
  selectGraphFilename,
  selectClickedNodeId,
  selectIsAddLinkMode,
  selectNodeKeys,
  selectEditedNode,
  selectDeletedNode,
  selectLinkKeys,
  selectEditedLink,
  selectDeletedLink,
  selectGraphDataJS,
} from '../selectors/graph.selector';
import { selectAlgoGraph } from '../selectors/algo.selector';
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
  getLinkSource,
  getLinkTarget,
  editGraphNode,
  removeGraphNode,
  editGraphLink,
  removeGraphLink,
  assertNodeProp,
  assertLinkProp,
} from '../utils/graph';
import {
  getUniqueKeys,
  isArrayEqual,
  cleanLinksFromIgnoredKeys,
  cleanNodesFromIgnoredKeys,
} from '../utils/objects';
import { setAlgoGraph } from './algo.action';
import { showLoading, hideLoading } from './ui.action';
import { changeNodeTextKey } from './setting.action';
import { defaultPopupData } from '../reducers/graph.reducer';

export const RESET_ALL = 'RESET_ALL';
export const SET = 'GRAPH_SET';
export const SET_GRAPH_NODES = 'SET_GRAPH_NODES';
export const SET_GRAPH_LINKS = 'SET_GRAPH_LINKS';

const set = (key, value) => ({ type: SET, key, value });
const setGraphNodes = nodes => ({ type: SET_GRAPH_NODES, nodes });
const setGraphLinks = links => ({ type: SET_GRAPH_LINKS, links });
const resetAll = () => ({ type: RESET_ALL });

export const changeFilename = filename => set('filename', filename);

export const loadGraphFile = (filename, { nodes, links }) => dispatch => {
  dispatch(resetAll());
  dispatch(showLoading());
  try {
    const isNodesValid = nodes.every(assertNodeProp);
    const isLinksValid = links.every(assertLinkProp);
    if (!isNodesValid) {
      throw new Error('All nodes must have id');
    }
    if (!isLinksValid) {
      throw new Error('All links must have id, source, and target');
    }
    const cleanNodes = cleanNodesFromIgnoredKeys(nodes);
    const cleanLinks = cleanLinksFromIgnoredKeys(links);
    dispatch(changeFilename(filename));
    dispatch(
      set('data', {
        nodes: cleanNodes,
        links: cleanLinks,
      }),
    );
    const nodeKeys = getUniqueKeys(cleanNodes);
    const linkKeys = getUniqueKeys(cleanLinks);
    dispatch(set('nodeKeys', nodeKeys));
    dispatch(set('linkKeys', linkKeys));
    if (nodeKeys.includes('name')) {
      dispatch(changeNodeTextKey('name'));
    } else {
      dispatch(changeNodeTextKey('id'));
    }
  } catch (error) {
    window.alert(error);
  }
  dispatch(hideLoading());
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

export const resetPopupData = throttle(
  () => dispatch => {
    dispatch(set('popupData', defaultPopupData));
  },
  200,
);

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
    dispatch(resetPopupData());
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
    if (links.length === 0) {
      dispatch(set('linkKeys', getUniqueKeys([newLink])));
    }
    dispatch(set('clickedNodeId', null));
  } else {
    dispatch(set('clickedNodeId', nodeId));
  }
};

export const hoverNode = node => dispatch => {
  dispatch(set('hoveredNodeId', node ? [node.id] : []));
};

export const hoverNodes = nodes =>
  set('hoveredNodeId', Array.isArray(nodes) ? nodes.map(node => node.id) : []);

export const hoverLink = link => dispatch => {
  dispatch(set('hoveredLinkId', link ? link.id : null));
  dispatch(
    set(
      'hoveredNodeId',
      link ? [getLinkSource(link), getLinkTarget(link)] : [],
    ),
  );
};

export const setNodePopup = (node, position) => dispatch => {
  dispatch(set('popupData', { type: 'node', data: node, position }));
};

export const setLinkPopup = (link, position) => dispatch => {
  dispatch(set('popupData', { type: 'link', data: link, position }));
};

export const focusNodeOn = node => set('focusedNode', node);

export const resetFocusedNode = () => set('focusedNode', null);

export const focusLinkOn = link => set('focusedLink', link);

export const resetFocusedLink = () => set('focusedLink', null);

export const editNode = node => set('editedNode', node);

export const cancelEditNode = () => set('editedNode', null);

export const submitEditedNode = editedNode => (dispatch, getState) => {
  const state = getState();
  const graphData = selectGraphDataJS(state);
  const algoGraph = selectAlgoGraph(state) || {};
  const prevEditedNode = selectEditedNode(state);
  const nodeKeys = selectNodeKeys(state);
  const editedNodeUniqueKeys = getUniqueKeys([editedNode]);
  try {
    const newAlgoGraph = editGraphNode(algoGraph, prevEditedNode, editedNode);
    const { nodes: newNodes, links: newLinks } = editGraphNode(
      graphData,
      prevEditedNode,
      editedNode,
    );
    if (!isArrayEqual(editedNodeUniqueKeys, nodeKeys)) {
      // if not the same keys, then nodeKeys = editedNodeUniqueKeys + nodeKeys
      dispatch(set('nodeKeys', getUniqueKeys(newNodes)));
    }
    dispatch(setAlgoGraph(newAlgoGraph));
    dispatch(set('data', { nodes: newNodes, links: newLinks }));
    dispatch(set('editedNode', null));
  } catch (error) {
    window.alert(error);
  }
};

export const deleteNode = node => set('deletedNode', node);

export const cancelDeleteNode = () => set('deletedNode', null);

export const submitDeleteNode = () => (dispatch, getState) => {
  const state = getState();
  const graphData = selectGraphDataJS(state);
  const algoGraph = selectAlgoGraph(state) || {};
  const deletedNode = selectDeletedNode(state);
  const nodeKeys = selectNodeKeys(state);
  const newAlgoGraph = removeGraphNode(algoGraph, deletedNode);
  const { nodes: newNodes, links: newLinks } = removeGraphNode(
    graphData,
    deletedNode,
  );
  if (!isArrayEqual(getUniqueKeys(newNodes), nodeKeys)) {
    dispatch(set('nodeKeys', getUniqueKeys(newNodes)));
  }
  dispatch(resetPopupData());
  dispatch(setAlgoGraph(newAlgoGraph));
  dispatch(set('data', { nodes: newNodes, links: newLinks }));
  dispatch(set('deletedNode', null));
};

export const editLink = link => set('editedLink', link);

export const cancelEditLink = () => set('editedLink', null);

export const submitEditedLink = editedLink => (dispatch, getState) => {
  const state = getState();
  const graphData = selectGraphDataJS(state);
  const algoGraph = selectAlgoGraph(state) || {};
  const prevEditedLink = selectEditedLink(state);
  const linkKeys = selectLinkKeys(state);
  const editedLinkUniqueKeys = getUniqueKeys([editedLink]);
  try {
    const newAlgoGraph = editGraphLink(algoGraph, prevEditedLink, editedLink);
    const { nodes: newNodes, links: newLinks } = editGraphLink(
      graphData,
      prevEditedLink,
      editedLink,
    );
    if (!isArrayEqual(editedLinkUniqueKeys, linkKeys)) {
      // if not the same keys, then linkKeys = editedNodeUniqueKeys + linkKeys
      dispatch(set('linkKeys', getUniqueKeys(newLinks)));
    }
    dispatch(setAlgoGraph(newAlgoGraph));
    dispatch(set('data', { nodes: newNodes, links: newLinks }));
    dispatch(set('editedLink', null));
  } catch (error) {
    window.alert(error);
  }
};

export const deleteLink = link => set('deletedLink', link);

export const cancelDeleteLink = () => set('deletedLink', null);

export const submitDeleteLink = () => (dispatch, getState) => {
  const state = getState();
  const graphData = selectGraphDataJS(state);
  const algoGraph = selectAlgoGraph(state) || {};
  const deletedLink = selectDeletedLink(state);
  const linkKeys = selectLinkKeys(state);
  const newAlgoGraph = removeGraphLink(algoGraph, deletedLink);
  const { nodes: newNodes, links: newLinks } = removeGraphLink(
    graphData,
    deletedLink,
  );
  if (!isArrayEqual(getUniqueKeys(newLinks), linkKeys)) {
    dispatch(set('linkKeys', getUniqueKeys(newLinks)));
  }
  dispatch(resetPopupData());
  dispatch(setAlgoGraph(newAlgoGraph));
  dispatch(set('data', { nodes: newNodes, links: newLinks }));
  dispatch(set('deletedLink', null));
};

export const refreshGraphLayout = () => (dispatch, getState) => {
  // Refresh Graph Layout just need to create a new object
  // such that redux connect will pick it up as the new state
  const state = getState();
  const graphData = selectGraphDataJS(state);
  const algoGraph = selectAlgoGraph(state) || {};
  dispatch(setAlgoGraph({ ...algoGraph }));
  dispatch(set('data', { ...graphData }));
};

export const handleChangeNodeSearchValue = nodeSearchValue =>
  set('nodeSearchValue', nodeSearchValue);

export const handleChangeLinkSearchValue = linkSearchValue =>
  set('linkSearchValue', linkSearchValue);

export const toogleSearchAsFilter = prevValue =>
  set('searchAsFilter', !prevValue);
