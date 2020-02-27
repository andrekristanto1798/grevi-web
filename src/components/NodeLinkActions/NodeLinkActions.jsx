import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { nodeShape, linkShape } from '../UtilPropTypes';

function NodeLinkActions({ data, focusOn, edit, remove }) {
  return (
    <>
      <Button
        title="Focus"
        color="facebook"
        icon="eye"
        size="mini"
        onClick={() => focusOn(data)}
      />
      <Button
        title="Edit"
        color="green"
        icon="pencil"
        size="mini"
        onClick={() => edit(data)}
      />
      <Button
        title="Delete"
        color="red"
        icon="delete"
        size="mini"
        onClick={() => remove(data)}
      />
    </>
  );
}

NodeLinkActions.propTypes = {
  data: PropTypes.oneOfType([nodeShape, linkShape]).isRequired,
  focusOn: PropTypes.func,
  edit: PropTypes.func,
  remove: PropTypes.func,
};

export default NodeLinkActions;
