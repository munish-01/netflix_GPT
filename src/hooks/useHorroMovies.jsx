import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addHorrorMovies } from '../utils/moviesSlice';
import { API_OPTIONS } from '../utils/constants';

const useHorroMovies = () => {
  const dispatch = useDispatch();

  const horrorMovies = useSelector((store) => store.movies.trendingMovies);

  const getHorrorMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&sort_by=popularity.desc&include_adult=false&page=1",
      API_OPTIONS
    );

    const json = await data.json()
    dispatch(addHorrorMovies(json.results))
  };

  useEffect(() => {
    !horrorMovies && getHorrorMovies();
  }, []);
}

export default useHorroMovies
