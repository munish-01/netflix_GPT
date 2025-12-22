import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
showGptSearch: false
    },
    reducers:{
        // this will show and hide my gpt search view
        toggleGptSearchView:(state)=>{
            state.showGptSearch = !state.showGptSearch
        }
    }
})

export const {toggleGptSearchView} = gptSlice.actions
export default gptSlice.reducer