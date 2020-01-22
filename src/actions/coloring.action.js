import { getUniqueValues } from '../utils/objects';
import { selectGraphNodes } from '../selectors/graph.selector';
import { getDefaultColorMap } from '../utils/color';

export const COLORING_SELECT_KEY = 'COLORING_SELECT_KEY';
export const COLORING_RESET_KEY = 'COLORING_RESET_KEY';
export const COLORING_SET_COLOR = 'COLORING_SET_COLOR';

export const selectKey = key => (dispatch, getState) => {
  if (key === null) {
    dispatch({ type: COLORING_RESET_KEY });
    return;
  }
  const state = getState();
  const nodes = selectGraphNodes(state);
  const propertyValues = getUniqueValues(nodes, key);
  const colorMap = getDefaultColorMap(propertyValues);
  dispatch({
    type: COLORING_SELECT_KEY,
    selectedKey: key,
    propertyValues,
    colorMap,
  });
};

export const selectColor = (key, color) => ({
  type: COLORING_SET_COLOR,
  colorKey: key,
  colorValue: color,
});
