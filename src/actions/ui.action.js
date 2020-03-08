export const UI_SET = 'UI_SET';

const set = (key, value) => ({ type: UI_SET, key, value });

export const showLoading = () => set('loading', true);
export const hideLoading = () => dispatch => {
  setTimeout(() => dispatch(set('loading', false)), 500);
};

export const setTabIndex = tabIndex => set('tabIndex', tabIndex);
