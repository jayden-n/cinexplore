import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './DetailsBanner.styles.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import Img from '../../../components/lazyLoadImage/Img.jsx';
import PosterFallback from '../../../assets/no-poster.png';
import { PlayBtn } from '../PlayBtn';

const DetailsBanner = ({ video, crew }) => {
  // retrieves route parameter (useParams)
  const { mediaType, id } = useParams();

  // Choose mediaType vs endPoint from carousel
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres.map((g) => g.id);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <Fragment>
              <div className="backdrop-img">
                {/* Add backdrop image */}
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        src={url.backdrop + data.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      // cannot find
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    {/* Movie title & released time (YYYY) */}
                    <div className="title">{`${
                      data.name || data.title
                    } (${dayjs(data.release_date).format('YYYY')})`}</div>

                    {/* short movie desc & genres */}
                    <div className="subTitle">{data.tagline}</div>
                    <Genres data={_genres} />

                    {/* Movie rating points & play movie button */}
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div className="playbtn">
                        <PlayBtn />
                        <span className="text">Watch Trailer!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
