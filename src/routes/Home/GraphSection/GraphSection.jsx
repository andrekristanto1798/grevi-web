import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ForceGraph2D } from 'react-force-graph';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
import EditingTools from '../../../components/EditingTools';
// Selectors
import {
  selectGraphDataJS,
  selectGraphMode,
  selectIsAddLinkMode,
  selectClickedNodeId,
} from '../../../selectors/graph.selector';
// Utils
import {
  graphDataShape,
  modeShape,
  valueType,
} from '../../../components/UtilPropTypes';
// Styles
import styles from './styles.scss';

const GraphSection = ({
  mode,
  isAddLinkMode,
  data,
  width,
  height,
  clickedNodeId,
  setMode,
  clickNode,
}) => {
  return (
    <div className={styles.graphContainer}>
      <div className={styles.editingToolsContainer}>
        <EditingTools mode={mode} onModeChange={setMode} />
      </div>
      {isAddLinkMode && (
        <div className={styles.addLinkHelperContainer}>
          {clickedNodeId
            ? `Click another node to add link with nodeId ${clickedNodeId}`
            : 'Click two nodes to add link'}
        </div>
      )}
      <ForceGraph2D
        graphData={data}
        width={width}
        height={height}
        nodeLabel={node => {
          const children = `<pre>${JSON.stringify(node, null, 4)}</pre>`;
          return children;
        }}
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const { id } = node;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';
          ctx.fillText(id, node.x, node.y);
        }}
        onNodeClick={clickNode}
      />
    </div>
  );
};

GraphSection.propTypes = {
  mode: modeShape.isRequired,
  isAddLinkMode: PropTypes.bool.isRequired,
  data: graphDataShape.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  clickedNodeId: valueType,
  // Redux actions
  setMode: PropTypes.func.isRequired,
  clickNode: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const mode = selectGraphMode(state);
  const isAddLinkMode = selectIsAddLinkMode(state);
  const data = selectGraphDataJS(state);
  const clickedNodeId = selectClickedNodeId(state);
  return { isAddLinkMode, mode, data, clickedNodeId };
};

const actions = {
  setMode: graphAction.setMode,
  clickNode: graphAction.clickNode,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphSection);
