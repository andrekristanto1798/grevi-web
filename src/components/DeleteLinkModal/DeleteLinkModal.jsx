import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react';
// Utils
import { linkShape } from '../UtilPropTypes';

function DeleteLinkModal({ link, onCancel, onSubmit }) {
  if (!link) return null;
  return (
    <Modal open closeIcon onClose={onCancel}>
      <Header icon="pencil" content="Delete Link Confirmation" />
      <Modal.Content>
        You want to delete following link with details:
        <pre>{JSON.stringify(link, null, 4)}</pre>
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

DeleteLinkModal.propTypes = {
  link: linkShape,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DeleteLinkModal;
