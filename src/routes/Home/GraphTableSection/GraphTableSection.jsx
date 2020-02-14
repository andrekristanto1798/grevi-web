import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
import TablePagination, {
  smallTableOption,
} from '../../../components/TablePagination';
// Selectors
import {
  selectNodeKeys,
  selectSearchValue,
  selectValidData,
  selectSearchAsFilter,
} from '../../../selectors/graph.selector';
import {
  selectFocusNodeOnDoubleClick,
  selectHighlightNodeOnRowHover,
} from '../../../selectors/setting.selector';
// Utils
import { graphDataShape } from '../../../components/UtilPropTypes';
// Styles
import styles from './styles.scss';

const noOp = null;

const tableProps = { ...smallTableOption, striped: true };

const toGraphTableData = (focusNodeOn, editNode, deleteNode) => node => ({
  ...node,
  Actions: (
    <>
      <Button
        title="Focus Node"
        color="facebook"
        icon="eye"
        size="mini"
        onClick={() => focusNodeOn(node)}
      />
      <Button
        title="Edit Node"
        color="green"
        icon="pencil"
        size="mini"
        onClick={() => editNode(node)}
      />
      <Button
        title="Delete Node"
        color="red"
        icon="delete"
        size="mini"
        onClick={() => deleteNode(node)}
      />
    </>
  ),
});

function GraphTableSection({
  nodeKeys,
  hoverNode,
  deleteNode,
  editNode,
  focusNodeOn,
  // setting props
  focusNodeOnDoubleClick,
  highlightNodeOnRowHover,
  // search props
  searchValue,
  validData,
  searchAsFilter,
  handleChangeSearchValue,
  toogleSearchAsFilter,
}) {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  const dataKey = React.useMemo(() => [...nodeKeys, 'Actions'], [nodeKeys]);
  const _handleChangeSearchValue = React.useCallback(
    (_, { value }) => {
      handleChangeSearchValue(value);
    },
    [handleChangeSearchValue],
  );
  const handleGetData = React.useCallback(
    (firstIndex, lastIndex) =>
      validData.nodes
        .slice(firstIndex, lastIndex)
        .map(toGraphTableData(focusNodeOn, editNode, deleteNode)),
    [validData, focusNodeOn],
  );
  const searchAsFilterButtonContent = searchAsFilter
    ? 'Cancel Filter'
    : 'Apply search as filter';
  const searchAsFilterButtonColor = searchAsFilter ? 'red' : 'green';
  const handleClickApplySearch = React.useCallback(
    () => {
      toogleSearchAsFilter(searchAsFilter);
    },
    [searchAsFilter],
  );
  return (
    <div className={styles.graphTable__container}>
      <TablePagination
        searchBar={(
          <div className={styles.graphTable__searchContainer}>
            <Input
              size="small"
              icon="search"
              placeholder="Search..."
              value={searchValue}
              onChange={_handleChangeSearchValue}
            />
            <Button
              className={styles.graphTable__searchButton}
              content={searchAsFilterButtonContent}
              color={searchAsFilterButtonColor}
              onClick={handleClickApplySearch}
            />
          </div>
        )}
        getData={handleGetData}
        dataLength={validData.nodes.length}
        dataKey={dataKey}
        tableProps={tableProps}
        onRowHover={highlightNodeOnRowHover ? hoverNode : noOp}
        onRowDoubleClick={focusNodeOnDoubleClick ? focusNodeOn : noOp}
      />
    </div>
  );
}

GraphTableSection.propTypes = {
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchValue: PropTypes.string,
  validData: graphDataShape.isRequired,
  searchAsFilter: PropTypes.bool.isRequired,
  focusNodeOnDoubleClick: PropTypes.bool.isRequired,
  highlightNodeOnRowHover: PropTypes.bool.isRequired,
  // Actions
  hoverNode: PropTypes.func.isRequired,
  deleteNode: PropTypes.func.isRequired,
  editNode: PropTypes.func.isRequired,
  focusNodeOn: PropTypes.func.isRequired,
  handleChangeSearchValue: PropTypes.func.isRequired,
  toogleSearchAsFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const nodeKeys = selectNodeKeys(state);
  const searchValue = selectSearchValue(state);
  const validData = selectValidData(state);
  const searchAsFilter = selectSearchAsFilter(state);
  const focusNodeOnDoubleClick = selectFocusNodeOnDoubleClick(state);
  const highlightNodeOnRowHover = selectHighlightNodeOnRowHover(state);
  return {
    nodeKeys,
    searchValue,
    validData,
    searchAsFilter,
    focusNodeOnDoubleClick,
    highlightNodeOnRowHover,
  };
};

const actions = {
  hoverNode: graphAction.hoverNode,
  deleteNode: graphAction.deleteNode,
  editNode: graphAction.editNode,
  focusNodeOn: graphAction.focusNodeOn,
  handleChangeSearchValue: graphAction.handleChangeSearchValue,
  toogleSearchAsFilter: graphAction.toogleSearchAsFilter,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphTableSection);
