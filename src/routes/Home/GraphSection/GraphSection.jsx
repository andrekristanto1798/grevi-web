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
  selectGraphFocusedLink,
  selectSearchAsFilter,
  selectValidData,
} from '../../../selectors/graph.selector';
import { selectGetColor } from '../../../selectors/coloring.selector';
import { selectGetRadius } from '../../../selectors/radius.selector';
import {
  selectShowNodeLabel,
  selectShowLinkLabel,
  selectShowNodeText,
  selectAutoHideNodeText,
  selectGraphOrientation,
  selectNodeTextKey,
} from '../../../selectors/setting.selector';
// Utils
import {
  graphDataShape,
  modeShape,
  valueType,
  nodeShape,
  linkShape,
} from '../../../components/UtilPropTypes';
import { cleanFromIgnoredKeys } from '../../../utils/objects';
import { COLORS } from '../../../utils/color';
// Styles
import styles from './styles.scss';

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
  // settings
  showNodeLabel,
  showLinkLabel,
  showNodeText,
  nodeTextKey,
  autoHideNodeText,
  orientation,
}) => {
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
      if (showNodeText) {
        if (autoHideNodeText && globalScale <= 0.5) return;
        // Text
        let fontSize = 8;
        if (globalScale > 1) fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText(node[nodeTextKey], node.x, node.y);
      }
    },
    [
      hoveredNodeId,
      getRadius,
      getColor,
      showNodeText,
      nodeTextKey,
      autoHideNodeText,
    ],
  );
  const objLabelCb = React.useCallback(obj => {
    const cloneObj = cleanFromIgnoredKeys({ ...obj });
    if (cloneObj.source && cloneObj.source.id !== null)
      cloneObj.source = cloneObj.source.id;
    if (cloneObj.target && cloneObj.target.id !== null)
      cloneObj.target = cloneObj.target.id;
    const children = `<pre>${JSON.stringify(cloneObj, null, 2)}</pre>`;
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
        dagMode={orientation}
        nodeColor={getColor}
        nodeVal={getRadius}
        nodeLabel={showNodeLabel ? objLabelCb : noOp}
        linkLabel={showLinkLabel ? objLabelCb : noOp}
        nodeCanvasObjectMode={nodeCanvasObjectModeCb}
        nodeCanvasObject={nodeCanvasDrawCb}
        linkWidth={link =>
          link.id != null && link.id === hoveredLinkId ? 5 : 1
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
  focusedLink: linkShape,
  // Setting State
  showNodeLabel: PropTypes.bool.isRequired,
  showLinkLabel: PropTypes.bool.isRequired,
  showNodeText: PropTypes.bool.isRequired,
  nodeTextKey: PropTypes.string.isRequired,
  autoHideNodeText: PropTypes.bool.isRequired,
  orientation: PropTypes.string,
  // Redux actions
  setMode: PropTypes.func.isRequired,
  getColor: PropTypes.func.isRequired,
  getRadius: PropTypes.func.isRequired,
  clickNode: PropTypes.func.isRequired,
  hoverNode: PropTypes.func.isRequired,
  hoverLink: PropTypes.func.isRequired,
  resetFocusedNode: PropTypes.func.isRequired,
  resetFocusedLink: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const mode = selectGraphMode(state);
  const isAddLinkMode = selectIsAddLinkMode(state);
  const searchAsFilter = selectSearchAsFilter(state);
  const data = !searchAsFilter
    ? selectGraphDataJS(state)
    : selectValidData(state);
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
  const nodeTextKey = selectNodeTextKey(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  const orientation = selectGraphOrientation(state);
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
    nodeTextKey,
    autoHideNodeText,
    orientation,
  };
};

const actions = {
  setMode: graphAction.setMode,
  clickNode: graphAction.clickNode,
  hoverNode: graphAction.hoverNode,
  hoverLink: graphAction.hoverLink,
  resetFocusedNode: graphAction.resetFocusedNode,
  resetFocusedLink: graphAction.resetFocusedLink,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphSection);
