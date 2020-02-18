import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Button, Input } from 'semantic-ui-react';
import TablePagination, { smallTableOption } from '../TablePagination';
// Util
import { nodeShape, linkShape } from '../UtilPropTypes';
// Styles
import styles from './styles.scss';

const noOp = null;

const tableProps = { ...smallTableOption, striped: true };

function TableSection({
  dataKeys,
  dataMappingFunction,
  hover,
  remove,
  edit,
  focusOn,
  // setting props
  focusOnDoubleClick,
  highlightOnRowHover,
  // search props
  searchValue,
  validData,
  searchAsFilter,
  handleChangeSearchValue,
  toogleSearchAsFilter,
}) {
  if (dataKeys.length === 0) {
    return <i>No data available</i>;
  }
  const dataKey = React.useMemo(() => [...dataKeys, 'Actions'], [dataKeys]);
  const _handleChangeSearchValue = React.useCallback(
    (_, { value }) => {
      handleChangeSearchValue(value);
    },
    [handleChangeSearchValue],
  );
  const handleGetData = React.useCallback(
    (firstIndex, lastIndex) =>
      validData
        .slice(firstIndex, lastIndex)
        .map(dataMappingFunction(focusOn, edit, remove)),
    [validData, focusOn],
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
    <div className={styles.tableSection__container}>
      <TablePagination
        searchBar={(
          <div className={styles.tableSection__searchContainer}>
            <Input
              size="small"
              icon="search"
              placeholder="Search..."
              value={searchValue}
              onChange={_handleChangeSearchValue}
            />
            <Button
              className={styles.tableSection__searchButton}
              content={searchAsFilterButtonContent}
              color={searchAsFilterButtonColor}
              onClick={handleClickApplySearch}
            />
          </div>
        )}
        getData={handleGetData}
        dataLength={validData.length}
        dataKey={dataKey}
        tableProps={tableProps}
        onRowHover={highlightOnRowHover ? hover : noOp}
        onRowDoubleClick={focusOnDoubleClick ? focusOn : noOp}
      />
    </div>
  );
}

TableSection.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchValue: PropTypes.string,
  validData: PropTypes.arrayOf(PropTypes.oneOfType([nodeShape, linkShape]))
    .isRequired,
  searchAsFilter: PropTypes.bool.isRequired,
  focusOnDoubleClick: PropTypes.bool.isRequired,
  highlightOnRowHover: PropTypes.bool.isRequired,
  dataMappingFunction: PropTypes.func.isRequired,
  // Actions
  hover: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  focusOn: PropTypes.func.isRequired,
  handleChangeSearchValue: PropTypes.func.isRequired,
  toogleSearchAsFilter: PropTypes.func.isRequired,
};

export default TableSection;
