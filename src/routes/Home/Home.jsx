import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Actions
import * as actions from '../../actions/test.action';
// Components
import Counter from '../../components/Counter';
// Selectors
import { selectCounterJS } from '../../selectors/test.selector';
// Utils
import { valueType } from '../../components/UtilPropTypes';

class Home extends PureComponent {
  static propTypes = {
    // State
    counter: valueType.isRequired,
    // Actions
    addCounter: PropTypes.func.isRequired,
    minusCounter: PropTypes.func.isRequired,
  };

  render() {
    const { counter, addCounter, minusCounter } = this.props;
    return (
      <Counter counter={counter} onAdd={addCounter} onMinus={minusCounter} />
    );
  }
}

const mapStateToProps = state => {
  const counter = selectCounterJS(state);
  return { counter };
};

export default connect(
  mapStateToProps,
  actions,
)(Home);
