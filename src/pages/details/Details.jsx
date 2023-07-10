import './Details.styles.scss';

// Hooks
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Details = () => {
  // // retrieves route parameter (useParams)
  // const { mediaType, id } = useParams();

  // // Choose mediaType vs endPoint from carousel
  // const { data, loading } = useFetch(`/${mediaType}/${id}`);
  return <div>Details</div>;
};

export default Details;
