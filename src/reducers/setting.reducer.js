import { SETTING_SET } from '../actions/setting.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  showNodeLabel: true,
  showLinkLabel: true,
  showNodeText: false,
  autoHideNodeText: false,
  orientation: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SETTING_SET:
    return { ...state, [action.key]: action.value };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
