import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as settingActions from '../../src/actions/setting.action.js';

const types = {
  SETTING_SET: settingActions.SETTING_SET,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const createSettingSetTestMsg = (actionType, varName, next, prev) =>
  `creates SETTING_SET ${varName} to ${next} when ${actionType} on ${prev}`;

const doTestOnSettingToogle = async (actionType, varName, next, prev) => {
  const expectedActions = [
    {
      type: types.SETTING_SET,
      key: varName,
      value: next,
    },
  ];
  const store = mockStore({ setting: {} });
  await store.dispatch(settingActions[actionType](prev));
  const actions = store.getActions();
  expect(actions).toEqual(expectedActions);
};

const doTestOnSettingChange = async (actionType, varName, value) => {
  const expectedActions = [
    {
      type: types.SETTING_SET,
      key: varName,
      value,
    },
  ];
  const store = mockStore({ setting: {} });
  await store.dispatch(settingActions[actionType](value));
  const actions = store.getActions();
  expect(actions).toEqual(expectedActions);
};

describe('setting action tests', () => {
  // toogle actionType
  [
    ['toogleNodeLabel', 'showNodeLabel'],
    ['toogleLinkLabel', 'showLinkLabel'],
    ['toogleNodeText', 'showNodeText'],
    ['toogleTextOnly', 'showTextOnly'],
    ['toogleLinkDirection', 'showLinkDirection'],
    ['toogleAutoHideNodeText', 'autoHideNodeText'],
    ['toogleHighlightOnRowHover', 'highlightOnRowHover'],
    ['toogleFocusOnDoubleClick', 'focusOnDoubleClick'],
  ].forEach(([actionType, varName]) => {
    it(createSettingSetTestMsg(actionType, varName, true, false), async () => {
      doTestOnSettingToogle(actionType, varName, true, false);
    });
    it(createSettingSetTestMsg(actionType, varName, false, true), async () => {
      doTestOnSettingToogle(actionType, varName, false, true);
    });
  });
  // change actionType
  [
    ['changeGraphOrientation', 'orientation'],
    ['changeNodeTextKey', 'nodeTextKey'],
    ['setForceChargeStrength', 'forceChargeStrength'],
    ['setForceLinkDistance', 'forceLinkDistance'],
  ].forEach(([actionType, varName]) => {
    it(createSettingSetTestMsg(actionType, varName, '50', '50'), async () => {
      doTestOnSettingChange(actionType, varName, 50);
    });
  });
});
