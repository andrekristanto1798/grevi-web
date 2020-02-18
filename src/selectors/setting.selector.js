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

export const selectGraphOrientation = createSelector(
  state => state.setting.orientation,
  orientation => orientation,
);

export const selectNodeTextKey = createSelector(
  state => state.setting.nodeTextKey,
  nodeTextKey => nodeTextKey,
);

export const selectFocusOnDoubleClick = createSelector(
  state => state.setting.focusOnDoubleClick,
  focusOnDoubleClick => focusOnDoubleClick,
);

export const selectHighlightOnRowHover = createSelector(
  state => state.setting.highlightOnRowHover,
  highlightOnRowHover => highlightOnRowHover,
);
