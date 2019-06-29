import { createSelector } from 'reselect';

const selectCounter = state => state.test.get('counter');

export const selectCounterJS = createSelector(
  selectCounter,
  counter => counter,
);
