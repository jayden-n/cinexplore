import './SearchResult.styles.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';

import Spinner from '../../components/spinner/Spinner';
import noResults from '../../assets/no-results.png';
import MovieCard from '../../components/movieCard/MovieCard';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  // next page scroll
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.result) {
          setData({
            ...data,
            result: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? 'results' : 'result'
                } of '${query}'`}
              </div>

              {/* Infinite Scroll */}
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  {
                    if (item.mediaType === 'person') return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    );
                  }
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">
              Sorry, there is no result for &apos;{query}&apos;
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
