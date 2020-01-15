import { SET, GRAPH_ADD_NODE, GRAPH_ADD_LINK } from '../actions/graph.action';
import { SELECT_MODE } from '../components/EditingTools';

const initialState = {
  data: {
    nodes: [],
    links: [],
  },
  focusedNodeId: null,
  filename: 'Untitled Graph',
  mode: SELECT_MODE,
  clickedNodeId: null,
  hoveredNodeId: [],
  hoveredLinkId: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET:
    return { ...state, [action.key]: action.value };
  case GRAPH_ADD_NODE:
    return {
      ...state,
      data: { ...state.data, nodes: [...state.data.nodes, action.newNode] },
    };
  case GRAPH_ADD_LINK:
    return {
      ...state,
      data: { ...state.data, links: [...state.data.links, action.newLink] },
    };
  default:
    return state;
  }
}
