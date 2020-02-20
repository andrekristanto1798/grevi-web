import React from 'react';
import { useWindowResize, useThrottledFn } from 'beautiful-react-hooks';
// Components
import { Tab } from 'semantic-ui-react';
import SplitPane from 'react-split-pane';
import { VisualizationTab, DataTab, SettingTab } from './Home.parts';
import LoadingIndicator from '../../components/LoadingIndicator';
import GraphFileSection from './GraphFileSection';
import GraphSection from './GraphSection';
import EditNodeModal from '../../components/EditNodeModal';
import EditLinkModal from '../../components/EditLinkModal';
import DeleteNodeModal from '../../components/DeleteNodeModal';
import DeleteLinkModal from '../../components/DeleteLinkModal';
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

const Home = () => {
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
          />
        </div>
        <div className={styles.rightPanelContainer}>
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

export default Home;
