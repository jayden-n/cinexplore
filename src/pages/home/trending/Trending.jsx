import { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';

const Trending = () => {
  const [endPoint, setEndPoint] = useState('day');

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  const onTabChange = (tab) => {
    setEndPoint(tab === 'Daily' ? 'day' : 'week');
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>

        <SwitchTabs data={['Daily', 'Weekly']} onTabChange={onTabChange} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
