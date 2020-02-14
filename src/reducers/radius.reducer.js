import {
  RADIUS_SET,
  RADIUS_SELECT_KEY,
  RADIUS_SELECT_KEY_ERROR,
  RADIUS_RESET_KEY,
  RADIUS_SET_RADIUS,
} from '../actions/radius.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  selectedKey: null,
  minRadius: 4,
  maxRadius: 18,
  minValue: null,
  maxValue: null,
  nodeIdValuesMap: {},
  propertyValues: [],
  defaultRadius: 4,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case RADIUS_SET:
    return { ...state, [action.key]: action.value };
  case RADIUS_SELECT_KEY:
    return {
      ...state,
      selectedKey: action.selectedKey,
      minValue: action.minValue,
      maxValue: action.maxValue,
      nodeIdValuesMap: action.nodeIdValuesMap,
      propertyValues: action.propertyValues,
      error: null,
    };
  case RADIUS_SELECT_KEY_ERROR:
    return { ...initialState, error: action.error };
  case RADIUS_RESET_KEY:
    return { ...initialState };
  case RADIUS_SET_RADIUS: {
    const {
      minRadius = state.minRadius,
      maxRadius = state.maxRadius,
    } = action;
    return { ...state, minRadius, maxRadius };
  }
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
