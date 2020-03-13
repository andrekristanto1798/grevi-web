import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../actions/graph.action';
// Components
import GraphPopover from './GraphPopover';
// Selectors
import { selectPopupData } from '../../selectors/graph.selector';

const mapStateToProps = state => {
  const popupData = selectPopupData(state);
  return { popupData };
};

const actions = {
  onClose: graphAction.resetPopupData,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphPopover);
