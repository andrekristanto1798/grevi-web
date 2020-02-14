import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'semantic-ui-react';
// Actions
import * as coloringActions from '../../../actions/coloring.action';
// Components
import ColorTable from './ColorTable';
// Selectors
import { selectSelectedKey } from '../../../selectors/coloring.selector';
import { selectNodeKeys } from '../../../selectors/graph.selector';
// Utils
import { toOption } from '../../../utils/objects';
// Styles
import styles from './styles.scss';

const ColoringByProperty = ({ nodeKeys, selectedKey, selectKey }) => {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  if (nodeKeys && nodeKeys.length < 1) return null;
  const handleChangeKey = React.useCallback(
    (_, { value }) => {
      selectKey(value);
    },
    [selectKey],
  );
  const dropdwonOptions = React.useMemo(
    () => [
      { key: 'none', value: null, text: 'none' },
      ...nodeKeys.map(toOption),
      {
        key: coloringActions.COLORING_SPECIAL.DEGREE,
        value: coloringActions.COLORING_SPECIAL.DEGREE,
        text: 'Node Degree',
      },
      {
        key: coloringActions.COLORING_SPECIAL.BETWEENNESS,
        value: coloringActions.COLORING_SPECIAL.BETWEENNESS,
        text: 'Node Betweenness',
      },
      {
        key: coloringActions.COLORING_SPECIAL.CLOSENESS,
        value: coloringActions.COLORING_SPECIAL.CLOSENESS,
        text: 'Node Closeness',
      },
      {
        key: coloringActions.COLORING_SPECIAL.CLUSTERING,
        value: coloringActions.COLORING_SPECIAL.CLUSTERING,
        text: 'Node Clustering',
      },
    ],
    [nodeKeys],
  );
  return (
    <div className={styles.coloringByProperty__container}>
      <div className={styles.coloringByProperty__inputContainer}>
        <Dropdown
          placeholder="Select Node Attributes"
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
      {selectedKey && <ColorTable />}
    </div>
  );
};

ColoringByProperty.propTypes = {
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedKey: PropTypes.string,
  // Redux actions
  selectKey: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const nodeKeys = selectNodeKeys(state);
  const selectedKey = selectSelectedKey(state);
  return {
    nodeKeys,
    selectedKey,
  };
};

const actions = {
  selectKey: coloringActions.selectKey,
};

export default connect(
  mapStateToProps,
  actions,
)(ColoringByProperty);
