import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../actions/graph.action';
// Components
import DeleteLinkModal from './DeleteLinkModal';
// Selectors
import { selectDeletedLink } from '../../selectors/graph.selector';

const mapStateToProps = state => {
  const link = selectDeletedLink(state);
  return { link };
};

const actions = {
  onCancel: graphAction.cancelDeleteLink,
  onSubmit: graphAction.submitDeleteLink,
};

export default connect(
  mapStateToProps,
  actions,
)(DeleteLinkModal);
