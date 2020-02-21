import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, Button, Dropdown } from 'semantic-ui-react';
// Actions
import * as shortestPathActions from '../../../actions/shortestPath.action';
// Selectors
import { selectError } from '../../../selectors/shortestPath.selector';
import { selectLinkKeys } from '../../../selectors/graph.selector';
// Utils
import { toOption } from '../../../utils/objects';
// Styles
import styles from './styles.scss';

const ShortestPath = ({
  linkKeys,
  error,
  applyShortestPath,
  cancelShortestPath,
}) => {
  if (linkKeys.length === 0) {
    return <i>No links available</i>;
  }
  const [fromNode, setFromNode] = React.useState('');
  const [toNode, setToNode] = React.useState('');
  const handleInputChange = React.useCallback(
    setter => event => setter(event.target.value),
    [],
  );
  const isInputsValid = React.useMemo(() => {
    if (fromNode !== toNode) return true;
    return false;
  });
  const validLinkKeys = React.useMemo(
    () => linkKeys.filter(key => key !== 'source' && key !== 'target'),
    [linkKeys],
  ); // to filter out source and target key
  const [selectedKey, selectKey] = React.useState(null);
  const handleChangeKey = React.useCallback((_, { value }) => {
    selectKey(value);
  }, []);
  const dropdwonOptions = React.useMemo(
    () => [
      { key: 'none', value: null, text: 'none' },
      ...validLinkKeys.map(toOption),
      {
        key: 'uniform-weight',
        value: shortestPathActions.SHORTEST_PATH_UNIFORM_WEIGHT,
        text: 'Uniform Weight',
      },
    ],
    [validLinkKeys],
  );
  return (
    <div className={styles.shortestPath__container}>
      <Form>
        <Form.Group inline>
          <Form.Field
            inline
            control={Input}
            label="From Node Id"
            placeholder="From Node Id"
            value={fromNode}
            onChange={handleInputChange(setFromNode)}
          />
          <Form.Field
            inline
            control={Input}
            label="To Node Id"
            placeholder="To Node Id"
            value={toNode}
            onChange={handleInputChange(setToNode)}
          />
        </Form.Group>
      </Form>
      <div className={styles.shortestPath__inputContainer}>
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
          disabled={!isInputsValid || selectedKey == null}
          onClick={() => applyShortestPath(fromNode, toNode, selectedKey)}
        />
        <Button negative content="Cancel" onClick={cancelShortestPath} />
      </div>
      {error && <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>}
    </div>
  );
};

ShortestPath.propTypes = {
  linkKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
  // Redux Actions
  applyShortestPath: PropTypes.func.isRequired,
  cancelShortestPath: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const linkKeys = selectLinkKeys(state);
  const error = selectError(state);
  return {
    linkKeys,
    error,
  };
};

const actions = {
  applyShortestPath: shortestPathActions.applyShortestPath,
  cancelShortestPath: shortestPathActions.cancelShortestPath,
};

export default connect(
  mapStateToProps,
  actions,
)(ShortestPath);
