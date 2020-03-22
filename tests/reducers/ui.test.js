import uiReducer, { initialState } from '../../src/reducers/ui.reducer';
import * as actions from '../../src/actions/ui.action';
import { RESET_ALL } from '../../src/actions/graph.action';

describe('uiReducer reducer', () => {
  it('should return the initial state', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UI_SET', () => {
    expect(
      uiReducer(initialState, {
        type: actions.UI_SET,
        key: 'loading',
        value: true,
      }),
    ).toMatchObject({
      loading: true,
    });
  });

  it('should handle RESET_ALL', () => {
    expect(
      uiReducer(initialState, {
        type: RESET_ALL,
      }),
    ).toMatchObject(initialState);
  });
});
