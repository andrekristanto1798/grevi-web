import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import * as graphActions from '../../../actions/graph.action';
import * as coloringActions from '../../../actions/coloring.action';
// Components
import TablePagination, {
  smallTableOption,
} from '../../../components/TablePagination';
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

const tableProps = { ...smallTableOption, striped: true };

function ColorTable({
  propertyValues,
  colorMap,
  valuesNodeMap,
  selectedKey,
  selectColor,
  hoverNodes,
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
          <LinkButton onClick={() => hoverNodes(valuesNodeMap[value])}>
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
      tableProps={tableProps}
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
  hoverNodes: PropTypes.func.isRequired,
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
  hoverNodes: graphActions.hoverNodes,
};

export default connect(
  mapStateToProps,
  actions,
)(ColorTable);
