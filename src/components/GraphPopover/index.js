import { connect } from 'react-redux';
// Actions
import * as graphAction from '../../actions/graph.action';
// Components
import GraphPopover from './GraphPopover';
// Selectors
import {
  selectPopupData,
  selectPopupPosition,
} from '../../selectors/graph.selector';

const mapStateToProps = state => {
  const popupData = selectPopupData(state);
  const position = selectPopupPosition(state);
  return { position, popupData };
};

const actions = {
  onClose: graphAction.resetPopupData,
};

export default connect(
  mapStateToProps,
  actions,
)(GraphPopover);
