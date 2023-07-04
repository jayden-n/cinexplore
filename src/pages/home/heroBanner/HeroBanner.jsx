import React, { useState } from 'react';
import './HeroBanner.styles.scss';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  // Set background img
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Submitting thru Search
  const submitHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandler = (event) => {
    if ((event.key === 'Enter' || event.keyCode === 13) && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="heroBanner">
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and cast crews to discover. Explore
            now!
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={submitHandler}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
