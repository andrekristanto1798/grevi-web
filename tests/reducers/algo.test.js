import algoReducer, { initialState } from '../../src/reducers/algo.reducer';
import * as actions from '../../src/actions/algo.action';
import { RESET_ALL } from '../../src/actions/graph.action';

describe('algoReducer reducer', () => {
  it('should return the initial state', () => {
    expect(algoReducer(undefined, {})).toEqual(initialState);
  });

  const emptyGraph = { nodes: [], links: [] };

  it('should handle ALGO_SET_GRAPH', () => {
    expect(
      algoReducer(initialState, {
        type: actions.ALGO_SET_GRAPH,
        graph: emptyGraph,
      }),
    ).toMatchObject({
      graph: emptyGraph,
    });
    expect(
      algoReducer(initialState, {
        type: actions.ALGO_SET_GRAPH,
        graph: null,
      }),
    ).toMatchObject({
      graph: null,
    });
  });

  it('should handle ALGO_APPLY', () => {
    expect(
      algoReducer(initialState, {
        type: actions.ALGO_APPLY,
        algo: 'MST',
        graph: emptyGraph,
        error: null,
      }),
    ).toMatchObject({
      algo: 'MST',
      graph: emptyGraph,
      error: null,
    });
    expect(
      algoReducer(initialState, {
        type: actions.ALGO_APPLY,
        algo: 'MST',
        graph: emptyGraph,
        error: 'Error Message',
      }),
    ).toMatchObject({
      algo: 'MST',
      graph: emptyGraph,
      error: 'Error Message',
    });
  });

  it('should handle ALGO_CANCEL', () => {
    expect(
      algoReducer(initialState, {
        type: actions.ALGO_CANCEL,
      }),
    ).toMatchObject(initialState);
  });

  it('should handle RESET_ALL', () => {
    expect(
      algoReducer(initialState, {
        type: RESET_ALL,
      }),
    ).toMatchObject(initialState);
  });
});
