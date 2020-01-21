import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import { Table, Button } from 'semantic-ui-react';
// Selectors
import {
  selectGraphNodes,
  selectNodeKeys,
} from '../../../selectors/graph.selector';
// Utils
import { nodeShape } from '../../../components/UtilPropTypes';

import styles from './styles.scss';

function GraphTableSection({ nodes, nodeKeys }) {
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
                <Button color="facebook" icon="eye" size="mini" />
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
};

const mapStateToProps = state => {
  const nodes = selectGraphNodes(state);
  const nodeKeys = selectNodeKeys(state);
  return { nodes, nodeKeys };
};

export default connect(mapStateToProps)(GraphTableSection);
