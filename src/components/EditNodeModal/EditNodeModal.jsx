import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Modal, Form } from 'semantic-ui-react';
// Utilsi
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
    toNodeEntries(node),
  );
  const handleSubmit = React.useCallback(() => {
    const nodeObj = toNodeObj(newNodeEntries);
    onSubmit(nodeObj);
  });
  const handleAddNewProperty = React.useCallback(() => {
    setNewNodeEntries([...newNodeEntries, { key: 'new_property', value: '' }]);
  });
  const handleEditProperty = React.useCallback(idx => e => {
    const { value: newProp } = e.target;
    setNewNodeEntries([
      ...newNodeEntries.slice(0, idx),
      { key: newProp, value: newNodeEntries[idx].value },
      ...newNodeEntries.slice(idx + 1),
    ]);
  });
  const handleEditValue = React.useCallback(idx => e => {
    const { value: newValue } = e.target;
    setNewNodeEntries([
      ...newNodeEntries.slice(0, idx),
      { key: newNodeEntries[idx].key, value: newValue },
      ...newNodeEntries.slice(idx + 1),
    ]);
  });
  const handleDeleteProp = React.useCallback(idx => () => {
    setNewNodeEntries([
      ...newNodeEntries.slice(0, idx),
      ...newNodeEntries.slice(idx + 1),
    ]);
  });
  return (
    <Modal open closeIcon onClose={onCancel}>
      <Header icon="pencil" content="Edit Node Details" />
      <Modal.Content>
        {/* Form Node */}
        {/* 1. Display and editable all node properties */}
        {/* 2. Ability to add new property */}
        <Form>
          {newNodeEntries.map(({ key, value }, idx) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Form.Group widths="equal" key={idx}>
                <Form.Input
                  width={6}
                  fluid
                  placeholder={`Property ${idx}`}
                  value={key}
                  onChange={handleEditProperty(idx)}
                />
                <Form.Input
                  width={6}
                  fluid
                  placeholder={`Value Property ${idx}`}
                  value={value}
                  onChange={handleEditValue(idx)}
                />
                <Form.Button
                  width={2}
                  icon="delete"
                  onClick={handleDeleteProp(idx)}
                />
              </Form.Group>
            );
          })}
        </Form>
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
