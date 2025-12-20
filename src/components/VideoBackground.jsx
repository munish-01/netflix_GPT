import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  // fetch trailer video
  useMovieTrailer(movieId);

  return (
    <div className=" inset-0 -z-10 overflow-hidden">
      <iframe
        className="w-full h-full aspect-video scale-125"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1&controls=0&showinfo=0&rel=0" +
          "&loop=1&playlist=" +
          trailerVideo?.key +
          "&modestbranding=1&iv_load_policy=3"
        }
        title="YouTube video player"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
};

export default VideoBackground;
