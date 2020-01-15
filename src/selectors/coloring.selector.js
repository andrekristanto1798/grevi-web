import { createSelector } from 'reselect';

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
