import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import {
  getShortestPathGraph,
  getMstGraph,
  extractSubgraph,
} from '../utils/graph';
import { showLoading, hideLoading } from './ui.action';

export const ALGO_SET_GRAPH = 'ALGO_SET_GRAPH';
export const ALGO_APPLY = 'ALGO_SELECT_KEY';
export const ALGO_CANCEL = 'ALGO_CANCEL';

export const ALGO_UNIFORM_WEIGHT = 'ALGO_UNIFORM_WEIGHT';

export const ALGO_TYPE = {
  MST: 'MST',
  SHORTEST_PATH: 'SHORTEST_PATH',
  EXTRACT_SUBGRAPH: 'EXTRACT_SUBGRAPH',
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

export const cancelAlgo = () => ({
  type: ALGO_CANCEL,
});

export const setAlgoGraph = graph => ({
  type: ALGO_SET_GRAPH,
  graph,
});

export const applyMst = key => async (dispatch, getState) => {
  dispatch(showLoading());
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const [weightFn, error] = getWeightFn(links, key);
  const mstGraph = getMstGraph(nodes, links, weightFn);
  dispatch(hideLoading());
  dispatch({
    type: ALGO_APPLY,
    algo: ALGO_TYPE.MST,
    graph: mstGraph,
    error,
  });
};

export const applyShortestPath = (fromNode, toNode, key) => async (
  dispatch,
  getState,
) => {
  dispatch(showLoading());
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  try {
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
  } catch (error) {
    dispatch({
      type: ALGO_APPLY,
      algo: ALGO_TYPE.SHORTEST_PATH,
      graph: { nodes, links },
      error: error.toString(),
    });
  }
  dispatch(hideLoading());
};

export const applyExtractSubgraph = (nodeId, numberOfHops) => async (
  dispatch,
  getState,
) => {
  dispatch(showLoading());
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  try {
    const graph = extractSubgraph(nodes, links, nodeId, numberOfHops);
    dispatch({
      type: ALGO_APPLY,
      algo: ALGO_TYPE.EXTRACT_SUBGRAPH,
      graph,
      error: '',
    });
  } catch (error) {
    dispatch({
      type: ALGO_APPLY,
      algo: ALGO_TYPE.EXTRACT_SUBGRAPH,
      graph: { nodes, links },
      error: error.toString(),
    });
  }
  dispatch(hideLoading());
};
