import {
  COLORING_SELECT_KEY,
  COLORING_SET_COLOR,
  COLORING_RESET_KEY,
} from '../actions/coloring.action';
import { RESET_ALL } from '../actions/graph.action';

const initialState = {
  selectedKey: null,
  nodeIdValuesMap: {},
  propertyValues: [],
  colorMap: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case COLORING_SELECT_KEY:
    return {
      ...state,
      selectedKey: action.selectedKey,
      nodeIdValuesMap: action.nodeIdValuesMap,
      propertyValues: action.propertyValues,
      colorMap: action.colorMap,
    };
  case COLORING_RESET_KEY:
    return { ...initialState };
  case COLORING_SET_COLOR:
    return {
      ...state,
      colorMap: {
        ...state.colorMap,
        [action.colorKey]: action.colorValue,
      },
    };
  case RESET_ALL:
    return initialState;
  default:
    return state;
  }
}
