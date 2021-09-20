import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GENRES } from "../../utils/queries";
import { UPDATE_GENRES, UPDATE_CURRENT_GENRE } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from 'react-redux';
import {ApolloProvider} from '@apollo/react-hooks';

function Genre() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

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
  }, [genreData, loading, dispatch])

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_GENRE,
      currentGenre: id
    });
  };

  return (
    <ApolloProvider>
    <div>
      <h2>Choose a Genre:</h2>
      {genres.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
    </ApolloProvider>
  );
}

export default Genre;