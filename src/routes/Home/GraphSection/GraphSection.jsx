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
  selectHoveredNodeId,
  selectHoveredLinkId,
} from '../../../selectors/graph.selector';
// Utils
import {
  graphDataShape,
  modeShape,
  valueType,
} from '../../../components/UtilPropTypes';
import { COLORS } from '../../../utils/color';
// Styles
import styles from './styles.scss';
import {
  selectColorMap,
  selectSelectedKey,
} from '../../../selectors/coloring.selector';

const NODE_R = 8;

const GraphSection = ({
  mode,
  isAddLinkMode,
  data,
  width,
  height,
  clickedNodeId,
  setMode,
  clickNode,
  hoverNode,
  hoverLink,
  hoveredNodeId,
  hoveredLinkId,
  selectedColorKey,
  colorMap,
}) => {
  const getColor = React.useCallback(
    node => {
      if (selectedColorKey) return colorMap[node[selectedColorKey]];
      return COLORS.blueNormal;
    },
    [colorMap, selectedColorKey],
  );
  const nodeCanvasObjectModeCb = React.useCallback(() => 'after', []);
  const nodeCanvasDrawCb = React.useCallback(
    (node, ctx, globalScale) => {
      if (hoveredNodeId.indexOf(node.id) !== -1) {
        // The highlight circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.2, 0, 2 * Math.PI, false);
        ctx.fillStyle = COLORS.redNormal;
        ctx.fill();
        // The inside circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R, 0, 2 * Math.PI, false);
        ctx.fillStyle = COLORS.blueNormal;
        ctx.fill();
      }
      // // Text
      const fontSize = 14 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.fillText(node.id, node.x, node.y);
    },
    [hoveredNodeId],
  );
  const nodeLabelCb = React.useCallback(node => {
    const children = `<pre>${JSON.stringify(node, null, 4)}</pre>`;
    return children;
  }, []);
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
        nodeColor={getColor}
        nodeRelSize={NODE_R}
        nodeLabel={nodeLabelCb}
        nodeCanvasObjectMode={nodeCanvasObjectModeCb}
        nodeCanvasObject={nodeCanvasDrawCb}
        linkWidth={link => (link.id === hoveredLinkId ? 5 : 1)}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link =>
          link.id === hoveredLinkId ? 4 : 0
        }
        onNodeClick={clickNode}
        onNodeHover={hoverNode}
        onLinkHover={hoverLink}
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
  hoveredNodeId: PropTypes.arrayOf(valueType),
  hoveredLinkId: valueType,
  // Coloring
  selectedColorKey: PropTypes.string,
  colorMap: PropTypes.objectOf(PropTypes.string),
  // Redux actions
  setMode: PropTypes.func.isRequired,
  clickNode: PropTypes.func.isRequired,
  hoverNode: PropTypes.func.isRequired,
  hoverLink: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const mode = selectGraphMode(state);
  const isAddLinkMode = selectIsAddLinkMode(state);
  const data = selectGraphDataJS(state);
  const clickedNodeId = selectClickedNodeId(state);
  const hoveredNodeId = selectHoveredNodeId(state);
  const hoveredLinkId = selectHoveredLinkId(state);
  const selectedColorKey = selectSelectedKey(state);
  const colorMap = selectColorMap(state);
  return {
    isAddLinkMode,
    mode,
    data,
    clickedNodeId,
    hoveredNodeId,
    hoveredLinkId,
    selectedColorKey,
    colorMap,
  };
};

const actions = {
  setMode: graphAction.setMode,
  clickNode: graphAction.clickNode,
  hoverNode: graphAction.hoverNode,
  hoverLink: graphAction.hoverLink,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphSection);
