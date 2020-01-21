export const UI_SET = 'UI_SET';

const set = (key, value) => ({ type: UI_SET, key, value });

export const showLoading = () => set('loading', true);
export const hideLoading = () => set('loading', false);