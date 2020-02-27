import React from 'react';
import PropTypes from 'prop-types';
import { useMouseState } from 'beautiful-react-hooks';
import {
  Popover,
  ConnectedNodeContent,
  ConnectedLinkContent,
} from './GraphPopover.parts';
import { popupDataShape } from '../UtilPropTypes';

function GraphPopover({ popupData: { data, type }, onClose }) {
  const { clientX, clientY } = useMouseState();
  const position = React.useRef({ x: 0, y: 0 });
  const prevDataRef = React.useRef();
  React.useEffect(
    () => {
      if (prevDataRef !== data) {
        prevDataRef.current = data;
        position.current = { x: clientX, y: clientY };
      }
    },
    [data],
  );
  let content = '';
  if (type === 'node')
    content = <ConnectedNodeContent node={data} onClose={onClose} />;
  if (type === 'link')
    content = <ConnectedLinkContent link={data} onClose={onClose} />;
  return (
    <Popover
      x={position.current.x}
      y={position.current.y}
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
