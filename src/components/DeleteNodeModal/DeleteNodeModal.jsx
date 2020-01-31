import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react';
// Utilsi
import { nodeShape } from '../UtilPropTypes';

function DeleteNodeModal({ node, onCancel, onSubmit }) {
  if (!node) return null;
  return (
    <Modal open closeIcon onClose={onCancel}>
      <Header icon="pencil" content="Delete Node Confirmation" />
      <Modal.Content>
        You want to delete following node with details:
        <pre>{JSON.stringify(node, null, 4)}</pre>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="blue" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="red" onClick={onSubmit}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

DeleteNodeModal.propTypes = {
  node: nodeShape,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DeleteNodeModal;
