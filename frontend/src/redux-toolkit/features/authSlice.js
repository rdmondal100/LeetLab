

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authUser: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            console.log(state.authUser)
            state.authUser = action.payload;
            console.log(state.authUser)
        }
    },
})


export const { 
    setAuthUser,

} = authSlice.actions

export default authSlice.reducer