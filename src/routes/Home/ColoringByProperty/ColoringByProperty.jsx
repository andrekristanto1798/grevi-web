import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react';
// Actions
import * as coloringActions from '../../../actions/coloring.action';
// Selectors
import {
  selectSelectedKey,
  selectPropertyValues,
  selectColorMap,
} from '../../../selectors/coloring.selector';
import { selectNodeKeys } from '../../../selectors/graph.selector';
// Utils
import { toOption } from '../../../utils/objects';
import { valueType } from '../../../components/UtilPropTypes';
// Styles
import styles from './styles.scss';

const ColoringByProperty = ({
  nodeKeys,
  selectedKey,
  propertyValues,
  colorMap,
  selectKey,
  selectColor,
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
  const handleChangeColor = React.useCallback(
    propValue => e => selectColor(propValue, e.target.value),
    [selectColor],
  );
  return (
    <div className={styles.coloringByProperty__container}>
      <div className={styles.coloringByProperty__inputContainer}>
        <Dropdown
          placeholder="Select Node Attributes"
          fluid
          selection
          value={selectedKey}
          options={nodeKeys.map(toOption)}
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
      <div className={styles.coloringByProperty__colorsContainer}>
        {selectedKey &&
          propertyValues.map(value => (
            <div key={value}>
              {value} :{' '}
              <input
                type="color"
                value={colorMap[value]}
                onChange={handleChangeColor(value)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

ColoringByProperty.propTypes = {
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedKey: PropTypes.string,
  propertyValues: PropTypes.arrayOf(valueType),
  colorMap: PropTypes.objectOf(PropTypes.string),
  // Redux actions
  selectKey: PropTypes.func.isRequired,
  selectColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const nodeKeys = selectNodeKeys(state);
  const selectedKey = selectSelectedKey(state);
  const propertyValues = selectPropertyValues(state);
  const colorMap = selectColorMap(state);
  return {
    nodeKeys,
    selectedKey,
    propertyValues,
    colorMap,
  };
};

const actions = {
  selectKey: coloringActions.selectKey,
  selectColor: coloringActions.selectColor,
};

export default connect(
  mapStateToProps,
  actions,
)(ColoringByProperty);