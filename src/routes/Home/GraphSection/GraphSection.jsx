import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ForceGraph2D } from 'react-force-graph';
import { forceCollide } from 'd3';
import throttle from 'lodash/throttle';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
import EditingTools, { ADD_LINK_MODE } from '../../../components/EditingTools';
// Selectors
import {
  selectGraphMode,
  selectIsAddLinkMode,
  selectClickedNodeId,
  selectHoveredNodeId,
  selectHoveredLinkId,
  selectGraphFocusedNode,
  selectGraphFocusedLink,
  selectVisualizedGraphData,
} from '../../../selectors/graph.selector';
import { selectGetColor } from '../../../selectors/coloring.selector';
import { selectGetRadius } from '../../../selectors/radius.selector';
import {
  selectShowNodeLabel,
  selectShowLinkLabel,
  selectShowNodeText,
  selectShowLinkDirection,
  selectAutoHideNodeText,
  selectGraphOrientation,
  selectNodeTextKey,
  selectShowTextOnly,
  selectForceLinkDistance,
  selectForceChargeStrength,
} from '../../../selectors/setting.selector';
// Utils
import {
  graphDataShape,
  modeShape,
  valueType,
  nodeShape,
  linkShape,
} from '../../../components/UtilPropTypes';
import { COLORS } from '../../../utils/color';
// Styles
import styles from './styles.scss';
import GraphPopover from '../../../components/GraphPopover';

const noOp = () => {};

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
  focusedLink,
  resetFocusedLink,
  setNodePopup,
  setLinkPopup,
  resetPopupData,
  refreshGraphLayout,
  // settings
  showNodeLabel,
  showLinkLabel,
  showNodeText,
  showTextOnly,
  showLinkDirection,
  nodeTextKey,
  autoHideNodeText,
  orientation,
  forceChargeStrength,
  forceLinkDistance,
}) => {
  const getLinkArrowLength = React.useCallback(
    () => (showLinkDirection ? 6 : 0),
    [showLinkDirection],
  );
  const graphRef = React.useRef();
  React.useEffect(
    () => {
      if (graphRef && focusedNode && focusedNode.id != null) {
        // Need to find the node object since x,y is changed when graph is dragged out
        const nodeObj = data.nodes.find(node => node.id === focusedNode.id);
        graphRef.current.centerAt(nodeObj.x, nodeObj.y, 1000);
        graphRef.current.zoom(2.5, 1000);
        hoverNode(nodeObj);
        resetFocusedNode();
      }
      if (graphRef && focusedLink && focusedLink.id != null) {
        // Need to find the node object since x,y is changed when graph is dragged out
        const linkObj = data.links.find(link => link.id === focusedLink.id);
        const x = (linkObj.source.x + linkObj.target.x) / 2;
        const y = (linkObj.source.y + linkObj.target.y) / 2;
        graphRef.current.centerAt(x, y, 1000);
        graphRef.current.zoom(2, 1000);
        hoverLink(linkObj);
        resetFocusedLink();
      }
    },
    [data.nodes, focusedNode, focusedLink],
  );
  React.useEffect(
    throttle(() => {
      const fg = graphRef.current;
      // Change force charge strength
      fg.d3Force('charge').strength(forceChargeStrength);
      refreshGraphLayout();
    }, 200),
    [forceChargeStrength],
  );
  React.useEffect(
    throttle(() => {
      const fg = graphRef.current;
      // Change force link strength
      fg.d3Force('link').distance(forceLinkDistance);
      refreshGraphLayout();
    }, 200),
    [forceLinkDistance],
  );
  React.useEffect(
    throttle(() => {
      const fg = graphRef.current;
      // Change force link strength
      fg.d3Force('forceCollide', forceCollide(getRadius));
      refreshGraphLayout();
    }, 200),
    [getRadius],
  );
  const nodeCanvasObjectModeCb = React.useCallback(() => 'replace', []);
  const nodeCanvasDrawCb = React.useCallback(
    (node, ctx, globalScale) => {
      const radius = getRadius(node);
      const highlightRadius = radius + 2;
      const isHighlight = hoveredNodeId.indexOf(node.id) !== -1;
      if (!showTextOnly) {
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
        if (hoveredNodeId.length > 0 && !isHighlight) {
          ctx.fillStyle = 'rgba(0,0,0,0.3)';
        } else {
          ctx.fillStyle = getColor(node);
        }
        ctx.fill();
      }
      if (showNodeText) {
        if (!showTextOnly && autoHideNodeText && globalScale <= 0.5) return;
        // Text
        // font size should be smaller than 24 but bigger than 12
        let fontSize = Math.min(24, Math.max(12, radius * 2));
        if (globalScale > 1) fontSize /= globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (hoveredNodeId.length > 0 && !isHighlight) {
          ctx.fillStyle = 'rgba(0,0,0,0.3)';
        } else if (showTextOnly) {
          ctx.fillStyle = getColor(node);
        } else {
          ctx.fillStyle = 'black';
        }
        ctx.fillText(node[nodeTextKey], node.x, node.y);
      }
    },
    [
      hoveredNodeId,
      getRadius,
      getColor,
      showNodeText,
      showTextOnly,
      nodeTextKey,
      autoHideNodeText,
    ],
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const handleNodeDrag = React.useCallback(
    throttle(() => {
      if (isDragging) return;
      setIsDragging(true);
      resetPopupData();
    }, 200),
    [isDragging],
  );
  const handleNodeDragEnd = React.useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleZoom = React.useCallback(
    throttle(() => {
      resetPopupData();
    }, 200),
    [],
  );
  const handleClickNode = React.useCallback(
    (node, { clientX: x, clientY: y }) => {
      clickNode(node);
      if (mode !== ADD_LINK_MODE && showNodeLabel) {
        setNodePopup(node, { x, y });
      }
    },
    [mode, showNodeLabel],
  );
  const handleClickLink = React.useCallback(
    (link, { clientX: x, clientY: y }) => {
      if (mode !== ADD_LINK_MODE && showLinkLabel) {
        setLinkPopup(link, { x, y });
      }
    },
    [mode, showLinkLabel],
  );
  return (
    <div id="graph-container" className={styles.graphContainer}>
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
        dagMode={orientation}
        nodeVal={getRadius}
        nodeLabel={noOp}
        linkLabel={noOp}
        nodeCanvasObjectMode={nodeCanvasObjectModeCb}
        nodeCanvasObject={nodeCanvasDrawCb}
        linkWidth={link =>
          link.id != null && link.id === hoveredLinkId ? 5 : 1
        }
        onNodeClick={isDragging ? noOp : handleClickNode}
        onNodeHover={isDragging ? noOp : hoverNode}
        onLinkHover={isDragging ? noOp : hoverLink}
        onLinkClick={isDragging ? noOp : handleClickLink}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowLength={getLinkArrowLength}
        onZoom={handleZoom}
        onNodeDrag={handleNodeDrag}
        onNodeDragEnd={handleNodeDragEnd}
      />
      <GraphPopover />
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
  focusedLink: linkShape,
  // Setting State
  showNodeLabel: PropTypes.bool.isRequired,
  showLinkLabel: PropTypes.bool.isRequired,
  showNodeText: PropTypes.bool.isRequired,
  showTextOnly: PropTypes.bool.isRequired,
  showLinkDirection: PropTypes.bool.isRequired,
  nodeTextKey: PropTypes.string.isRequired,
  autoHideNodeText: PropTypes.bool.isRequired,
  orientation: PropTypes.string,
  forceChargeStrength: PropTypes.number.isRequired,
  forceLinkDistance: PropTypes.number.isRequired,
  // Redux actions
  setMode: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
  getRadius: PropTypes.func.isRequired,
  clickNode: PropTypes.func.isRequired,
  hoverNode: PropTypes.func.isRequired,
  hoverLink: PropTypes.func.isRequired,
  resetFocusedNode: PropTypes.func.isRequired,
  resetFocusedLink: PropTypes.func.isRequired,
  setNodePopup: PropTypes.func.isRequired,
  setLinkPopup: PropTypes.func.isRequired,
  resetPopupData: PropTypes.func.isRequired,
  refreshGraphLayout: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const mode = selectGraphMode(state);
  const isAddLinkMode = selectIsAddLinkMode(state);
  const data = selectVisualizedGraphData(state);
  const clickedNodeId = selectClickedNodeId(state);
  const hoveredNodeId = selectHoveredNodeId(state);
  const hoveredLinkId = selectHoveredLinkId(state);
  const getColor = selectGetColor(state);
  const getRadius = selectGetRadius(state);
  const focusedNode = selectGraphFocusedNode(state);
  const focusedLink = selectGraphFocusedLink(state);
  const showNodeLabel = selectShowNodeLabel(state);
  const showLinkLabel = selectShowLinkLabel(state);
  const showNodeText = selectShowNodeText(state);
  const showTextOnly = selectShowTextOnly(state);
  const showLinkDirection = selectShowLinkDirection(state);
  const nodeTextKey = selectNodeTextKey(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  const orientation = selectGraphOrientation(state);
  const forceChargeStrength = selectForceChargeStrength(state);
  const forceLinkDistance = selectForceLinkDistance(state);
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
    focusedLink,
    showNodeLabel,
    showLinkLabel,
    showNodeText,
    showTextOnly,
    showLinkDirection,
    nodeTextKey,
    autoHideNodeText,
    orientation,
    forceChargeStrength,
    forceLinkDistance,
  };
};

const actions = {
  setMode: graphAction.setMode,
  clickNode: graphAction.clickNode,
  hoverNode: graphAction.hoverNode,
  hoverLink: graphAction.hoverLink,
  resetFocusedNode: graphAction.resetFocusedNode,
  resetFocusedLink: graphAction.resetFocusedLink,
  setNodePopup: graphAction.setNodePopup,
  setLinkPopup: graphAction.setLinkPopup,
  resetPopupData: graphAction.resetPopupData,
  refreshGraphLayout: graphAction.refreshGraphLayout,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphSection);
