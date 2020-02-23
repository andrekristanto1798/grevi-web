import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input } from 'semantic-ui-react';
// Actions
import * as algoActions from '../../../../actions/algo.action';
// Selectors
import {
  makeSelectAlgoError,
  selectAlgo,
} from '../../../../selectors/algo.selector';
// Styles
import styles from './styles.scss';

const ExtractSubgraph = ({
  algo,
  error,
  applyExtractSubgraph,
  cancelExtractSubgraph,
}) => {
  const [nodeId, setNodeId] = React.useState('');
  const [numberOfHops, setNumberOfHops] = React.useState('');
  const handleInputChange = React.useCallback(
    setter => event => setter(event.target.value),
    [],
  );
  const isInputsValid = React.useMemo(() => {
    if (nodeId && !Number.isNaN(Number(numberOfHops))) return true;
    return false;
  });
  return (
    <div className={styles.extractSubgraph__container}>
      <Form>
        <Form.Group inline style={{ alignItems: 'flex-end' }}>
          <Form.Field
            inline
            control={Input}
            label="Node Id"
            placeholder="Node Id"
            value={nodeId}
            onChange={handleInputChange(setNodeId)}
          />
          <Form.Field
            inline
            control={Input}
            label="Hops"
            placeholder="Hops (ex. 1,2,3)"
            value={numberOfHops}
            onChange={handleInputChange(setNumberOfHops)}
          />
          <Form.Button
            type="submit"
            positive
            content="Extract"
            disabled={!isInputsValid}
            onClick={() => applyExtractSubgraph(nodeId, Number(numberOfHops))}
          />
          <Form.Button
            type="reset"
            disabled={algo !== algoActions.ALGO_TYPE.EXTRACT_SUBGRAPH}
            negative
            content="Cancel"
            onClick={cancelExtractSubgraph}
          />
        </Form.Group>
      </Form>
      {error && <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>}
    </div>
  );
};

ExtractSubgraph.propTypes = {
  algo: PropTypes.string,
  error: PropTypes.string,
  // Redux Actions
  applyExtractSubgraph: PropTypes.func.isRequired,
  cancelExtractSubgraph: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const selectAlgoError = makeSelectAlgoError();
  const mapStateToProps = state => {
    const algo = selectAlgo(state);
    const error = selectAlgoError(
      state,
      algoActions.ALGO_TYPE.EXTRACT_SUBGRAPH,
    );
    return {
      algo,
      error,
    };
  };
  return mapStateToProps;
};

const actions = {
  applyExtractSubgraph: algoActions.applyExtractSubgraph,
  cancelExtractSubgraph: algoActions.cancelAlgo,
};

export default connect(
  makeMapStateToProps,
  actions,
)(ExtractSubgraph);
