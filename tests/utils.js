import { UI_SET } from '../src/actions/ui.action';

export const delay = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

export const getExpectedActionsWithLoading = actions => [
  {
    type: UI_SET,
    key: 'loading',
    value: true,
  },
  ...actions,
  {
    type: UI_SET,
    key: 'loading',
    value: false,
  },
];
