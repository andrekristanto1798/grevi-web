import { MST_SELECT_KEY, MST_RESET_KEY } from '../actions/mst.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  selectedKey: null,
  mstGraph: null,
  isMstApplied: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case MST_SELECT_KEY:
    return {
      ...state,
      selectedKey: action.selectedKey,
      mstGraph: action.mstGraph,
      isMstApplied: true,
      error: action.error,
    };
  case MST_RESET_KEY:
    return { ...initialState };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
