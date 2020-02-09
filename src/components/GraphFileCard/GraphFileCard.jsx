import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { graphDataShape } from '../UtilPropTypes';

export default function GraphFileCard({ name, graph, desc, onClick }) {
  return (
    <Card onClick={onClick}>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          {graph.nodes.length} nodes {graph.links.length} edges
        </Card.Meta>
        <Card.Description>{desc}</Card.Description>
      </Card.Content>
    </Card>
  );
}

GraphFileCard.propTypes = {
  name: PropTypes.string.isRequired,
  graph: graphDataShape.isRequired,
  desc: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
