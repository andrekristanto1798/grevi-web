import {
  selectGraphNodes,
  selectGraphLinks,
  selectGraphFilename,
} from '../selectors/graph.selector';
import { downloadJSON } from '../utils/download';

export const SET = 'GRAPH_SET';

const set = (key, value) => ({ type: SET, key, value });

export const loadGraphFile = ({ nodes, links }) =>
  set('data', { nodes, links });

export const downloadGraphFile = () => (_, getState) => {
  const state = getState();
  const nodes = selectGraphNodes(state);
  const links = selectGraphLinks(state);
  const filename = selectGraphFilename(state);
  downloadJSON(JSON.stringify({ nodes, links }, null, 4), `${filename}.json`);
};

export const changeFilename = filename => set('filename', filename);

export const focusNode = nodeId => set('focusedNodeId', nodeId);
