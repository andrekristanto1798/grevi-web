import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../../actions/graph.action';
// Components
import TableSection from '../../../components/TableSection';
import { nodeToGraphTableData, linkToGraphTableData } from './parts';
// Selectors
import {
  selectNodeKeys,
  selectLinkKeys,
  selectNodeSearchValue,
  selectLinkSearchValue,
  selectValidData,
  selectSearchAsFilter,
} from '../../../selectors/graph.selector';
import {
  selectFocusNodeOnDoubleClick,
  selectHighlightNodeOnRowHover,
} from '../../../selectors/setting.selector';

const nodeTableStateToProps = state => {
  const nodeKeys = selectNodeKeys(state);
  const nodeSearchValue = selectNodeSearchValue(state);
  const validData = selectValidData(state);
  const searchAsFilter = selectSearchAsFilter(state);
  const focusOnDoubleClick = selectFocusNodeOnDoubleClick(state);
  const highlightOnRowHover = selectHighlightNodeOnRowHover(state);
  return {
    dataKeys: nodeKeys,
    searchValue: nodeSearchValue,
    validData: validData.nodes,
    searchAsFilter,
    focusOnDoubleClick,
    highlightOnRowHover,
    dataMappingFunction: nodeToGraphTableData,
  };
};

const nodeTableActions = {
  hover: graphAction.hoverNode,
  remove: graphAction.deleteNode,
  edit: graphAction.editNode,
  focusOn: graphAction.focusNodeOn,
  handleChangeSearchValue: graphAction.handleChangeNodeSearchValue,
  toogleSearchAsFilter: graphAction.toogleSearchAsFilter,
};

export const NodeTable = connect(
  nodeTableStateToProps,
  nodeTableActions,
)(TableSection);

const linkTableStateToProps = state => {
  const linkKeys = selectLinkKeys(state);
  const linkSearchValue = selectLinkSearchValue(state);
  const validData = selectValidData(state);
  const searchAsFilter = selectSearchAsFilter(state);
  const focusOnDoubleClick = selectFocusNodeOnDoubleClick(state);
  const highlightOnRowHover = selectHighlightNodeOnRowHover(state);
  return {
    dataKeys: linkKeys,
    searchValue: linkSearchValue,
    validData: validData.links,
    searchAsFilter,
    focusOnDoubleClick,
    highlightOnRowHover,
    dataMappingFunction: linkToGraphTableData,
  };
};

const linkTableActions = {
  hover: graphAction.hoverLink,
  remove: graphAction.deleteLink,
  edit: graphAction.editLink,
  focusOn: graphAction.focusLinkOn,
  handleChangeSearchValue: graphAction.handleChangeLinkSearchValue,
  toogleSearchAsFilter: graphAction.toogleSearchAsFilter,
};

export const LinkTable = connect(
  linkTableStateToProps,
  linkTableActions,
)(TableSection);
