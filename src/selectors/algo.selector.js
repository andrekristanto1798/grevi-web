import { createSelector } from 'reselect';

export const selectAlgo = createSelector(
  state => state.algo.algo,
  algo => algo,
);

export const selectAlgoGraph = createSelector(
  state => state.algo.graph,
  graph => graph,
);

export const selectError = createSelector(
  state => state.algo.error,
  error => error,
);

export const makeSelectAlgoError = () =>
  createSelector(
    selectError,
    selectAlgo,
    (_, algoType) => algoType,
    (error, algo, algoType) => {
      if (algo === algoType) return error;
      return '';
    },
  );
