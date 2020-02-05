import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown, Form, Input } from 'semantic-ui-react';
// Actions
import * as radiusActions from '../../../actions/radius.action';
// Components
// Selectors
import {
  selectSelectedKey,
  selectMinRadius,
  selectMaxRadius,
  selectMinValue,
  selectMaxValue,
  selectError,
} from '../../../selectors/radius.selector';
import { selectNodeKeys } from '../../../selectors/graph.selector';
// Utils
import { toOption } from '../../../utils/objects';
// Styles
import styles from './styles.scss';

const RadiusByProperty = ({
  nodeKeys,
  selectedKey,
  selectKey,
  minValue,
  maxValue,
  minRadius,
  maxRadius,
  error,
}) => {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  if (nodeKeys && nodeKeys.length < 1) return null;
  const handleChangeKey = React.useCallback(
    (_, { value }) => {
      selectKey(value);
    },
    [selectKey],
  );
  const dropdwonOptions = React.useMemo(
    () => [
      { key: 'none', value: null, text: 'none' },
      ...nodeKeys.map(toOption),
      {
        key: radiusActions.RADIUS_SPECIAL.DEGREE,
        value: radiusActions.RADIUS_SPECIAL.DEGREE,
        text: 'Node Degree',
      },
    ],
    [nodeKeys],
  );
  return (
    <div className={styles.radiusByProperty__container}>
      <div className={styles.radiusByProperty__inputContainer}>
        <Dropdown
          placeholder="Select Node Attributes"
          fluid
          selection
          value={selectedKey}
          options={dropdwonOptions}
          onChange={handleChangeKey}
        />
        {selectedKey && (
          <Button
            positive
            size="mini"
            icon="refresh"
            onClick={() => selectKey(selectedKey)}
          />
        )}
      </div>
      {selectedKey && !error && (
        <Form>
          <div className={styles.radiusByProperty__valuesContainer}>
            Min Value: {minValue} --- Max Value: {maxValue}
          </div>
          <Form.Group widths="equal">
            <Form.Field
              inline
              control={Input}
              label="Min Radius"
              placeholder="Min Radius"
              value={minRadius}
            />
            <Form.Field
              inline
              control={Input}
              label="Max Radius"
              placeholder="Max Radius"
              value={maxRadius}
            />
          </Form.Group>
        </Form>
      )}
      {error && <pre>{error}</pre>}
    </div>
  );
};

RadiusByProperty.propTypes = {
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedKey: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  minRadius: PropTypes.number,
  maxRadius: PropTypes.number,
  error: PropTypes.string,
  // Redux actions
  selectKey: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const nodeKeys = selectNodeKeys(state);
  const selectedKey = selectSelectedKey(state);
  const minRadius = selectMinRadius(state);
  const maxRadius = selectMaxRadius(state);
  const minValue = selectMinValue(state);
  const maxValue = selectMaxValue(state);
  const error = selectError(state);
  return {
    nodeKeys,
    selectedKey,
    minRadius,
    maxRadius,
    minValue,
    maxValue,
    error,
  };
};

const actions = {
  selectKey: radiusActions.selectKey,
  setMinRadius: radiusActions.setMinRadius,
  setMaxRadius: radiusActions.setMaxRadius,
};

export default connect(
  mapStateToProps,
  actions,
)(RadiusByProperty);
