import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as uiActions from '../../src/actions/ui.action.js';
import { delay } from '../utils.js';

const types = { UI_SET: uiActions.UI_SET };

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ui action tests', () => {
  it('creates UI_SET loading to true when showLoading', async () => {
    const expectedActions = [
      {
        type: types.UI_SET,
        key: 'loading',
        value: true,
      },
    ];
    const store = mockStore({ ui: {} });
    await store.dispatch(uiActions.showLoading());
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates UI_SET loading to false when hideLoading', async () => {
    const expectedActions = [
      {
        type: types.UI_SET,
        key: 'loading',
        value: false,
      },
    ];
    const store = mockStore({ ui: {} });
    await store.dispatch(uiActions.hideLoading());
    await delay(500);
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('creates UI_SET tabIndex to N when setTabIndex', async () => {
    const expectedActions = [
      {
        type: types.UI_SET,
        key: 'tabIndex',
        value: 3,
      },
    ];
    const store = mockStore({ ui: {} });
    await store.dispatch(uiActions.setTabIndex(3));
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
