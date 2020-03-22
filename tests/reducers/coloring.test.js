import coloringReducer, {
  initialState,
} from '../../src/reducers/coloring.reducer';
import * as actions from '../../src/actions/coloring.action';
import { RESET_ALL } from '../../src/actions/graph.action';

describe('coloringReducer reducer', () => {
  it('should return the initial state', () => {
    expect(coloringReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle COLORING_SELECT_KEY', () => {
    expect(
      coloringReducer(initialState, {
        type: actions.COLORING_SELECT_KEY,
        selectedKey: 'key',
        nodeIdValuesMap: {},
        valuesNodeMap: {},
        propertyValues: [],
        colorMap: {},
      }),
    ).toMatchObject({
      selectedKey: 'key',
      nodeIdValuesMap: {},
      valuesNodeMap: {},
      propertyValues: [],
      colorMap: {},
    });
  });

  it('should handle COLORING_RESET_KEY', () => {
    expect(
      coloringReducer(initialState, {
        type: actions.COLORING_RESET_KEY,
      }),
    ).toMatchObject(initialState);
  });

  it('should handle COLORING_SET_COLOR', () => {
    expect(
      coloringReducer(initialState, {
        type: actions.COLORING_SET_COLOR,
        colorKey: '1',
        colorValue: 'red',
      }),
    ).toMatchObject({
      colorMap: { '1': 'red' },
    });
  });

  it('should handle RESET_ALL', () => {
    expect(
      coloringReducer(initialState, {
        type: RESET_ALL,
      }),
    ).toMatchObject(initialState);
  });
});
