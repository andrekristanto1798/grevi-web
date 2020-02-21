import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import { getShortestPathGraph } from '../utils/graph';
import { selectKey as selectMstKey } from './mst.action';

export const SHORTEST_PATH_APPLY = 'SHORTEST_PATH_APPLY';
export const SHORTEST_PATH_CANCEL = 'SHORTEST_PATH_CANCEL';

export const SHORTEST_PATH_UNIFORM_WEIGHT = 'SHORTEST_PATH_UNIFORM_WEIGHT';

const defaultWeightFn = () => 1;

const getWeightFn = (links, key) => {
  if (key === SHORTEST_PATH_UNIFORM_WEIGHT) return [defaultWeightFn, null];
  try {
    const map = links.reduce((acc, val) => {
      const valNumber = Number(val[key]);
      if (Number.isNaN(valNumber))
        throw new Error(
          `Key ${key} cannot be converted into all Number value types. So, we are using uniform weight`,
        );
      return { ...acc, [val.id]: Number(val[key]) };
    }, {});
    const weightFn = link => map[link.data];
    return [weightFn, null];
  } catch (e) {
    return [defaultWeightFn, e.toString()];
  }
};

export const applyShortestPath = (fromNode, toNode, key) => (
  dispatch,
  getState,
) => {
  // need to reset mst graph
  dispatch(selectMstKey(null));
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const [weightFn, error] = getWeightFn(links, key);
  const shortestPathGraph = getShortestPathGraph(
    nodes,
    links,
    fromNode,
    toNode,
    weightFn,
  );
  dispatch({
    type: SHORTEST_PATH_APPLY,
    shortestPathGraph,
    error,
  });
};

export const cancelShortestPath = () => ({ type: SHORTEST_PATH_CANCEL });
