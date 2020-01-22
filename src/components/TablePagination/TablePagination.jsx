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

function TablePagination({ getData, dataKey, dataLength }) {
  const [activePage, setActivePage] = React.useState(1);
  const [dataPerPage, setDataPerPage] = React.useState(10);
  const handleChangeDataPerPage = React.useCallback(
    (_, { value }) => setDataPerPage(value),
    [],
  );
  const firstItemIndex = (activePage - 1) * dataPerPage;
  const lastItemIndex = activePage * dataPerPage;
  return (
    <div className={styles.table__container}>
      <Table size="small" compact="very" striped>
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
              <Table.Row key={obj.id}>
                {dataKey.map(key => (
                  <Table.Cell key={key}>{obj[key]}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className={styles.table__dataPerPage}>
        Total Rows: {dataLength} || Rows per page:{' '}
        <Dropdown
          inline
          value={dataPerPage}
          options={dataPerPageOptions}
          onChange={handleChangeDataPerPage}
        />
      </div>
      <Pagination
        activePage={activePage}
        totalPages={Math.ceil(dataLength / dataPerPage)}
        onChange={setActivePage}
      />
    </div>
  );
}

TablePagination.propTypes = {
  getData: PropTypes.func.isRequired,
  dataKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default TablePagination;
