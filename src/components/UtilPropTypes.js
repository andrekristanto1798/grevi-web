import PropTypes from 'prop-types';
import { SELECT_MODE, ADD_NODE_MODE, ADD_LINK_MODE } from './EditingTools';

export const valueType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

export const nodeShape = PropTypes.shape({
  id: valueType.isRequired,
});

export const linkShape = PropTypes.shape({
  source: PropTypes.oneOfType([valueType, nodeShape]).isRequired,
  target: PropTypes.oneOfType([valueType, nodeShape]).isRequired,
});

export const graphDataShape = PropTypes.shape({
  nodes: PropTypes.arrayOf(nodeShape).isRequired,
  links: PropTypes.arrayOf(linkShape).isRequired,
});

export const modeShape = PropTypes.oneOf([
  SELECT_MODE,
  ADD_NODE_MODE,
  ADD_LINK_MODE,
]);

export const positionShape = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const popupDataShape = PropTypes.shape({
  type: PropTypes.string,
  data: PropTypes.oneOfType([nodeShape, linkShape]),
  position: positionShape.isRequired,
});
