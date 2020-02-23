import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react';
// Actions
import * as algoActions from '../../../../actions/algo.action';
// Selectors
import {
  makeSelectAlgoError,
  selectAlgo,
} from '../../../../selectors/algo.selector';
import { selectLinkKeys } from '../../../../selectors/graph.selector';
// Utils
import { getLinkKeyOptions } from '../algo.utils';
// Styles
import styles from './styles.scss';

const MST = ({ algo, linkKeys, applyMst, cancelMst, error }) => {
  if (linkKeys.length === 0) {
    return <i>No links available</i>;
  }
  const validLinkKeys = React.useMemo(
    () => linkKeys.filter(key => key !== 'source' && key !== 'target'),
    [linkKeys],
  ); // to filter out source and target key
  const [selectedKey, selectKey] = React.useState(null);
  const handleChangeKey = React.useCallback((_, { value }) => {
    selectKey(value);
  }, []);
  const dropdwonOptions = React.useMemo(
    () => getLinkKeyOptions(validLinkKeys),
    [validLinkKeys],
  );
  return (
    <div className={styles.mst__container}>
      <div className={styles.mst__inputContainer}>
        <Dropdown
          placeholder="Select Edge Attributes"
          fluid
          selection
          value={selectedKey}
          options={dropdwonOptions}
          onChange={handleChangeKey}
        />
        <Button
          positive
          content="Apply"
          // disabled when inputs are invalid
          // or selected key of link prop is null
          disabled={selectedKey == null}
          onClick={() => applyMst(selectedKey)}
        />
        <Button
          disabled={algo !== algoActions.ALGO_TYPE.MST}
          negative
          content="Cancel"
          onClick={() => cancelMst()}
        />
      </div>
      {error && <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>}
    </div>
  );
};

MST.propTypes = {
  algo: PropTypes.string,
  linkKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
  // Redux actions
  applyMst: PropTypes.func.isRequired,
  cancelMst: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const selectAlgoError = makeSelectAlgoError();
  const mapStateToProps = state => {
    const algo = selectAlgo(state);
    const linkKeys = selectLinkKeys(state);
    const error = selectAlgoError(state, algoActions.ALGO_TYPE.MST);
    return {
      algo,
      linkKeys,
      error,
    };
  };
  return mapStateToProps;
};

const actions = {
  applyMst: algoActions.applyMst,
  cancelMst: algoActions.cancelAlgo,
};

export default connect(
  makeMapStateToProps,
  actions,
)(MST);
