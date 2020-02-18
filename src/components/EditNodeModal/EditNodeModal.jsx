import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Button, Header, Modal } from 'semantic-ui-react';
import EditObjectForm from '../EditObjectForm';
// Utils
import { cleanFromIgnoredKeys } from '../../utils/objects';
import { nodeShape } from '../UtilPropTypes';

const toNodeEntries = node =>
  Object.entries(node).map(([key, value]) => ({ key, value }));

const toNodeObj = nodeEntries =>
  nodeEntries.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {});

function EditNodeModal({ node, onCancel, onSubmit }) {
  if (!node) return null;
  const [newNodeEntries, setNewNodeEntries] = React.useState(
    toNodeEntries(cleanFromIgnoredKeys(node)),
  );
  const handleSubmit = React.useCallback(() => {
    const nodeObj = toNodeObj(newNodeEntries);
    onSubmit(cleanFromIgnoredKeys(nodeObj));
  });
  const handleAddNewProperty = React.useCallback(() => {
    setNewNodeEntries([...newNodeEntries, { key: 'new_property', value: '' }]);
  });
  return (
    <Modal open closeIcon onClose={onCancel}>
      <Header icon="pencil" content="Edit Node Details" />
      <Modal.Content>
        {/* Form Node */}
        {/* 1. Display and editable all node properties */}
        {/* 2. Ability to add new property */}
        <EditObjectForm
          entries={newNodeEntries}
          setEntries={setNewNodeEntries}
        />
        <Button
          icon="plus circle"
          content="Add new property"
          onClick={handleAddNewProperty}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="blue" onClick={onCancel}>
          Cancel
        </Button>
        <Button primary onClick={handleSubmit}>
          Finish
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

EditNodeModal.propTypes = {
  node: nodeShape,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditNodeModal;
