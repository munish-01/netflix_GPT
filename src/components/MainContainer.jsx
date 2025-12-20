import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return <div>Loading...</div>;

  const mainMovie = movies[0];

  const { id, original_title, overview } = mainMovie;
  // console.log(mainMovie)
  return (
    <div className="relative w-full aspect-video bg-black">
      <VideoBackground movieId={id} />

      <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent">
        <VideoTitle title={original_title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;
