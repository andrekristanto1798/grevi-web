import { createSelector } from 'reselect';
import { COLORS } from '../utils/color';

export const selectSelectedKey = createSelector(
  state => state.coloring.selectedKey,
  selectedKey => selectedKey,
);

export const selectTypeSelectedKey = createSelector(
  state => state.coloring.typeSelectedKey,
  typeSelectedKey => typeSelectedKey,
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
  selectSelectedKey,
  (colorMap, selectedKey) => {
    return node => {
      if (selectedKey) return colorMap[node[selectedKey]];
      return COLORS.blueNormal;
    };
  },
);
