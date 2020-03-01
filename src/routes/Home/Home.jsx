import React from 'react';
import PropTypes from 'prop-types';
import { useWindowResize, useThrottledFn } from 'beautiful-react-hooks';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import SplitPane from 'react-split-pane';
// Actions
import * as uiActions from '../../actions/ui.action';
// Components
import { VisualizationTab, DataTab, SettingTab } from './Home.parts';
import LoadingIndicator from '../../components/LoadingIndicator';
import GraphFileSection from './GraphFileSection';
import GraphSection from './GraphSection';
import EditNodeModal from '../../components/EditNodeModal';
import EditLinkModal from '../../components/EditLinkModal';
import DeleteNodeModal from '../../components/DeleteNodeModal';
import DeleteLinkModal from '../../components/DeleteLinkModal';
import GraphStatusInfo from './GraphStatusInfo/GraphStatusInfo';
// Selectors
import { selectTabIndex } from '../../selectors/ui.selector';
// Styles
import styles from './styles.scss';

const tabPanes = [
  {
    menuItem: {
      key: 'vis',
      icon: 'line graph',
      content: 'Visualization',
    },
    render: VisualizationTab,
  },
  {
    menuItem: {
      key: 'data',
      icon: 'database',
      content: 'Data',
    },
    render: DataTab,
  },
  {
    menuItem: {
      key: 'setting',
      icon: 'settings',
      content: 'Setting',
    },
    render: SettingTab,
  },
];

const Home = ({ tabIndex, setTabIndex }) => {
  const [leftPanelWidth, setLeftPanelWidth] = React.useState(600);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  useWindowResize(
    useThrottledFn(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }),
  );
  return (
    <div className={styles.homeContainer}>
      <LoadingIndicator />
      <SplitPane
        split="vertical"
        minSize={600}
        defaultSize={600}
        primary="first"
        onChange={setLeftPanelWidth}
      >
        <div className={styles.leftPanelContainer}>
          <GraphFileSection />
          <Tab
            style={{ width: '100%' }}
            menu={{ secondary: true, pointing: true }}
            panes={tabPanes}
            activeIndex={tabIndex}
            onTabChange={(_, { activeIndex }) => setTabIndex(activeIndex)}
          />
        </div>
        <div className={styles.rightPanelContainer}>
          <GraphStatusInfo className={styles.floatingStatusInfo} />
          <GraphSection width={width - leftPanelWidth} height={height} />
        </div>
      </SplitPane>
      <EditNodeModal />
      <EditLinkModal />
      <DeleteNodeModal />
      <DeleteLinkModal />
    </div>
  );
};

Home.propTypes = {
  // State
  tabIndex: PropTypes.number.isRequired,
  // Actions
  setTabIndex: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const tabIndex = selectTabIndex(state);
  return { tabIndex };
};

const actions = {
  setTabIndex: uiActions.setTabIndex,
};

export default connect(
  mapStateToProps,
  actions,
)(Home);
