import {
  ALGO_SET_GRAPH,
  ALGO_APPLY,
  ALGO_CANCEL,
} from '../actions/algo.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  algo: null,
  graph: null,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ALGO_SET_GRAPH:
    return { ...state, graph: action.graph };
  case ALGO_APPLY:
    return {
      ...state,
      algo: action.algo,
      graph: action.graph,
      error: action.error,
    };
  case ALGO_CANCEL:
    return { ...initialState };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
