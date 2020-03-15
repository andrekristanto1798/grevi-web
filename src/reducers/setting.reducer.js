import { SETTING_SET } from '../actions/setting.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  showNodeLabel: true,
  showLinkLabel: true,
  showNodeText: true,
  showTextOnly: false,
  showLinkDirection: false,
  nodeTextKey: 'id',
  autoHideNodeText: true,
  orientation: null,
  focusOnDoubleClick: true,
  highlightOnRowHover: true,
  forceChargeStrength: -30,
  forceLinkDistance: 30,
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
