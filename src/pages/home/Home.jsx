import React from 'react';
import styles from './home.module.scss';
import HeroBanner from './heroBanner/HeroBanner';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <HeroBanner />
    </div>
  );
};

export default Home;
