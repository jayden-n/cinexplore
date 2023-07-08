import React from 'react';
import { useSelector } from 'react-redux';

import './Genres.styles.scss';

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((g) => {
        // checks if the corresponding genre name exists in the "genres" object.
        // If not, return nothing (null).
        if (!genres[g]?.name) return;
        return (
          <div key={g} className="genre">
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
