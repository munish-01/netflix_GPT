import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    // for no user initialState is null
    initialState: null,
    reducers:{
        addUser: (state, action) =>{
            return action.payload
        },
        // user signOut 
        removeUser: (state, action)=>{
            return null
        }
    }
})

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer