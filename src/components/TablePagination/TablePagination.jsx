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

function TablePagination({
  getData,
  dataKey,
  dataLength,
  searchBar,
  tableProps,
  onRowHover,
}) {
  const [activePage, setActivePage] = React.useState(1);
  const [dataPerPage, setDataPerPage] = React.useState(10);
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
  const handleHover = React.useCallback(
    data => event => onRowHover != null && onRowHover(event, data),
    [onRowHover],
  );
  return (
    <div className={styles.tablePagination__container}>
      <div className={styles.table__dataPerPage}>
        {searchBar && (
          <span style={{ margin: '0px 8px 0px 0px' }}>{searchBar}</span>
        )}
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
        <Table selectable={onRowHover != null} {...tableProps}>
          <Table.Header>
            <Table.Row>
              {dataKey.map(key => (
                <Table.HeaderCell key={key}>{key}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {getData(firstItemIndex, lastItemIndex).map(obj => {
              return (
                <Table.Row
                  onMouseEnter={handleHover(obj)}
                  onMouseLeave={handleHover(null)}
                  key={obj.id}
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
};

export default TablePagination;
