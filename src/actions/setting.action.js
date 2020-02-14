export const SETTING_SET = 'SETTING_SET';

export const toogleNodeLabel = prev => ({
  type: SETTING_SET,
  key: 'showNodeLabel',
  value: !prev,
});

export const toogleLinkLabel = prev => ({
  type: SETTING_SET,
  key: 'showLinkLabel',
  value: !prev,
});

export const toogleNodeText = prev => ({
  type: SETTING_SET,
  key: 'showNodeText',
  value: !prev,
});

export const toogleAutoHideNodeText = prev => ({
  type: SETTING_SET,
  key: 'autoHideNodeText',
  value: !prev,
});

export const changeGraphOrientation = orientation => ({
  type: SETTING_SET,
  key: 'orientation',
  value: orientation,
});

export const changeNodeTextKey = nodeTextKey => ({
  type: SETTING_SET,
  key: 'nodeTextKey',
  value: nodeTextKey,
});
