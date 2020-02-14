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
  selectNodeTextKey,
  selectFocusNodeOnDoubleClick,
  selectHighlightNodeOnRowHover,
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
  nodeTextKey,
  nodeKeys,
  autoHideNodeText,
  orientation,
  toogleNodeLabel,
  toogleLinkLabel,
  toogleNodeText,
  toogleHideNodeText,
  changeGraphOrientation,
  changeNodeTextKey,
  // node table
  focusNodeOnDoubleClick,
  highlightNodeOnRowHover,
  toogleFocusNodeOnDoubleClick,
  toogleHighlightNodeOnRowHover,
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
          label="Graph - automatically hide text on zoomed out"
          checked={autoHideNodeText}
          onChange={() => toogleHideNodeText(autoHideNodeText)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Table - automatically focus Node on row double click"
          checked={focusNodeOnDoubleClick}
          onChange={() => toogleFocusNodeOnDoubleClick(focusNodeOnDoubleClick)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Table - automatically highlight Node on row hover"
          checked={highlightNodeOnRowHover}
          onChange={() =>
            toogleHighlightNodeOnRowHover(highlightNodeOnRowHover)
          }
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
  nodeTextKey: PropTypes.string.isRequired,
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoHideNodeText: PropTypes.bool.isRequired,
  orientation: PropTypes.string,
  // Graph Setting actions
  toogleNodeLabel: PropTypes.func.isRequired,
  toogleLinkLabel: PropTypes.func.isRequired,
  toogleNodeText: PropTypes.func.isRequired,
  toogleHideNodeText: PropTypes.func.isRequired,
  changeGraphOrientation: PropTypes.func.isRequired,
  changeNodeTextKey: PropTypes.func.isRequired,
  // Node Table state
  focusNodeOnDoubleClick: PropTypes.bool.isRequired,
  highlightNodeOnRowHover: PropTypes.bool.isRequired,
  // Node Table actions
  toogleFocusNodeOnDoubleClick: PropTypes.func.isRequired,
  toogleHighlightNodeOnRowHover: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  // Graph
  const showNodeLabel = selectShowNodeLabel(state);
  const showLinkLabel = selectShowLinkLabel(state);
  const showNodeText = selectShowNodeText(state);
  const nodeTextKey = selectNodeTextKey(state);
  const nodeKeys = selectNodeKeys(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  const orientation = selectGraphOrientation(state);
  // Node Table
  const focusNodeOnDoubleClick = selectFocusNodeOnDoubleClick(state);
  const highlightNodeOnRowHover = selectHighlightNodeOnRowHover(state);
  return {
    showNodeLabel,
    showLinkLabel,
    showNodeText,
    nodeTextKey,
    nodeKeys,
    autoHideNodeText,
    orientation,
    focusNodeOnDoubleClick,
    highlightNodeOnRowHover,
  };
};

const actions = {
  // Graph
  toogleNodeLabel: settingAction.toogleNodeLabel,
  toogleLinkLabel: settingAction.toogleLinkLabel,
  toogleNodeText: settingAction.toogleNodeText,
  toogleHideNodeText: settingAction.toogleAutoHideNodeText,
  changeGraphOrientation: settingAction.changeGraphOrientation,
  changeNodeTextKey: settingAction.changeNodeTextKey,
  // Node Table
  toogleFocusNodeOnDoubleClick: settingAction.toogleFocusNodeOnDoubleClick,
  toogleHighlightNodeOnRowHover: settingAction.toogleHighlightNodeOnRowHover,
};

export default connect(
  mapStateToProps,
  actions,
)(SettingSection);
