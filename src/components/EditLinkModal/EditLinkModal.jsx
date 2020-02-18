import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Button, Header, Modal } from 'semantic-ui-react';
import EditObjectForm from '../EditObjectForm';
// Utils
import { cleanFromIgnoredKeys, normalizeObjectId } from '../../utils/objects';
import { linkShape } from '../UtilPropTypes';

const toLinkEntries = link =>
  Object.entries(link).map(([key, value]) => {
    if (key === 'source' || key === 'target')
      return { key, value: normalizeObjectId(link, key) };
    return { key, value };
  });

const toLinkObj = linkEntries =>
  linkEntries.reduce((acc, { key, value }) => {
    return { ...acc, [key]: value };
  }, {});

function EditLinkModal({ link, onCancel, onSubmit }) {
  if (!link) return null;
  const [newLinkEntries, setNewLinkEntries] = React.useState(
    toLinkEntries(cleanFromIgnoredKeys(link)),
  );
  const handleSubmit = React.useCallback(() => {
    const linkObj = toLinkObj(newLinkEntries);
    onSubmit(cleanFromIgnoredKeys(linkObj));
  });
  const handleAddNewProperty = React.useCallback(() => {
    setNewLinkEntries([...newLinkEntries, { key: 'new_property', value: '' }]);
  });
  return (
    <Modal open closeIcon onClose={onCancel}>
      <Header icon="pencil" content="Edit Link Details" />
      <Modal.Content>
        {/* Form Link */}
        {/* 1. Display and editable all link properties */}
        {/* 2. Ability to add new property */}
        <EditObjectForm
          entries={newLinkEntries}
          setEntries={setNewLinkEntries}
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

EditLinkModal.propTypes = {
  link: linkShape,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditLinkModal;
