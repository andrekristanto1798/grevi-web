import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

function LinkButton({ className = '', ...props }) {
  return (
    <button
      type="button"
      className={[styles.buttonLink, className].join(' ')}
      {...props}
    />
  );
}

LinkButton.propTypes = { className: PropTypes.string };

export default LinkButton;
