import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import * as coloringActions from '../../../actions/coloring.action';
// Components
import TablePagination from '../../../components/TablePagination';
import LinkButton from '../../../components/LinkButton';
// Selectors
import {
  selectPropertyValues,
  selectColorMap,
  selectSelectedKey,
  selectValuesNodeMap,
} from '../../../selectors/coloring.selector';
// Utils
import { valueType } from '../../../components/UtilPropTypes';

function ColorTable({
  propertyValues,
  colorMap,
  valuesNodeMap,
  selectedKey,
  selectColor,
}) {
  const propertyKey = React.useMemo(() => `Property (${selectedKey})`, [
    selectedKey,
  ]);
  const dataKey = React.useMemo(() => [propertyKey, 'Color', 'View Nodes'], [
    propertyKey,
  ]);
  const handleGetData = React.useCallback(
    (firstIndex, lastIndex) =>
      propertyValues.slice(firstIndex, lastIndex).map(value => ({
        id: value,
        [propertyKey]: value,
        Color: (
          <input
            type="color"
            value={colorMap[value]}
            onChange={e => selectColor(value, e.target.value)}
          />
        ),
        'View Nodes': (
          <LinkButton>
            Highlight {valuesNodeMap[value].length} corresponding nodes
          </LinkButton>
        ),
      })),
    [propertyValues, selectColor, propertyKey, colorMap],
  );
  return (
    <TablePagination
      getData={handleGetData}
      dataLength={propertyValues.length}
      dataKey={dataKey}
    />
  );
}

ColorTable.propTypes = {
  propertyValues: PropTypes.arrayOf(valueType),
  colorMap: PropTypes.objectOf(PropTypes.string),
  valuesNodeMap: PropTypes.objectOf(PropTypes.array),
  selectedKey: PropTypes.string,
  // Redux actions
  selectColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const selectedKey = selectSelectedKey(state);
  const propertyValues = selectPropertyValues(state);
  const colorMap = selectColorMap(state);
  const valuesNodeMap = selectValuesNodeMap(state);
  return {
    selectedKey,
    propertyValues,
    colorMap,
    valuesNodeMap,
  };
};

const actions = {
  selectColor: coloringActions.selectColor,
};

export default connect(
  mapStateToProps,
  actions,
)(ColorTable);
