import './Details.styles.scss';

// Hooks
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

// Components
import DetailsBanner from './detailsBanner/DetailsBanner';

const Details = () => {
  return (
    <div>
      <DetailsBanner />
    </div>
  );
};

export default Details;
