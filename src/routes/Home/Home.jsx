import React from 'react';
// Components
import LoadingIndicator from '../../components/LoadingIndicator';
import WindowSizeListener from '../../components/WindowSizeListener';
import GraphFileSection from './GraphFileSection';
// Styles
import styles from './styles.scss';
import GraphSection from './GraphSection';

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
