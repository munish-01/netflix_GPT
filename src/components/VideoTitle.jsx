import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="absolute bottom-20 md:bottom-40 left-4 md:left-12 
                    text-white max-w-xs md:max-w-xl"
    >
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>

      <p className="hidden sm:line-clamp-3 mt-3 text-sm md:text-lg">
        {overview}
      </p>

      <div className="mt-4 flex gap-3">
        <button className="bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded-md font-semibold">
          ▶ Play
        </button>
        <button className="bg-gray-500/60 text-white px-4 md:px-6 py-2 md:py-3 rounded-md">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
