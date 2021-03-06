import { createSelector } from 'reselect';

export const selectSelectedKey = createSelector(
  state => state.radius.selectedKey,
  selectedKey => selectedKey,
);

export const selectNodeIdValuesMap = createSelector(
  state => state.radius.nodeIdValuesMap,
  nodeIdValuesMap => nodeIdValuesMap,
);
export const selectMinRadius = createSelector(
  state => state.radius.minRadius,
  minRadius => minRadius,
);
export const selectMaxRadius = createSelector(
  state => state.radius.maxRadius,
  maxRadius => maxRadius,
);
export const selectMinValue = createSelector(
  state => state.radius.minValue,
  minValue => minValue,
);
export const selectMaxValue = createSelector(
  state => state.radius.maxValue,
  maxValue => maxValue,
);

export const selectPropertyValues = createSelector(
  state => state.radius.propertyValues,
  propertyValues => propertyValues,
);

export const selectDefaultRadius = createSelector(
  state => state.radius.defaultRadius,
  defaultRadius => defaultRadius,
);

export const selectError = createSelector(
  state => state.radius.error,
  error => error,
);

export const selectGetRadius = createSelector(
  selectSelectedKey,
  selectNodeIdValuesMap,
  selectMinRadius,
  selectMaxRadius,
  selectMinValue,
  selectMaxValue,
  selectDefaultRadius,
  (
    selectedKey,
    nodeIdValuesMap,
    minRadius,
    maxRadius,
    minValue,
    maxValue,
    defaultRadius,
  ) => {
    return node => {
      if (!selectedKey) return defaultRadius;
      if (minValue === maxValue) return (minRadius + maxRadius) / 2;
      const value = nodeIdValuesMap[node.id];
      const ratio = (value - minValue) / (maxValue - minValue);
      const adjustedRadius = minRadius + ratio * (maxRadius - minRadius);
      return adjustedRadius;
    };
  },
);
