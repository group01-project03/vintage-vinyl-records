import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import { QUERY_GENRES } from "../../utils/queries";
import { 
  UPDATE_GENRES, 
  UPDATE_CURRENT_GENRE 
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function Genre() {
  const [state, dispatch]=useStoreContext();
  const { genres } = state;
  const { loading, data: genreData } = useQuery(QUERY_GENRES);

  useEffect(() => {
    if (genreData) {
      dispatch({
        type: UPDATE_GENRES,
        genres: genreData.genres
      });
    // store the genre data in IndexedDB
    genreData.genres.forEach(genre => {
      idbPromise('genres', 'put', genre);
    });
    } else if (!loading) {
      // if the user is offline, data can load from IndexedDB
      idbPromise('genres', 'get').then(genres => {
        dispatch({
          type: UPDATE_GENRES,
          genres: genres
        });
      });
    }
  }, [genreData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_GENRE,
      currentGenre: id
    });
  };

  return (
    <div className="genre-title">
      <h2 className="genre">Choose a Genre:</h2>
      <div className="genre-btn-container">
      {genres.map((item) => (
        <button
          className="genre-btn"
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      </div>
    </div>
  );
}

export default Genre;