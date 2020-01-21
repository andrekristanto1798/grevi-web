import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
// Selectors
import {
  selectGraphNodes,
  selectNodeKeys,
} from '../../../selectors/graph.selector';
// Utils
import { nodeShape } from '../../../components/UtilPropTypes';

import styles from './styles.scss';

function GraphTableSection({ nodes, nodeKeys, focusNodeOn }) {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  return (
    <div className={styles.graphTable__container}>
      <Table size="small" compact="very" striped>
        <Table.Header>
          <Table.Row>
            {nodeKeys.map(key => (
              <Table.HeaderCell key={key}>{key}</Table.HeaderCell>
            ))}
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {nodes.map(node => (
            <Table.Row key={node.id}>
              {nodeKeys.map(key => (
                <Table.Cell key={key}>{node[key]}</Table.Cell>
              ))}
              <Table.Cell>
                <Button
                  color="facebook"
                  icon="eye"
                  size="mini"
                  onClick={() => focusNodeOn(node)}
                />
                <Button color="green" icon="pencil" size="mini" />
                <Button color="red" icon="delete" size="mini" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
