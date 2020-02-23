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
import { selectAlgo } from '../../../selectors/algo.selector';
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
  const algo = selectAlgo(state) || 'ORIGINAL';
  const graphData = selectVisualizedGraphData(state);
  const nodeSearchValue = selectNodeSearchValue(state);
  const linkSearchValue = selectLinkSearchValue(state);
  return {
    graphType: algo,
    graphData,
    searchAsFilter,
    nodeSearchValue,
    linkSearchValue,
  };
};

export default connect(mapStateToProps)(GraphStatusInfo);
