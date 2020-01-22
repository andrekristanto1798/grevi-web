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

function TablePagination({ data, dataKey }) {
  const [activePage, setActivePage] = React.useState(1);
  const [dataPerPage, setDataPerPage] = React.useState(10);
  const handleChangeDataPerPage = React.useCallback(
    (_, { value }) => setDataPerPage(value),
    [],
  );
  const currentPageData = React.useMemo(
    () => {
      const firstItemIndex = (activePage - 1) * dataPerPage;
      const lastItemIndex = activePage * dataPerPage;
      return data.slice(firstItemIndex, lastItemIndex);
    },
    [activePage, dataPerPage, data],
  );
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
          {currentPageData.map(obj => {
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
        Total Rows: {data.length} || Rows per page:{' '}
        <Dropdown
          inline
          value={dataPerPage}
          options={dataPerPageOptions}
          onChange={handleChangeDataPerPage}
        />
      </div>
      <Pagination
        activePage={activePage}
        totalPages={Math.ceil(data.length / dataPerPage)}
        onChange={setActivePage}
      />
    </div>
  );
}

TablePagination.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  dataKey: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TablePagination;
