import radiusReducer, { initialState } from '../../src/reducers/radius.reducer';
import * as actions from '../../src/actions/radius.action';
import { RESET_ALL } from '../../src/actions/graph.action';

describe('radiusReducer reducer', () => {
  it('should return the initial state', () => {
    expect(radiusReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle RADIUS_SET', () => {
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_SET,
        key: 'abc',
        value: 'abc',
      }),
    ).toMatchObject({
      abc: 'abc',
    });
  });

  it('should handle RADIUS_SELECT_KEY', () => {
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_SELECT_KEY,
        selectedKey: 'key',
        minValue: 1,
        maxValue: 2,
        nodeIdValuesMap: {},
        propertyValues: [],
      }),
    ).toMatchObject({
      selectedKey: 'key',
      minValue: 1,
      maxValue: 2,
      nodeIdValuesMap: {},
      propertyValues: [],
      error: null,
    });
  });

  it('should handle RADIUS_SELECT_KEY_ERROR', () => {
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_SELECT_KEY_ERROR,
        error: 'Error Message',
      }),
    ).toMatchObject({ error: 'Error Message' });
  });

  it('should handle RADIUS_RESET_KEY', () => {
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_RESET_KEY,
      }),
    ).toMatchObject(initialState);
  });

  it('should handle RADIUS_SET_RADIUS', () => {
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_SET_RADIUS,
        minRadius: 14,
      }),
    ).toMatchObject({
      minRadius: 14,
    });
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_SET_RADIUS,
        maxRadius: 14,
      }),
    ).toMatchObject({
      maxRadius: 14,
    });
    expect(
      radiusReducer(initialState, {
        type: actions.RADIUS_SET_RADIUS,
        minRadius: 14,
        maxRadius: 14,
      }),
    ).toMatchObject({
      minRadius: 14,
      maxRadius: 14,
    });
  });

  it('should handle RESET_ALL', () => {
    expect(
      radiusReducer(initialState, {
        type: RESET_ALL,
      }),
    ).toMatchObject(initialState);
  });
});
