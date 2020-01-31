import { createSelector } from 'reselect';
import { COLORS } from '../utils/color';

export const selectSelectedKey = createSelector(
  state => state.coloring.selectedKey,
  selectedKey => selectedKey,
);

export const selectNodeIdValuesMap = createSelector(
  state => state.coloring.nodeIdValuesMap,
  nodeIdValuesMap => nodeIdValuesMap,
);

export const selectPropertyValues = createSelector(
  state => state.coloring.propertyValues,
  propertyValues => propertyValues,
);

export const selectColorMap = createSelector(
  state => state.coloring.colorMap,
  colorMap => colorMap,
);

export const selectGetColor = createSelector(
  selectColorMap,
  selectNodeIdValuesMap,
  selectSelectedKey,
  (colorMap, nodeIdValuesMap, selectedKey) => {
    return node => {
      if (selectedKey) return colorMap[nodeIdValuesMap[node.id]];
      return COLORS.blueNormal;
    };
  },
);
