import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
import TablePagination from '../../../components/TablePagination';
// Selectors
import {
  selectGraphNodes,
  selectNodeKeys,
} from '../../../selectors/graph.selector';
// Utils
import { nodeShape } from '../../../components/UtilPropTypes';
// Styles
import styles from './styles.scss';

function GraphTableSection({ nodes, nodeKeys, focusNodeOn }) {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  const handleGetData = React.useCallback(
    (firstIndex, lastIndex) =>
      nodes.slice(firstIndex, lastIndex).map(node => ({
        ...node,
        Actions: (
          <>
            <Button
              color="facebook"
              icon="eye"
              size="mini"
              onClick={() => focusNodeOn(node)}
            />
            <Button color="green" icon="pencil" size="mini" />
            <Button color="red" icon="delete" size="mini" />
          </>
        ),
      })),
    [nodes, focusNodeOn],
  );
  const dataKey = React.useMemo(() => [...nodeKeys, 'Actions'], [nodeKeys]);
  return (
    <div className={styles.graphTable__container}>
      <TablePagination
        getData={handleGetData}
        dataLength={nodes.length}
        dataKey={dataKey}
      />
    </div>
  );
}

GraphTableSection.propTypes = {
  nodes: PropTypes.arrayOf(nodeShape).isRequired,
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Actions
  focusNodeOn: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const nodes = selectGraphNodes(state);
  const nodeKeys = selectNodeKeys(state);
  return { nodes, nodeKeys };
};

const actions = {
  focusNodeOn: graphAction.focusNodeOn,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphTableSection);
