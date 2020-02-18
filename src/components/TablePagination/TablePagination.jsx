import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Table, Dropdown } from 'semantic-ui-react';
import Pagination from './Pagination';
// Utils
import { toOption } from '../../utils/objects';
// Styles
import styles from './styles.scss';

const dataPerPageOptions = [10, 20, 30].map(toOption);

export const smallTableOption = {
  size: 'small',
  compact: 'very',
};

const SORTING_DIRECTION = {
  asc: 'ascending',
  desc: 'descending',
};

const defaultSortState = {
  column: null,
  direction: null,
};

function TablePagination({
  getData,
  dataKey,
  dataLength,
  searchBar,
  tableProps,
  onRowHover,
  onRowDoubleClick,
}) {
  const [activePage, setActivePage] = React.useState(1);
  const [dataPerPage, setDataPerPage] = React.useState(10);
  const [sortState, setSortState] = React.useState(defaultSortState);
  const totalPages = Math.ceil(dataLength / dataPerPage);
  const handleChangeDataPerPage = React.useCallback((_, { value }) => {
    // if the current page exceeds the total pages
    // due to the increase of the number of rows per page
    const newTotalPages = Math.ceil(dataLength / value);
    if (activePage >= newTotalPages) setActivePage(newTotalPages);
    setDataPerPage(value);
  });
  // side effect on data length changed due to filtering
  // should update active page to the last pages
  React.useEffect(() => {
    if (activePage === 0 && totalPages > 0) setActivePage(1);
    if (activePage >= totalPages) setActivePage(totalPages);
  });
  const firstItemIndex = (activePage - 1) * dataPerPage;
  const lastItemIndex = activePage * dataPerPage;
  const handleSort = React.useCallback(column => () => {
    if (!tableProps.sortable) return;
    if (column !== sortState.column) {
      setSortState({ column, direction: SORTING_DIRECTION.asc });
    } else {
      setSortState({
        column,
        direction:
          sortState.direction === SORTING_DIRECTION.asc
            ? SORTING_DIRECTION.desc
            : SORTING_DIRECTION.asc,
      });
    }
  });
  const resetSort = React.useCallback(() => setSortState(defaultSortState));
  const handleRowHover = React.useCallback(
    data => () => onRowHover != null && onRowHover(data),
    [onRowHover],
  );
  const handleRowDoubleClick = React.useCallback(
    data => () => onRowDoubleClick != null && onRowDoubleClick(data),
    [onRowDoubleClick],
  );
  return (
    <div className={styles.tablePagination__container}>
      {searchBar}
      <div className={styles.table__dataPerPage}>
        Total Entries: {dataLength} || Show{' '}
        <Dropdown
          inline
          value={dataPerPage}
          options={dataPerPageOptions}
          onChange={handleChangeDataPerPage}
        />{' '}
        entries per page
      </div>
      <div className={styles.table__container}>
        <Table celled selectable={onRowHover != null} {...tableProps}>
          <Table.Header>
            <Table.Row>
              {dataKey.map(key => (
                <Table.HeaderCell
                  key={key}
                  sorted={
                    tableProps.sortable && sortState.column === key
                      ? sortState.direction
                      : null
                  }
                  onClick={handleSort(key)}
                  onDoubleClick={resetSort}
                >
                  {key}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {getData(firstItemIndex, lastItemIndex, sortState).map(obj => {
              return (
                <Table.Row
                  key={obj.id}
                  onMouseEnter={handleRowHover(obj)}
                  onMouseLeave={handleRowHover(null)}
                  onDoubleClick={handleRowDoubleClick(obj)}
                >
                  {dataKey.map(key => (
                    <Table.Cell
                      className={styles.table__cellContainer}
                      key={key}
                    >
                      {obj[key]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <Pagination
        activePage={activePage}
        totalPages={totalPages}
        onChange={setActivePage}
      />
    </div>
  );
}

TablePagination.propTypes = {
  getData: PropTypes.func.isRequired,
  dataKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataLength: PropTypes.number.isRequired,
  searchBar: PropTypes.node,
  tableProps: PropTypes.objectOf(PropTypes.any),
  onRowHover: PropTypes.func,
  onRowDoubleClick: PropTypes.func,
};

export default TablePagination;
