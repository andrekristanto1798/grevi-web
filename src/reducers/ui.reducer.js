import { UI_SET } from '../actions/ui.action';

const initialState = {
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case UI_SET:
    return { ...state, [action.key]: action.value };
  default:
    return state;
  }
}
