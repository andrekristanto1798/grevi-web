import {
  SET,
  SET_GRAPH_NODES,
  SET_GRAPH_LINKS,
  RESET_ALL,
} from '../actions/graph.action';
import { SELECT_MODE } from '../components/EditingTools';

const initialState = {
  data: {
    nodes: [],
    links: [],
  },
  nodeKeys: [],
  focusedNode: null,
  filename: 'Untitled Graph',
  mode: SELECT_MODE,
  clickedNodeId: null,
  hoveredNodeId: [],
  hoveredLinkId: null,
  editedNode: null,
  editedNodeIndex: null,
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
