import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Components
import { Form, Checkbox, Dropdown, Input } from 'semantic-ui-react';
// Actions
import * as settingAction from '../../../actions/setting.action';
// Selectors
import {
  selectShowNodeLabel,
  selectShowLinkLabel,
  selectShowNodeText,
  selectShowTextOnly,
  selectShowLinkDirection,
  selectAutoHideNodeText,
  selectGraphOrientation,
  selectNodeTextKey,
  selectFocusOnDoubleClick,
  selectHighlightOnRowHover,
  selectForceChargeStrength,
  selectForceLinkDistance,
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

const FORCE_CHARGE_STRENGTH_RANGE = {
  min: -200,
  max: 0,
};

const FORCE_LINK_DISTANCE_RANGE = {
  min: 0,
  max: 120,
};

function SettingSection({
  // graph
  showNodeLabel,
  showLinkLabel,
  showNodeText,
  showTextOnly,
  showLinkDirection,
  nodeTextKey,
  nodeKeys,
  autoHideNodeText,
  orientation,
  forceChargeStrength,
  forceLinkDistance,
  toogleNodeLabel,
  toogleLinkLabel,
  toogleNodeText,
  toogleTextOnly,
  toogleLinkDirection,
  toogleHideNodeText,
  changeGraphOrientation,
  changeNodeTextKey,
  setForceChargeStrength,
  setForceLinkDistance,
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
          label="Graph - show Node text only"
          checked={showTextOnly}
          onChange={() => toogleTextOnly(showTextOnly)}
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
      <Form.Field
        control={Input}
        label={`D3 - Force Charge Strength (Value: ${forceChargeStrength})`}
        type="range"
        step={10}
        value={forceChargeStrength}
        onChange={e => setForceChargeStrength(e.target.value)}
        {...FORCE_CHARGE_STRENGTH_RANGE}
      />
      <Form.Field
        control={Input}
        label={`D3 - Force Link Distance (Value: ${forceLinkDistance})`}
        type="range"
        step={10}
        value={forceLinkDistance}
        onChange={e => setForceLinkDistance(e.target.value)}
        {...FORCE_LINK_DISTANCE_RANGE}
      />
    </Form>
  );
}

SettingSection.propTypes = {
  // Graph Setting state
  showNodeLabel: PropTypes.bool.isRequired,
  showLinkLabel: PropTypes.bool.isRequired,
  showNodeText: PropTypes.bool.isRequired,
  showTextOnly: PropTypes.bool.isRequired,
  showLinkDirection: PropTypes.bool.isRequired,
  nodeTextKey: PropTypes.string.isRequired,
  nodeKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  autoHideNodeText: PropTypes.bool.isRequired,
  orientation: PropTypes.string,
  forceChargeStrength: PropTypes.number.isRequired,
  forceLinkDistance: PropTypes.number.isRequired,
  // Graph Setting actions
  toogleNodeLabel: PropTypes.func.isRequired,
  toogleLinkLabel: PropTypes.func.isRequired,
  toogleNodeText: PropTypes.func.isRequired,
  toogleTextOnly: PropTypes.func.isRequired,
  toogleLinkDirection: PropTypes.func.isRequired,
  toogleHideNodeText: PropTypes.func.isRequired,
  changeGraphOrientation: PropTypes.func.isRequired,
  changeNodeTextKey: PropTypes.func.isRequired,
  setForceChargeStrength: PropTypes.func.isRequired,
  setForceLinkDistance: PropTypes.func.isRequired,
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
  const showTextOnly = selectShowTextOnly(state);
  const showLinkDirection = selectShowLinkDirection(state);
  const nodeTextKey = selectNodeTextKey(state);
  const nodeKeys = selectNodeKeys(state);
  const autoHideNodeText = selectAutoHideNodeText(state);
  const orientation = selectGraphOrientation(state);
  const forceChargeStrength = selectForceChargeStrength(state);
  const forceLinkDistance = selectForceLinkDistance(state);
  // Node Table
  const focusOnDoubleClick = selectFocusOnDoubleClick(state);
  const highlightOnRowHover = selectHighlightOnRowHover(state);
  return {
    showNodeLabel,
    showLinkLabel,
    showNodeText,
    showTextOnly,
    showLinkDirection,
    nodeTextKey,
    nodeKeys,
    autoHideNodeText,
    orientation,
    forceChargeStrength,
    forceLinkDistance,
    focusOnDoubleClick,
    highlightOnRowHover,
  };
};

const actions = {
  // Graph
  toogleNodeLabel: settingAction.toogleNodeLabel,
  toogleLinkLabel: settingAction.toogleLinkLabel,
  toogleNodeText: settingAction.toogleNodeText,
  toogleTextOnly: settingAction.toogleTextOnly,
  toogleLinkDirection: settingAction.toogleLinkDirection,
  toogleHideNodeText: settingAction.toogleAutoHideNodeText,
  changeGraphOrientation: settingAction.changeGraphOrientation,
  changeNodeTextKey: settingAction.changeNodeTextKey,
  setForceChargeStrength: settingAction.setForceChargeStrength,
  setForceLinkDistance: settingAction.setForceLinkDistance,
  // Node Table
  toogleFocusOnDoubleClick: settingAction.toogleFocusOnDoubleClick,
  toogleHighlightOnRowHover: settingAction.toogleHighlightOnRowHover,
};

export default connect(
  mapStateToProps,
  actions,
)(SettingSection);
