import { selectCounterJS } from '../selectors/test.selector';

export const SET = 'TEST_SET';

const set = (key, value) => ({ type: SET, key, value });

export const addCounter = () => async (dispatch, getState) => {
  const state = getState();
  const counter = selectCounterJS(state);
  dispatch(set('counter', counter + 1));
};

export const minusCounter = () => async (dispatch, getState) => {
  const state = getState();
  const counter = selectCounterJS(state);
  dispatch(set('counter', counter - 1));
};
