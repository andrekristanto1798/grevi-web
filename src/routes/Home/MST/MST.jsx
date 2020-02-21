import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react';
// Actions
import * as mstActions from '../../../actions/mst.action';
// Selectors
import {
  selectSelectedKey,
  selectError,
} from '../../../selectors/mst.selector';
import { selectLinkKeys } from '../../../selectors/graph.selector';
// Utils
import { toOption } from '../../../utils/objects';
// Styles
import styles from './styles.scss';

const MST = ({ linkKeys, selectedKey, selectKey, error }) => {
  if (linkKeys.length === 0) {
    return <i>No links available</i>;
  }
  const validLinkKeys = React.useMemo(
    () => linkKeys.filter(key => key !== 'source' && key !== 'target'),
    [linkKeys],
  ); // to filter out source and target key
  const handleChangeKey = React.useCallback(
    (_, { value }) => {
      selectKey(value);
    },
    [selectKey],
  );
  const dropdwonOptions = React.useMemo(
    () => [
      { key: 'none', value: null, text: 'none' },
      ...validLinkKeys.map(toOption),
      {
        key: 'uniform-weight',
        value: mstActions.MST_UNIFORM_WEIGHT,
        text: 'Uniform Weight',
      },
    ],
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
        {selectedKey && (
          <Button
            positive
            title="Refresh"
            size="mini"
            icon="refresh"
            onClick={() => selectKey(selectedKey)}
          />
        )}
      </div>
      {error && <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>}
    </div>
  );
};

MST.propTypes = {
  linkKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedKey: PropTypes.string,
  error: PropTypes.string,
  // Redux actions
  selectKey: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const linkKeys = selectLinkKeys(state);
  const selectedKey = selectSelectedKey(state);
  const error = selectError(state);
  return {
    linkKeys,
    selectedKey,
    error,
  };
};

const actions = {
  selectKey: mstActions.selectKey,
};

export default connect(
  mapStateToProps,
  actions,
)(MST);
