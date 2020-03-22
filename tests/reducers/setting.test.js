import settingReducer, {
  initialState,
} from '../../src/reducers/setting.reducer';
import * as actions from '../../src/actions/setting.action';
import { RESET_ALL } from '../../src/actions/graph.action';

describe('settingReducer reducer', () => {
  it('should return the initial state', () => {
    expect(settingReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SETTING_SET', () => {
    expect(
      settingReducer(initialState, {
        type: actions.SETTING_SET,
        key: 'showNodeLabel',
        value: false,
      }),
    ).toMatchObject({
      showNodeLabel: false,
    });
  });

  it('should handle RESET_ALL', () => {
    expect(
      settingReducer(initialState, {
        type: RESET_ALL,
      }),
    ).toMatchObject(initialState);
  });
});
