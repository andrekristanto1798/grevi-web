import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as algoActions from '../../src/actions/algo.action.js';
import { delay, getExpectedActionsWithLoading } from '../utils.js';

const types = {
  ALGO_SET_GRAPH: algoActions.ALGO_SET_GRAPH,
  ALGO_APPLY: algoActions.ALGO_APPLY,
  ALGO_CANCEL: algoActions.ALGO_CANCEL,
};

const invalidKeyError =
  'Error: Key invalidKey cannot be converted into all Number value types. So, we are using uniform weight';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('algo action tests', () => {
  it('creates ALGO_CANCEL when cancelAlgo', async () => {
    const expectedActions = [
      {
        type: types.ALGO_CANCEL,
      },
    ];
    const store = mockStore({ algo: {} });
    await store.dispatch(algoActions.cancelAlgo());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  const emptyGraph = { nodes: [], links: [] };

  it('creates ALGO_SET_GRAPH when setAlgoGraph', async () => {
    const expectedActions = [
      {
        type: types.ALGO_SET_GRAPH,
        graph: emptyGraph,
      },
    ];
    const store = mockStore({ algo: {} });
    await store.dispatch(algoActions.setAlgoGraph(emptyGraph));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  const mockGraph = {
    nodes: [{ id: 1 }, { id: 2 }],
    links: [{ id: 1, source: 1, target: 2 }],
  };

  it('creates ALGO_APPLY when applyMst on valid key', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.MST,
        error: null,
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyMst('id'));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyMst on invalidKey', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.MST,
        error: invalidKeyError,
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyMst('invalidKey'));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyShortestPath on valid key', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.SHORTEST_PATH,
        error: null,
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyShortestPath(1, 2, 'id'));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyShortestPath on invalid key', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.SHORTEST_PATH,
        error: invalidKeyError,
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyShortestPath(1, 2, 'invalidKey'));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyShortestPath on invalid fromNode', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.SHORTEST_PATH,
        error: 'Error: fromId is not defined in this graph: 3',
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyShortestPath(3, 4, 'invalidKey'));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyShortestPath on invalid toNode', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.SHORTEST_PATH,
        error: 'Error: toId is not defined in this graph: 4',
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyShortestPath(1, 4, 'invalidKey'));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyExtractSubgraph on valid nodeId', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.EXTRACT_SUBGRAPH,
        error: null,
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyExtractSubgraph(1, 1));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates ALGO_APPLY when applyExtractSubgraph on invalid nodeId', async () => {
    const expectedActions = getExpectedActionsWithLoading([
      {
        type: types.ALGO_APPLY,
        graph: mockGraph,
        algo: algoActions.ALGO_TYPE.EXTRACT_SUBGRAPH,
        error: 'Error: nodeId (5) does not exist',
      },
    ]);
    const store = mockStore({ graph: { data: mockGraph }, algo: {} });
    await store.dispatch(algoActions.applyExtractSubgraph(5, 1));
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
