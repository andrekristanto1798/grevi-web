import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import * as coloringActions from '../../../actions/coloring.action';
// Components
import TablePagination from '../../../components/TablePagination';
// Selectors
import {
  selectPropertyValues,
  selectColorMap,
  selectSelectedKey,
} from '../../../selectors/coloring.selector';
// Utils
import { valueType } from '../../../components/UtilPropTypes';

function ColorTable({ propertyValues, colorMap, selectedKey, selectColor }) {
  const propertyKey = `Property (${selectedKey})`;
  return (
    <TablePagination
      data={propertyValues.map(value => ({
        id: value,
        [propertyKey]: value,
        Color: (
          <input
            type="color"
            value={colorMap[value]}
            onChange={e => selectColor(value, e.target.value)}
          />
        ),
      }))}
      dataKey={[propertyKey, 'Color']}
    />
  );
}

ColorTable.propTypes = {
  propertyValues: PropTypes.arrayOf(valueType),
  colorMap: PropTypes.objectOf(PropTypes.string),
  selectedKey: PropTypes.string,
  // Redux actions
  selectColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const selectedKey = selectSelectedKey(state);
  const propertyValues = selectPropertyValues(state);
  const colorMap = selectColorMap(state);
  return {
    selectedKey,
    propertyValues,
    colorMap,
  };
};

const actions = {
  selectColor: coloringActions.selectColor,
};

export default connect(
  mapStateToProps,
  actions,
)(ColorTable);
