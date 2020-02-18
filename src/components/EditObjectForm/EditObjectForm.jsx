import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

function EditObjectForm({ entries, setEntries }) {
  const handleEditProperty = React.useCallback(idx => e => {
    const { value: newProp } = e.target;
    setEntries([
      ...entries.slice(0, idx),
      { key: newProp, value: entries[idx].value },
      ...entries.slice(idx + 1),
    ]);
  });
  const handleEditValue = React.useCallback(idx => e => {
    const { value: newValue } = e.target;
    setEntries([
      ...entries.slice(0, idx),
      { key: entries[idx].key, value: newValue },
      ...entries.slice(idx + 1),
    ]);
  });
  const handleDeleteProp = React.useCallback(idx => () => {
    setEntries([...entries.slice(0, idx), ...entries.slice(idx + 1)]);
  });
  return (
    <Form>
      {entries.map(({ key, value }, idx) => {
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
  );
}

const entryShape = PropTypes.arrayOf(PropTypes.string);

EditObjectForm.propTypes = {
  entries: PropTypes.arrayOf(entryShape).isRequired,
  setEntries: PropTypes.func.isRequired,
};

export default EditObjectForm;
