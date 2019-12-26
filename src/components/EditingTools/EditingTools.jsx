import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Button } from 'semantic-ui-react';
import {
  SelectPointerButton,
  AddNodeButton,
  AddLinkButton,
} from './EditingTools.parts';

export const SELECT_MODE = 'SELECT_MODE';
export const ADD_NODE_MODE = 'ADD_NODE_MODE';
export const ADD_LINK_MODE = 'ADD_LINK_MODE';

const EditingTools = ({ mode, onModeChange }) => {
  const handleModeChange = React.useCallback(nextMode => () => {
    onModeChange(nextMode);
  });
  return (
    <Button.Group vertical>
      <SelectPointerButton
        active={mode === SELECT_MODE}
        onClick={handleModeChange(SELECT_MODE)}
      />
      <AddNodeButton
        active={mode === ADD_NODE_MODE}
        onClick={handleModeChange(ADD_NODE_MODE)}
      />
      <AddLinkButton
        active={mode === ADD_LINK_MODE}
        onClick={handleModeChange(ADD_LINK_MODE)}
      />
    </Button.Group>
  );
};

EditingTools.propTypes = {
  mode: PropTypes.oneOf([SELECT_MODE, ADD_NODE_MODE, ADD_LINK_MODE]),
  onModeChange: PropTypes.func,
};

export default EditingTools;
