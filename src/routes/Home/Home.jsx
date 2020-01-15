import React from 'react';
// Components
import LoadingIndicator from '../../components/LoadingIndicator';
import WindowSizeListener from '../../components/WindowSizeListener';
import GraphFileSection from './GraphFileSection';
import GraphSection from './GraphSection';
import ColoringByProperty from './ColoringByProperty';
// Styles
import styles from './styles.scss';

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
                <ColoringByProperty />
              </div>
              <div className={styles.rightPanelContainer}>
                <GraphSection width={graphWidth} height={windowHeight} />
              </div>
            </>
          );
        }}
      </WindowSizeListener>
    </div>
  );
};

export default Home;
