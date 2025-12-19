import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addtrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);

    const filteredTrailer = json.results.filter(
      (video) => video.type === "Trailer"
    );
    // agar to data filter hone ke baad present hai ...nahi to jo results pe 1st pda hai utha ke dede
    const trailer = filteredTrailer.lenght
      ? filteredTrailer[0]
      : json.results[0];
    // contains only youtube video keys
    // console.log(trailer);
    dispatch(addtrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
  return <div></div>;
};

export default useMovieTrailer;
