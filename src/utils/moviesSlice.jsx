import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  // for no user initialState is null
  initialState: {
    // empty object
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    trendingMovies: null,
    upComingMovies: null,
    horroMovies: null,

  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addHorrorMovies: (state, action) => {
      state.horroMovies = action.payload;
    },
    addtrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addtrailerVideo,
  addPopularMovies,
  addTrendingMovies,
  addUpComingMovies,
  addHorrorMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
