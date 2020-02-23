import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import { getShortestPathGraph, getMstGraph } from '../utils/graph';

export const ALGO_APPLY = 'ALGO_SELECT_KEY';
export const ALGO_CANCEL = 'ALGO_CANCEL';

export const ALGO_UNIFORM_WEIGHT = 'ALGO_UNIFORM_WEIGHT';

export const ALGO_TYPE = {
  MST: 'MST',
  SHORTEST_PATH: 'SHORTEST_PATH',
};

const defaultWeightFn = () => 1;

const getWeightFn = (links, key) => {
  if (key === ALGO_UNIFORM_WEIGHT) return [defaultWeightFn, null];
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

export const cancelMst = () => ({
  type: ALGO_CANCEL,
  algo: ALGO_TYPE.MST,
});

export const cancelShortestPath = () => ({
  type: ALGO_CANCEL,
  algo: ALGO_TYPE.SHORTEST_PATH,
});

export const applyMst = key => (dispatch, getState) => {
  // need to reset shortest path graph
  dispatch(cancelShortestPath());
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const [weightFn, error] = getWeightFn(links, key);
  const mstGraph = getMstGraph(nodes, links, weightFn);
  dispatch({
    type: ALGO_APPLY,
    algo: ALGO_TYPE.MST,
    graph: mstGraph,
    error,
  });
};

export const applyShortestPath = (fromNode, toNode, key) => (
  dispatch,
  getState,
) => {
  // need to reset mst graph
  dispatch(applyMst(null));
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
    type: ALGO_APPLY,
    algo: ALGO_TYPE.SHORTEST_PATH,
    graph: shortestPathGraph,
    error,
  });
};
