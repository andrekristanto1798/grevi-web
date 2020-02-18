import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../actions/graph.action';
// Components
import EditLinkModal from './EditLinkModal';
// Selectors
import { selectEditedLink } from '../../selectors/graph.selector';

const mapStateToProps = state => {
  const link = selectEditedLink(state);
  return { link };
};

const actions = {
  onCancel: graphAction.cancelEditLink,
  onSubmit: graphAction.submitEditedLink,
};

export default connect(
  mapStateToProps,
  actions,
)(EditLinkModal);
