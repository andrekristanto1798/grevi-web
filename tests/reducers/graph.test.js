import graphReducer, { initialState } from '../../src/reducers/graph.reducer';
import * as actions from '../../src/actions/graph.action';

describe('graphReducer reducer', () => {
  it('should return the initial state', () => {
    expect(graphReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET', () => {
    expect(
      graphReducer(initialState, {
        type: actions.SET,
        key: 'filename',
        value: 'XYZ',
      }),
    ).toMatchObject({ filename: 'XYZ' });
  });

  it('should handle SET_GRAPH_NODES', () => {
    expect(
      graphReducer(initialState, {
        type: actions.SET_GRAPH_NODES,
        nodes: [{ id: 1 }, { id: 2 }],
      }),
    ).toMatchObject({
      data: {
        nodes: [{ id: 1 }, { id: 2 }],
        links: [],
      },
    });
  });

  it('should handle SET_GRAPH_LINKS', () => {
    expect(
      graphReducer(initialState, {
        type: actions.SET_GRAPH_LINKS,
        links: [{ id: 1 }, { id: 2 }],
      }),
    ).toMatchObject({
      data: {
        nodes: [],
        links: [{ id: 1 }, { id: 2 }],
      },
    });
  });

  it('should handle RESET_ALL', () => {
    expect(
      graphReducer(initialState, {
        type: actions.RESET_ALL,
      }),
    ).toMatchObject(initialState);
  });
});
