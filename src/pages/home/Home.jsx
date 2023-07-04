import React from 'react';
import './Home.styles.scss';
import HeroBanner from './heroBanner/HeroBanner';

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner />
    </div>
  );
};

export default Home;
