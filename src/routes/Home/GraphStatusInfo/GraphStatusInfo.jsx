// show current graph (mst? shortest-path? original?)
// filter: [node: "xxx"]
// filter: [link: "xxx"]
// how many nodes and links
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cls from 'classnames';
// Selectors
import {
  selectVisualizedGraphData,
  selectSearchAsFilter,
  selectNodeSearchValue,
  selectLinkSearchValue,
} from '../../../selectors/graph.selector';
import { selectIsShortestPathApplied } from '../../../selectors/shortestPath.selector';
import { selectIsMstApplied } from '../../../selectors/mst.selector';
// Utils
import { graphDataShape } from '../../../components/UtilPropTypes';
// Styles
import styles from './styles.scss';

function GraphStatusInfo({
  className,
  graphType,
  graphData: { nodes, links },
  searchAsFilter,
  nodeSearchValue,
  linkSearchValue,
}) {
  const nodeLinkCountString = `${nodes.length} nodes ${links.length} links`;
  return (
    <div className={cls(className, styles.graphStatusInfo__darkContainer)}>
      <div className={styles.graphStatusInfo__rowContainer}>
        Currently: {graphType}
      </div>
      <div className={styles.graphStatusInfo__rowContainer}>
        Showing: {nodeLinkCountString}
      </div>
      {searchAsFilter && (
        <>
          <div className={styles.graphStatusInfo__rowContainer}>
            Filter Node: {nodeSearchValue}
          </div>
          <div className={styles.graphStatusInfo__rowContainer}>
            Filter Link: {linkSearchValue}
          </div>
        </>
      )}
    </div>
  );
}

GraphStatusInfo.propTypes = {
  className: PropTypes.string,
  graphType: PropTypes.string.isRequired,
  graphData: graphDataShape.isRequired,
  searchAsFilter: PropTypes.bool.isRequired,
  nodeSearchValue: PropTypes.string.isRequired,
  linkSearchValue: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const searchAsFilter = selectSearchAsFilter(state);
  const isMstApplied = selectIsMstApplied(state);
  const isShortestPathApplied = selectIsShortestPathApplied(state);
  const graphData = selectVisualizedGraphData(state);
  const nodeSearchValue = selectNodeSearchValue(state);
  const linkSearchValue = selectLinkSearchValue(state);
  let graphType = 'ORIGINAL';
  if (isMstApplied) graphType = 'MST';
  if (isShortestPathApplied) graphType = 'SHORTEST PATH';
  return {
    graphType,
    graphData,
    searchAsFilter,
    nodeSearchValue,
    linkSearchValue,
  };
};

export default connect(mapStateToProps)(GraphStatusInfo);
