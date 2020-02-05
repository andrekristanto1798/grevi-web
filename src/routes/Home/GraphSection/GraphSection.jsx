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
  selectGraphFocusedNode,
} from '../../../selectors/graph.selector';
import { selectGetColor } from '../../../selectors/coloring.selector';
import { selectGetRadius } from '../../../selectors/radius.selector';
// Utils
import {
  graphDataShape,
  modeShape,
  valueType,
  nodeShape,
} from '../../../components/UtilPropTypes';
import { COLORS } from '../../../utils/color';
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
  hoverNode,
  hoverLink,
  hoveredNodeId,
  hoveredLinkId,
  getRadius,
  getColor,
  focusedNode,
  resetFocusedNode,
}) => {
  const graphRef = React.useRef();
  React.useEffect(
    () => {
      if (graphRef && focusedNode && focusedNode.x && focusedNode.y) {
        graphRef.current.centerAt(focusedNode.x, focusedNode.y, 1000);
        graphRef.current.zoom(1.8, 1000);
      }
      resetFocusedNode();
    },
    [focusedNode],
  );
  const nodeCanvasObjectModeCb = React.useCallback(() => 'replace', []);
  const nodeCanvasDrawCb = React.useCallback(
    (node, ctx, globalScale) => {
      const radius = getRadius(node);
      const highlightRadius = radius + 2;
      const isHighlight = hoveredNodeId.indexOf(node.id) !== -1;
      if (isHighlight) {
        // The highlight circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, highlightRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = COLORS.redNormal;
        ctx.fill();
      }
      // The inside circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = isHighlight ? COLORS.blueNormal : getColor(node);
      ctx.fill();
      if (globalScale >= 0.6) {
        // Text
        const fontSize = 14 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(node.id, node.x, node.y);
      }
    },
    [hoveredNodeId, getRadius, getColor],
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
        ref={graphRef}
        graphData={data}
        width={width}
        height={height}
        nodeColor={getColor}
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
  focusedNode: nodeShape,
  // Redux actions
  setMode: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
  getRadius: PropTypes.func.isRequired,
  clickNode: PropTypes.func.isRequired,
  hoverNode: PropTypes.func.isRequired,
  hoverLink: PropTypes.func.isRequired,
  resetFocusedNode: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const mode = selectGraphMode(state);
  const isAddLinkMode = selectIsAddLinkMode(state);
  const data = selectGraphDataJS(state);
  const clickedNodeId = selectClickedNodeId(state);
  const hoveredNodeId = selectHoveredNodeId(state);
  const hoveredLinkId = selectHoveredLinkId(state);
  const getColor = selectGetColor(state);
  const getRadius = selectGetRadius(state);
  const focusedNode = selectGraphFocusedNode(state);
  return {
    isAddLinkMode,
    mode,
    data,
    clickedNodeId,
    hoveredNodeId,
    hoveredLinkId,
    getColor,
    getRadius,
    focusedNode,
  };
};

const actions = {
  setMode: graphAction.setMode,
  clickNode: graphAction.clickNode,
  hoverNode: graphAction.hoverNode,
  hoverLink: graphAction.hoverLink,
  resetFocusedNode: graphAction.resetFocusedNode,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphSection);
