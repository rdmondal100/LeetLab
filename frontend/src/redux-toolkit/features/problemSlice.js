

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProblems: [],
    problem: null,
    allSolvedProblems:[]
}

export const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        setAllProblems: (state, action) => {
            state.allProblems = action.payload;
        },
        setProblem: (state, action) => {
            state.problem = action.payload;
        },
        setAllSolvedProblems: (state, action) => {
            state.allSolvedProblems = action.payload;
        },
    },
})


export const { 
    setAllProblems,
    setProblem,
    setAllSolvedProblems

} = problemSlice.actions

export default problemSlice.reducer