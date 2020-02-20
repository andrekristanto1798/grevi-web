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
  selectShowLinkDirection,
  selectAutoHideNodeText,
  selectGraphOrientation,
  selectNodeTextKey,
  selectFocusOnDoubleClick,
  selectHighlightOnRowHover,
} from '../../../selectors/setting.selector';
import { selectNodeKeys } from '../../../selectors/graph.selector';
// Utils
import { toOption } from '../../../utils/objects';

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
  // graph
  showNodeLabel,
  showLinkLabel,
  showNodeText,
  showLinkDirection,
  nodeTextKey,
  nodeKeys,
  autoHideNodeText,
  orientation,
  toogleNodeLabel,
  toogleLinkLabel,
  toogleNodeText,
  toogleLinkDirection,
  toogleHideNodeText,
  changeGraphOrientation,
  changeNodeTextKey,
  // node table
  focusOnDoubleClick,
  highlightOnRowHover,
  toogleFocusOnDoubleClick,
  toogleHighlightOnRowHover,
}) {
  const handleChangeNodeTextKey = React.useCallback(
    (_, { value }) => {
      changeNodeTextKey(value);
    },
    [changeNodeTextKey],
  );
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
          label="Graph - show Node popup details on hover"
          checked={showNodeLabel}
          onChange={() => toogleNodeLabel(showNodeLabel)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Graph - show Link popup details on hover"
          checked={showLinkLabel}
          onChange={() => toogleLinkLabel(showLinkLabel)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label={(
            <label htmlFor="showNodeId">
              Graph - show {'Node'}&nbsp;
              <Dropdown
                inline
                value={nodeTextKey}
                options={nodeKeys.map(toOption)}
                onChange={handleChangeNodeTextKey}
              />
              on the graph
            </label>
          )}
          checked={showNodeText}
          onChange={() => toogleNodeText(showNodeText)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Graph - show Link directionality on the graph"
          checked={showLinkDirection}
          onChange={() => toogleLinkDirection(showLinkDirection)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Graph - automatically hide text on zoomed out"
          checked={autoHideNodeText}
          onChange={() => toogleHideNodeText(autoHideNodeText)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Table - automatically focus on row double click"
          checked={focusOnDoubleClick}
          onChange={() => toogleFocusOnDoubleClick(focusOnDoubleClick)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Table - automatically highlight on row hover"
          checked={highlightOnRowHover}
          onChange={() => toogleHighlightOnRowHover(highlightOnRowHover)}
        />
      </Form.Field>
    </Form>
  );
}

SettingSection.propTypes = {
  // Graph Setting state
  showNodeLabel: PropTypes.bool.isRequired,
  showLinkLabel: PropTypes.bool.isRequired,
  showNodeText: PropTypes.bool.isRequired,
  showLinkDirection: PropTypes.bool.isRequired,
  nodeTextKey: PropTypes.string.isRequired,
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoHideNodeText: PropTypes.bool.isRequired,
  orientation: PropTypes.string,
  // Graph Setting actions
  toogleNodeLabel: PropTypes.func.isRequired,
  toogleLinkLabel: PropTypes.func.isRequired,
  toogleNodeText: PropTypes.func.isRequired,
  toogleLinkDirection: PropTypes.func.isRequired,
  toogleHideNodeText: PropTypes.func.isRequired,
  changeGraphOrientation: PropTypes.func.isRequired,
  changeNodeTextKey: PropTypes.func.isRequired,
  // Node Table state
  focusOnDoubleClick: PropTypes.bool.isRequired,
  highlightOnRowHover: PropTypes.bool.isRequired,
  // Node Table actions
  toogleFocusOnDoubleClick: PropTypes.func.isRequired,
  toogleHighlightOnRowHover: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  // Graph
  const showNodeLabel = selectShowNodeLabel(state);
  const showLinkLabel = selectShowLinkLabel(state);
  const showNodeText = selectShowNodeText(state);
  const showLinkDirection = selectShowLinkDirection(state);
  const nodeTextKey = selectNodeTextKey(state);
  const nodeKeys = selectNodeKeys(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  const orientation = selectGraphOrientation(state);
  // Node Table
  const focusOnDoubleClick = selectFocusOnDoubleClick(state);
  const highlightOnRowHover = selectHighlightOnRowHover(state);
  return {
    showNodeLabel,
    showLinkLabel,
    showNodeText,
    showLinkDirection,
    nodeTextKey,
    nodeKeys,
    autoHideNodeText,
    orientation,
    focusOnDoubleClick,
    highlightOnRowHover,
  };
};

const actions = {
  // Graph
  toogleNodeLabel: settingAction.toogleNodeLabel,
  toogleLinkLabel: settingAction.toogleLinkLabel,
  toogleNodeText: settingAction.toogleNodeText,
  toogleLinkDirection: settingAction.toogleLinkDirection,
  toogleHideNodeText: settingAction.toogleAutoHideNodeText,
  changeGraphOrientation: settingAction.changeGraphOrientation,
  changeNodeTextKey: settingAction.changeNodeTextKey,
  // Node Table
  toogleFocusOnDoubleClick: settingAction.toogleFocusOnDoubleClick,
  toogleHighlightOnRowHover: settingAction.toogleHighlightOnRowHover,
};

export default connect(
  mapStateToProps,
  actions,
)(SettingSection);
