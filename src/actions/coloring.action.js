import { getUniqueValues } from '../utils/objects';
import { selectGraphNodes } from '../selectors/graph.selector';
import { getDefaultColorMap } from '../utils/color';

export const COLORING_SELECT_KEY = 'COLORING_SELECT_KEY';
export const COLORING_SET_COLOR = 'COLORING_SET_COLOR';

export const selectKey = key => (dispatch, getState) => {
  const state = getState();
  const nodes = selectGraphNodes(state);
  const propertyValues = getUniqueValues(nodes, key).sort();
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
