import {
  selectGraphNodes,
  selectGraphLinks,
} from '../selectors/graph.selector';
import { getMstGraph } from '../utils/graph';

export const MST_SELECT_KEY = 'MST_SELECT_KEY';
export const MST_RESET_KEY = 'MST_RESET_KEY';

export const MST_UNIFORM_WEIGHT = 'MST_UNIFORM_WEIGHT';

const defaultWeightFn = () => 1;

const getWeightFn = (links, key) => {
  if (key === MST_UNIFORM_WEIGHT) return [defaultWeightFn, null];
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

export const selectKey = key => (dispatch, getState) => {
  if (key === null) {
    dispatch({ type: MST_RESET_KEY });
    return;
  }
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const [weightFn, error] = getWeightFn(links, key);
  const mstGraph = getMstGraph(nodes, links, weightFn);
  dispatch({
    type: MST_SELECT_KEY,
    selectedKey: key,
    mstGraph,
    error,
  });
};
