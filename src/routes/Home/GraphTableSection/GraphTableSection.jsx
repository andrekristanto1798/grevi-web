import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
import TablePagination from '../../../components/TablePagination';
// Selectors
import {
  selectGraphNodes,
  selectNodeKeys,
} from '../../../selectors/graph.selector';
// Utils
import { nodeShape } from '../../../components/UtilPropTypes';
// Styles
import styles from './styles.scss';

const getValidData = (data, dataKey, searchValue) => {
  if (searchValue === '') return data;
  const regex = new RegExp(searchValue, 'i');
  return data.filter(node =>
    dataKey.map(key => regex.test(node[key])).some(isCorrect => !!isCorrect),
  );
};

const toGraphTableData = focusNodeOn => node => ({
  ...node,
  Actions: (
    <>
      <Button
        color="facebook"
        icon="eye"
        size="mini"
        onClick={() => focusNodeOn(node)}
      />
      <Button color="green" icon="pencil" size="mini" />
      <Button color="red" icon="delete" size="mini" />
    </>
  ),
});

function GraphTableSection({ nodes, nodeKeys, focusNodeOn }) {
  if (nodeKeys.length === 0) {
    return <i>No nodes available</i>;
  }
  const dataKey = React.useMemo(() => [...nodeKeys, 'Actions'], [nodeKeys]);
  const [searchValue, setSearchValue] = React.useState('');
  const handleChangeSearch = React.useCallback((_, { value }) => {
    setSearchValue(value);
  }, []);
  const validData = React.useMemo(
    () => getValidData(nodes, nodeKeys, searchValue),
    [nodes, nodeKeys, searchValue],
  );
  const handleGetData = React.useCallback(
    (firstIndex, lastIndex) =>
      validData.slice(firstIndex, lastIndex).map(toGraphTableData(focusNodeOn)),
    [validData, focusNodeOn],
  );
  return (
    <div className={styles.graphTable__container}>
      <TablePagination
        searchBar={(
          <Input
            icon="search"
            placeholder="Search..."
            value={searchValue}
            onChange={handleChangeSearch}
          />
        )}
        getData={handleGetData}
        dataLength={validData.length}
        dataKey={dataKey}
      />
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
