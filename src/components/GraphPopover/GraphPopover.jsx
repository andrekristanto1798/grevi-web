import React from 'react';
import PropTypes from 'prop-types';
import { useMouseState } from 'beautiful-react-hooks';
import {
  Popover,
  ConnectedNodeContent,
  ConnectedLinkContent,
} from './GraphPopover.parts';
import { popupDataShape, positionShape } from '../UtilPropTypes';

function GraphPopover({ popupData: { data, type }, position, onClose }) {
  const { clientX, clientY } = useMouseState();
  const mousePos = React.useRef({ x: 0, y: 0 });
  const prevDataRef = React.useRef();
  React.useEffect(
    () => {
      if (prevDataRef !== data) {
        prevDataRef.current = data;
        mousePos.current = { x: clientX + 10, y: clientY + 10 };
      }
    },
    [data],
  );
  if (type == null) return null;
  let popupPosition;
  let content = '';
  if (type === 'node') {
    // Popup position for node
    content = <ConnectedNodeContent node={data} onClose={onClose} />;
    popupPosition = position;
  }
  if (type === 'link') {
    // Change popup position based on the currentMouse
    content = <ConnectedLinkContent link={data} onClose={onClose} />;
    popupPosition = mousePos.current;
  }
  return (
    <Popover
      x={popupPosition.x}
      y={popupPosition.y}
      content={content}
      onClose={onClose}
    />
  );
}

GraphPopover.propTypes = {
  popupData: popupDataShape.isRequired,
  position: positionShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GraphPopover;
