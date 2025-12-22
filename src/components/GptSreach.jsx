import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import bg_logo from "../assets/bg.jpg";

const GptSreach = () => {
  return (
    <div>
      <div className="fixed inset-0 -z-10">
        <img
          src={bg_logo}
          className="h-full w-full object-cover"
          alt="background"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSreach;
