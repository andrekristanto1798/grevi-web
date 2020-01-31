import uniq from 'lodash/uniq';
import { getUniqueValuesByKey, getIdValuesMapByKey } from '../utils/objects';
import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import { getDefaultColorMap } from '../utils/color';
import { getNodeIdDegreeMap } from '../utils/graph';

export const COLORING_SELECT_KEY = 'COLORING_SELECT_KEY';
export const COLORING_RESET_KEY = 'COLORING_RESET_KEY';
export const COLORING_SET_COLOR = 'COLORING_SET_COLOR';

export const COLORING_SPECIAL = {
  DEGREE: 'DEGREE',
  IN_CENTRALITY: 'IN_CENTRALITY',
  OUT_CENTRALITY: 'OUT_CENTRALITY',
  BETWEENNESS: 'BETWEENNESS',
  CLOSENESS: 'CLOSENESS',
};

const getNodeValuesByKey = (nodes, links, key) => {
  switch (key) {
  case COLORING_SPECIAL.DEGREE: {
    const nodeIdDegreeMap = getNodeIdDegreeMap(links);
    const values = uniq(Object.values(nodeIdDegreeMap));
    return [nodeIdDegreeMap, values];
  }
  case COLORING_SPECIAL.IN_CENTRALITY:
    return [];
  case COLORING_SPECIAL.OUT_CENTRALITY:
    return [];
  case COLORING_SPECIAL.BETWEENNESS:
    return [];
  case COLORING_SPECIAL.CLOSENESS:
    return [];
  default: {
    const nodeIdValuesMap = getIdValuesMapByKey(nodes, key);
    return [nodeIdValuesMap, getUniqueValuesByKey(nodes, key)];
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
    propertyValues,
    colorMap,
  });
};

export const selectColor = (key, color) => ({
  type: COLORING_SET_COLOR,
  colorKey: key,
  colorValue: color,
});
