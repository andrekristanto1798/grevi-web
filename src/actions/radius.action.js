import uniq from 'lodash/uniq';
import {
  getIdValuesMapByKey,
  reduceMapValuetoNumber,
  sortNumbers,
} from '../utils/objects';
import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import {
  getNodeIdDegreeMap,
  getNodeIdBetweennessMap,
  getNodeIdClosenessMap,
} from '../utils/graph';

export const RADIUS_SELECT_KEY = 'RADIUS_SELECT_KEY';
export const RADIUS_SELECT_KEY_ERROR = 'RADIUS_SELECT_KEY_ERROR';
export const RADIUS_RESET_KEY = 'RADIUS_RESET_KEY';
export const RADIUS_SET_RADIUS = 'RADIUS_SET_RADIUS';

export const RADIUS_SPECIAL = {
  DEGREE: 'DEGREE',
  BETWEENNESS: 'BETWEENNESS',
  CLOSENESS: 'CLOSENESS',
};

const getNodeValuesByKey = (nodes, links, key) => {
  switch (key) {
  case RADIUS_SPECIAL.DEGREE: {
    const nodeIdValuesMap = getNodeIdDegreeMap(nodes, links);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [
      Math.min(...values),
      Math.max(...values),
      nodeIdValuesMap,
      sortNumbers(values),
    ];
  }
  case RADIUS_SPECIAL.BETWEENNESS: {
    const nodeIdValuesMap = getNodeIdBetweennessMap(nodes, links);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [
      Math.min(...values),
      Math.max(...values),
      nodeIdValuesMap,
      sortNumbers(values),
    ];
  }
  case RADIUS_SPECIAL.CLOSENESS: {
    const nodeIdValuesMap = getNodeIdClosenessMap(nodes, links);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [
      Math.min(...values),
      Math.max(...values),
      nodeIdValuesMap,
      sortNumbers(values),
    ];
  }
  default: {
    const nodeIdValuesMap = reduceMapValuetoNumber(
      getIdValuesMapByKey(nodes, key),
    );
    const values = uniq(Object.values(nodeIdValuesMap));
    return [
      Math.min(...values),
      Math.max(...values),
      nodeIdValuesMap,
      values,
    ];
  }
  }
};

export const selectKey = key => (dispatch, getState) => {
  if (key === null) {
    dispatch({ type: RADIUS_RESET_KEY });
    return;
  }
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  try {
    const [
      minValue,
      maxValue,
      nodeIdValuesMap,
      propertyValues,
    ] = getNodeValuesByKey(nodes, links, key);
    if (Number.isNaN(minValue) || Number.isNaN(maxValue))
      throw new Error(`Key ${key} cannot be converted into Number value type`);
    dispatch({
      type: RADIUS_SELECT_KEY,
      selectedKey: key,
      minValue,
      maxValue,
      nodeIdValuesMap,
      propertyValues,
    });
  } catch (error) {
    dispatch({ type: RADIUS_SELECT_KEY_ERROR, error: error.toString() });
  }
};

export const setRadius = (minRadius, maxRadius) => ({
  type: RADIUS_SET_RADIUS,
  minRadius,
  maxRadius,
});
