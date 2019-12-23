import React from 'react';
// Components
import WindowSizeListener from '../../components/WindowSizeListener';
import GraphFileSection from './GraphFileSection';
// Styles
import styles from './styles.scss';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <WindowSizeListener>
        {({ windowWidth, windowHeight }) => {
          const graphWidth = windowWidth - 600;
          return (
            <>
              <div className={styles.leftPanelContainer}>
                <GraphFileSection />
              </div>
              <div className={styles.rightPanelContainer}>
                Size: ({graphWidth}, {windowHeight})
              </div>
            </>
          );
        }}
      </WindowSizeListener>
    </div>
  );
};

export default Home;
