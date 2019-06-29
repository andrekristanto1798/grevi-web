import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// Utils
import { valueType } from '../UtilPropTypes';
// Styles
import styles from './styles.scss';

export default class Counter extends PureComponent {
  static propTypes = {
    counter: valueType,
    onAdd: PropTypes.func.isRequired,
    onMinus: PropTypes.func.isRequired,
  };

  render() {
    const { counter, onAdd, onMinus } = this.props;
    return (
      <div className={styles.counter__container}>
        <span className={styles.counter__display}>Counter: {counter}</span>
        <div>
          <button type="button" onClick={onAdd}>
            +
          </button>
          <button type="button" onClick={onMinus}>
            -
          </button>
        </div>
      </div>
    );
  }
}
