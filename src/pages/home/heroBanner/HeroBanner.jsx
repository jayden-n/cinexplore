import React, { useState, useEffect } from 'react';
// hooks
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// styles
import './HeroBanner.styles.scss';

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
  // Set background img
  const [background, setBackground] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch('/movie/upcoming');

  // Setting "random" bg images
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

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
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      {/* Separated layer */}
      <div className="opacity-layer"></div>

      {/* Content starts here */}
      <ContentWrapper>
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
        </div>{' '}
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
