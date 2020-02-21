import {
  SHORTEST_PATH_APPLY,
  SHORTEST_PATH_CANCEL,
} from '../actions/shortestPath.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  selectedKey: null,
  shortestPathGraph: null,
  isShortestPathApplied: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SHORTEST_PATH_APPLY:
    return {
      ...state,
      shortestPathGraph: action.shortestPathGraph,
      isShortestPathApplied: true,
      error: action.error,
    };
  case SHORTEST_PATH_CANCEL:
    return { ...initialState };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
