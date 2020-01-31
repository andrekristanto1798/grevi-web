import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../actions/graph.action';
// Components
import EditNodeModal from './EditNodeModal';
// Selectors
import { selectEditedNode } from '../../selectors/graph.selector';

const mapStateToProps = state => {
  const node = selectEditedNode(state);
  return { node };
};

const actions = {
  onCancel: graphAction.cancelEditNode,
  onSubmit: graphAction.submitEditedNode,
};

export default connect(
  mapStateToProps,
  actions,
)(EditNodeModal);
