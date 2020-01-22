import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as Pg, Icon } from 'semantic-ui-react';
// Styles
import styles from './styles.scss';

function Pagination({ activePage, totalPages, onChange }) {
  return (
    <Pg
      className={styles.pagination}
      size="mini"
      ellipsisItem={{
        content: <Icon name="ellipsis horizontal" />,
        icon: true,
      }}
      firstItem={{
        content: <Icon name="angle double left" />,
        icon: true,
      }}
      lastItem={{
        content: <Icon name="angle double right" />,
        icon: true,
      }}
      prevItem={{
        content: <Icon name="angle left" />,
        icon: true,
      }}
      nextItem={{
        content: <Icon name="angle right" />,
        icon: true,
      }}
      activePage={activePage}
      totalPages={totalPages}
      onPageChange={(_, { activePage: newPage }) => onChange(newPage)}
    />
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;
