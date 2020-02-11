import React from 'react';
import { useWindowResize, useThrottledFn } from 'beautiful-react-hooks';
// Components
import { Accordion } from 'semantic-ui-react';
import SplitPane from 'react-split-pane';
import LoadingIndicator from '../../components/LoadingIndicator';
import GraphFileSection from './GraphFileSection';
import GraphSection from './GraphSection';
import ColoringByProperty from './ColoringByProperty';
import GraphTableSection from './GraphTableSection';
import RadiusByProperty from './RadiusByProperty';
import SettingSection from './SettingSection';
import EditNodeModal from '../../components/EditNodeModal';
import DeleteNodeModal from '../../components/DeleteNodeModal';
// Styles
import styles from './styles.scss';

const accordionPanels = [
  {
    key: 'setting',
    title: 'Settings',
    content: { content: <SettingSection /> },
  },
  {
    key: 'coloring',
    title: 'Coloring By Property',
    content: { content: <ColoringByProperty /> },
  },
  {
    key: 'radius',
    title: 'Radius By Property',
    content: { content: <RadiusByProperty /> },
  },
  {
    key: 'table',
    title: 'Graph Nodes Table',
    content: { content: <GraphTableSection /> },
  },
];

// defaultActiveIndex ensures that all
// accordionPanels will be opened by default
const defaultActiveIndex = Array(accordionPanels.length)
  .fill(0)
  .map((_, idx) => idx);

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
        defaultSize={600}
        primary="first"
        onChange={setLeftPanelWidth}
      >
        <div className={styles.leftPanelContainer}>
          <GraphFileSection />
          <Accordion
            fluid
            styled
            style={{ marginTop: 8 }}
            panels={accordionPanels}
            defaultActiveIndex={defaultActiveIndex}
            exclusive={false}
          />
        </div>
        <div className={styles.rightPanelContainer}>
          <GraphSection width={width - leftPanelWidth} height={height} />
        </div>
      </SplitPane>
      <EditNodeModal />
      <DeleteNodeModal />
    </div>
  );
};

export default Home;
