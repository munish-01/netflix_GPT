import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    // for no user initialState is null
    initialState: {
        // empty object
        nowPlayingMovies: null,
        trailerVideo: null,
    },
    reducers:{
        addNowPlayingMovies: (state, action) =>{
            state.nowPlayingMovies = action.payload
        }, 
        addtrailerVideo: (state, action)=>{
            state.trailerVideo = action.payload
        }
    }
})

export const {addNowPlayingMovies, addtrailerVideo} = movieSlice.actions
export default movieSlice.reducer