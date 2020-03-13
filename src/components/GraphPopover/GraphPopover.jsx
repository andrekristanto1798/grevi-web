import React from 'react';
import PropTypes from 'prop-types';
import {
  Popover,
  ConnectedNodeContent,
  ConnectedLinkContent,
} from './GraphPopover.parts';
import { popupDataShape } from '../UtilPropTypes';

function GraphPopover({ popupData: { data, type, position }, onClose }) {
  if (type == null) return null;
  let content = '';
  if (type === 'node') {
    // Popup position for node
    content = <ConnectedNodeContent node={data} onClose={onClose} />;
  }
  if (type === 'link') {
    // Change popup position based on the currentMouse
    content = <ConnectedLinkContent link={data} onClose={onClose} />;
  }
  return (
    <Popover
      x={position.x}
      y={position.y}
      content={content}
      onClose={onClose}
    />
  );
}

GraphPopover.propTypes = {
  popupData: popupDataShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GraphPopover;
