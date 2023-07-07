import { useRef } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import CircleRating from '../circleRating/CircleRating';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';
import './Carousel.styles.scss';

const Carousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {};
  // console.log(carouselContainer.current);

  // Render a skeleton loading item in the carousel
  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton">
          <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation('left')}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation('right')}
        />
        {!loading ? (
          <div className="carouselItems">
            {data?.map((item) => {
              // displaying waiting poster...
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;

              return (
                <div key={item.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    {/* Movie Rating  */}
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                  </div>
                  <div className="textBlock">
                    {/* Retrieving movie names */}
                    <span className="title">{item.title || item.name}</span>
                    {/* Retrieving release date leveraging day.js */}
                    <span className="date">
                      {dayjs(item.release_Date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {/* Trick: Fill up the carousel space continuously */}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
