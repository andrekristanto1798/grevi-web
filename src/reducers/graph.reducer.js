import {
  SET,
  SET_GRAPH_NODES,
  SET_GRAPH_LINKS,
  RESET_ALL,
} from '../actions/graph.action';
import { SELECT_MODE } from '../components/EditingTools';

const initialState = {
  // Graph Data
  data: {
    nodes: [],
    links: [],
  },
  nodeKeys: [],
  filename: 'Untitled Graph',
  // Graph Interactions
  mode: SELECT_MODE,
  focusedNode: null,
  clickedNodeId: null,
  hoveredNodeId: [],
  hoveredLinkId: null,
  // Node Actions Edit + Delete
  editedNode: null,
  editedNodeIndex: null,
  deletedNode: null,
  deletedNodeIndex: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET:
    return { ...state, [action.key]: action.value };
  case SET_GRAPH_NODES:
    return { ...state, data: { ...state.data, nodes: action.nodes } };
  case SET_GRAPH_LINKS:
    return { ...state, data: { ...state.data, links: action.links } };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
