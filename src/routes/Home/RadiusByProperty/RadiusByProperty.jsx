import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown, Form, Input, Divider } from 'semantic-ui-react';
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
  selectDefaultRadius,
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
  defaultRadius,
  error,
  setRadius,
  changeDefaultRadius,
}) => {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  const handleChangeKey = React.useCallback(
    (_, { value }) => {
      selectKey(value);
    },
    [selectKey],
  );
  const [currMinRadius, setCurrMinRadius] = React.useState(minRadius);
  const [currMaxRadius, setCurrMaxRadius] = React.useState(maxRadius);
  const handleApplyRadius = React.useCallback(() => {
    const nextMinRadius = Number.parseInt(currMinRadius, 10) || minRadius;
    const nextMaxRadius = Number.parseInt(currMaxRadius, 10) || maxRadius;
    setCurrMinRadius(nextMinRadius);
    setCurrMaxRadius(nextMaxRadius);
    setRadius(nextMinRadius, nextMaxRadius);
  });
  const isDisabled = !(
    minRadius !== currMinRadius || maxRadius !== currMaxRadius
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
      {
        key: radiusActions.RADIUS_SPECIAL.BETWEENNESS,
        value: radiusActions.RADIUS_SPECIAL.BETWEENNESS,
        text: 'Node Betweenness',
      },
      {
        key: radiusActions.RADIUS_SPECIAL.CLOSENESS,
        value: radiusActions.RADIUS_SPECIAL.CLOSENESS,
        text: 'Node Closeness',
      },
    ],
    [nodeKeys],
  );
  const defaultRadiusOptions = React.useMemo(() => [toOption(defaultRadius)], [
    defaultRadius,
  ]);
  const handleChangeDefaultRadius = React.useCallback(
    (_, { value }) => {
      const newValue = Number(value);
      const validNewValue = Number.isNaN(newValue) ? defaultRadius : newValue;
      changeDefaultRadius(validNewValue);
    },
    [defaultRadius, changeDefaultRadius],
  );
  return (
    <div className={styles.radiusByProperty__container}>
      <div className={styles.radiusByProperty__inputContainer}>
        Default Radius:&nbsp;
        <span>
          <Dropdown
            search
            selection
            compact
            allowAdditions
            additionLabel="Change to "
            value={defaultRadius}
            options={defaultRadiusOptions}
            onChange={handleChangeDefaultRadius}
          />
        </span>
      </div>
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
            title="Refresh"
            size="mini"
            icon="refresh"
            onClick={() => selectKey(selectedKey)}
          />
        )}
      </div>
      {selectedKey && !error && (
        <>
          <Divider />
          <Form>
            <Form.Group inline>
              <Form.Field
                inline
                control={Input}
                label={`Min Radius (Min Value: ${minValue})`}
                placeholder="Min Radius"
                value={currMinRadius}
                onChange={e => setCurrMinRadius(e.target.value)}
              />
              <Form.Field
                inline
                control={Input}
                label={`Max Radius (Max Value: ${maxValue})`}
                placeholder="Max Radius"
                value={currMaxRadius}
                onChange={e => setCurrMaxRadius(e.target.value)}
              />
              <Form.Button
                disabled={isDisabled}
                content="Apply"
                color="green"
                onClick={handleApplyRadius}
                basic
              />
            </Form.Group>
          </Form>
        </>
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
  defaultRadius: PropTypes.number.isRequired,
  error: PropTypes.string,
  // Redux actions
  selectKey: PropTypes.func.isRequired,
  setRadius: PropTypes.func.isRequired,
  changeDefaultRadius: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const nodeKeys = selectNodeKeys(state);
  const selectedKey = selectSelectedKey(state);
  const minRadius = selectMinRadius(state);
  const maxRadius = selectMaxRadius(state);
  const minValue = selectMinValue(state);
  const maxValue = selectMaxValue(state);
  const defaultRadius = selectDefaultRadius(state);
  const error = selectError(state);
  return {
    nodeKeys,
    selectedKey,
    minRadius,
    maxRadius,
    minValue,
    maxValue,
    defaultRadius,
    error,
  };
};

const actions = {
  selectKey: radiusActions.selectKey,
  setRadius: radiusActions.setRadius,
  changeDefaultRadius: radiusActions.changeDefaultRadius,
};

export default connect(
  mapStateToProps,
  actions,
)(RadiusByProperty);
