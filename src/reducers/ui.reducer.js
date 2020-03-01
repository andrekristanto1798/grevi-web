import { UI_SET } from '../actions/ui.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  loading: false,
  tabIndex: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case UI_SET:
    return { ...state, [action.key]: action.value };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
