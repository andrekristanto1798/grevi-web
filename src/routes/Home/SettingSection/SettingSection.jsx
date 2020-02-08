import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import { Form, Checkbox, Dropdown } from 'semantic-ui-react';
// Actions
import * as settingAction from '../../../actions/setting.action';
// Selectors
import {
  selectShowNodeLabel,
  selectShowLinkLabel,
  selectShowNodeText,
  selectAutoHideNodeText,
  selectGraphOrientation,
} from '../../../selectors/setting.selector';

const dropdownOptions = [
  { key: 'null', value: null, text: 'Normal' },
  { key: 'td', value: 'td', text: 'Top-Down' },
  { key: 'bu', value: 'bu', text: 'Bottom-Up' },
  { key: 'lr', value: 'lr', text: 'Left-Right' },
  { key: 'rl', value: 'rl', text: 'Right-Left' },
  { key: 'radialout', value: 'radialout', text: 'Radial-Out' },
  { key: 'radialin', value: 'radialin', text: 'Radial-In' },
];

function SettingSection({
  showNodeLabel,
  showLinkLabel,
  showNodeText,
  autoHideNodeText,
  orientation,
  toogleNodeLabel,
  toogleLinkLabel,
  toogleNodeText,
  toogleHideNodeText,
  changeGraphOrientation,
}) {
  return (
    <Form>
      <Form.Field>
        Graph orientation:&nbsp;&nbsp;
        <Dropdown
          inline
          value={orientation}
          text={orientation === null ? 'Normal' : null}
          options={dropdownOptions}
          onChange={(_, { value }) => changeGraphOrientation(value)}
        />
      </Form.Field>
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
  orientation: PropTypes.string,
  // Redux actions
  toogleNodeLabel: PropTypes.func.isRequired,
  toogleLinkLabel: PropTypes.func.isRequired,
  toogleNodeText: PropTypes.func.isRequired,
  toogleHideNodeText: PropTypes.func.isRequired,
  changeGraphOrientation: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const showNodeLabel = selectShowNodeLabel(state);
  const showLinkLabel = selectShowLinkLabel(state);
  const showNodeText = selectShowNodeText(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  const orientation = selectGraphOrientation(state);
  return {
    showNodeLabel,
    showLinkLabel,
    showNodeText,
    autoHideNodeText,
    orientation,
  };
};

const actions = {
  toogleNodeLabel: settingAction.toogleNodeLabel,
  toogleLinkLabel: settingAction.toogleLinkLabel,
  toogleNodeText: settingAction.toogleNodeText,
  toogleHideNodeText: settingAction.toogleAutoHideNodeText,
  changeGraphOrientation: settingAction.changeGraphOrientation,
};

export default connect(
  mapStateToProps,
  actions,
)(SettingSection);
