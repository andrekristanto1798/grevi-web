import React from 'react';
// Components
import { Accordion } from 'semantic-ui-react';
import LoadingIndicator from '../../components/LoadingIndicator';
import WindowSizeListener from '../../components/WindowSizeListener';
import GraphFileSection from './GraphFileSection';
import GraphSection from './GraphSection';
import ColoringByProperty from './ColoringByProperty';
import GraphTableSection from './GraphTableSection';
import RadiusByProperty from './RadiusByProperty';
import EditNodeModal from '../../components/EditNodeModal';
import DeleteNodeModal from '../../components/DeleteNodeModal';
// Styles
import styles from './styles.scss';

const accordionPanels = [
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

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <LoadingIndicator />
      <WindowSizeListener>
        {({ windowWidth, windowHeight }) => {
          if (!windowWidth && !windowHeight) return null;
          const graphWidth = windowWidth - 600;
          return (
            <>
              <div className={styles.leftPanelContainer}>
                <GraphFileSection />
                <Accordion
                  fluid
                  styled
                  style={{ marginTop: 8 }}
                  panels={accordionPanels}
                  exclusive={false}
                />
              </div>
              <div className={styles.rightPanelContainer}>
                <GraphSection width={graphWidth} height={windowHeight} />
              </div>
              <EditNodeModal />
              <DeleteNodeModal />
            </>
          );
        }}
      </WindowSizeListener>
    </div>
  );
};

export default Home;
