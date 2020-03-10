import {
  SET,
  SET_GRAPH_NODES,
  SET_GRAPH_LINKS,
  RESET_ALL,
} from '../actions/graph.action';
import { SELECT_MODE } from '../components/EditingTools';

const defaultPopupData = {
  type: null,
  data: null,
};

const initialState = {
  // Graph Data
  data: {
    nodes: [],
    links: [],
  },
  zoom: null,
  nodeKeys: [],
  linkKeys: [],
  filename: 'Untitled Graph',
  // Graph Interactions
  mode: SELECT_MODE,
  focusedNode: null,
  clickedNodeId: null,
  hoveredNodeId: [],
  focusedLink: null,
  hoveredLinkId: null,
  popupData: defaultPopupData,
  // Node Actions Edit + Delete
  editedNode: null,
  editedLink: null,
  deletedNode: null,
  deletedLink: null,
  // Search in GraphTableSection
  nodeSearchValue: '',
  linkSearchValue: '',
  searchAsFilter: false,
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
