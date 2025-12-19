import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 px-28 pt-64 text-white bg-linear-to-r from-black/90 via-black/60 to-transparent">
      <h1 className="text-6xl font-bold max-w-2xl">{title}</h1>

      <p className="mt-4 text-sm md:text-lg max-w-md overflow-hidden line-clamp-2 md:line-clamp-3">
        {overview}
      </p>

      <div className="mt-6 flex gap-4">
        <button className="bg-white text-black px-8 py-3 text-lg rounded-md hover:bg-opacity-80">
          ▶︎ Play
        </button>

        <button className="bg-gray-500 text-white px-6 py-3 text-lg rounded-md bg-opacity-50 hover:bg-opacity-25">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
