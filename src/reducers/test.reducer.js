import { fromJS } from 'immutable';
import { SET } from '../actions/test.action';

const initialState = fromJS({
  counter: 0,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET:
    return state.set(action.key, fromJS(action.value));
  default:
    return state;
  }
}
