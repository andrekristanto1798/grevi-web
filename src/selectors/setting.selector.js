import { createSelector } from 'reselect';

export const selectShowNodeLabel = createSelector(
  state => state.setting.showNodeLabel,
  showNodeLabel => showNodeLabel,
);

export const selectShowLinkLabel = createSelector(
  state => state.setting.showLinkLabel,
  showLinkLabel => showLinkLabel,
);

export const selectShowNodeText = createSelector(
  state => state.setting.showNodeText,
  showNodeText => showNodeText,
);

export const selectAutoHideNodeText = createSelector(
  state => state.setting.autoHideNodeText,
  autoHideNodeText => autoHideNodeText,
);
