import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import { Form, Checkbox } from 'semantic-ui-react';
// Actions
import * as settingAction from '../../../actions/setting.action';
// Selectors
import {
  selectShowNodeLabel,
  selectShowLinkLabel,
  selectShowNodeText,
  selectAutoHideNodeText,
} from '../../../selectors/setting.selector';

function SettingSection({
  showNodeLabel,
  showLinkLabel,
  showNodeText,
  autoHideNodeText,
  toogleNodeLabel,
  toogleLinkLabel,
  toogleNodeText,
  toogleHideNodeText,
}) {
  return (
    <Form>
      <Form.Field>
        <Checkbox
          label="Graph - show 'Node' popup details on hover"
          checked={showNodeLabel}
          onChange={() => toogleNodeLabel(showNodeLabel)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Graph - show 'Link' popup details on hover"
          checked={showLinkLabel}
          onChange={() => toogleLinkLabel(showLinkLabel)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Graph - show 'Node' id on the graph"
          checked={showNodeText}
          onChange={() => toogleNodeText(showNodeText)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Graph - automatically hide text on zoomed out"
          checked={autoHideNodeText}
          onChange={() => toogleHideNodeText(autoHideNodeText)}
        />
      </Form.Field>
    </Form>
  );
}

SettingSection.propTypes = {
  // Redux State
  showNodeLabel: PropTypes.bool.isRequired,
  showLinkLabel: PropTypes.bool.isRequired,
  showNodeText: PropTypes.bool.isRequired,
  autoHideNodeText: PropTypes.bool.isRequired,
  // Redux actions
  toogleNodeLabel: PropTypes.func.isRequired,
  toogleLinkLabel: PropTypes.func.isRequired,
  toogleNodeText: PropTypes.func.isRequired,
  toogleHideNodeText: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const showNodeLabel = selectShowNodeLabel(state);
  const showLinkLabel = selectShowLinkLabel(state);
  const showNodeText = selectShowNodeText(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  return { showNodeLabel, showLinkLabel, showNodeText, autoHideNodeText };
};

const actions = {
  toogleNodeLabel: settingAction.toogleNodeLabel,
  toogleLinkLabel: settingAction.toogleLinkLabel,
  toogleNodeText: settingAction.toogleNodeText,
  toogleHideNodeText: settingAction.toogleAutoHideNodeText,
};

export default connect(
  mapStateToProps,
  actions,
)(SettingSection);
