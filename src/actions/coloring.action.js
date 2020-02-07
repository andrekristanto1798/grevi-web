import uniq from 'lodash/uniq';
import {
  getIdValuesMapByKey,
  sortNumbers,
  reverseKeyValuesMap,
} from '../utils/objects';
import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import { getDefaultColorMap } from '../utils/color';
import {
  getNodeIdDegreeMap,
  getNodeIdBetweennessMap,
  getNodeIdClosenessMap,
  getNodeIdClusterMap,
} from '../utils/graph';

export const COLORING_SELECT_KEY = 'COLORING_SELECT_KEY';
export const COLORING_RESET_KEY = 'COLORING_RESET_KEY';
export const COLORING_SET_COLOR = 'COLORING_SET_COLOR';

export const COLORING_SPECIAL = {
  DEGREE: 'DEGREE',
  BETWEENNESS: 'BETWEENNESS',
  CLOSENESS: 'CLOSENESS',
  CLUSTERING: 'CLUSTERING',
};

const getNodeValuesByKey = (nodes, links, key) => {
  switch (key) {
  case COLORING_SPECIAL.DEGREE: {
    const nodeIdValuesMap = getNodeIdDegreeMap(nodes, links);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [nodeIdValuesMap, sortNumbers(values)];
  }
  case COLORING_SPECIAL.BETWEENNESS: {
    const nodeIdValuesMap = getNodeIdBetweennessMap(nodes, links);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [nodeIdValuesMap, sortNumbers(values)];
  }
  case COLORING_SPECIAL.CLOSENESS: {
    const nodeIdValuesMap = getNodeIdClosenessMap(nodes, links);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [nodeIdValuesMap, sortNumbers(values)];
  }
  case COLORING_SPECIAL.CLUSTERING: {
    const nodeIdValuesMap = getNodeIdClusterMap(nodes, links, 2);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [nodeIdValuesMap, sortNumbers(values)];
  }
  default: {
    const nodeIdValuesMap = getIdValuesMapByKey(nodes, key);
    const values = uniq(Object.values(nodeIdValuesMap));
    return [nodeIdValuesMap, values];
  }
  }
};

export const selectKey = key => (dispatch, getState) => {
  if (key === null) {
    dispatch({ type: COLORING_RESET_KEY });
    return;
  }
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const [nodeIdValuesMap, propertyValues] = getNodeValuesByKey(
    nodes,
    links,
    key,
  );
  const colorMap = getDefaultColorMap(propertyValues);
  dispatch({
    type: COLORING_SELECT_KEY,
    selectedKey: key,
    nodeIdValuesMap,
    valuesNodeIdMap: reverseKeyValuesMap(nodeIdValuesMap),
    propertyValues,
    colorMap,
  });
};

export const selectColor = (key, color) => ({
  type: COLORING_SET_COLOR,
  colorKey: key,
  colorValue: color,
});
