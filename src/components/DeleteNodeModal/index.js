import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../actions/graph.action';
// Components
import DeleteNodeModal from './DeleteNodeModal';
// Selectors
import { selectDeletedNode } from '../../selectors/graph.selector';

const mapStateToProps = state => {
  const node = selectDeletedNode(state);
  return { node };
};

const actions = {
  onCancel: graphAction.cancelDeleteNode,
  onSubmit: graphAction.submitDeleteNode,
};

export default connect(
  mapStateToProps,
  actions,
)(DeleteNodeModal);
