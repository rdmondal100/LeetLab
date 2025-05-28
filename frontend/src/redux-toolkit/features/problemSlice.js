

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProblems: null,
}

export const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        setAllProblems: (state, action) => {
            state.allProblems = action.payload;
        }
    },
})


export const { 
    setAllProblems,

} = problemSlice.actions

export default problemSlice.reducer