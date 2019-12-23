import { SET } from '../actions/graph.action';

const initialState = {
  data: {
    nodes: [],
    links: [],
  },
  focusedNodeId: null,
  filename: 'Untitled Graph',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET:
    return { ...state, [action.key]: action.value };
  default:
    return state;
  }
}
