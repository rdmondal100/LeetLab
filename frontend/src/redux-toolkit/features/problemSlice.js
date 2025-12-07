

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProblems: [],
    currentProblem: null,
    allSolvedProblems:[],
    activeTab: "description",

}

export const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        setAllProblems: (state, action) => {
            state.allProblems = action.payload;
        },
        setCurrentProblem: (state, action) => {
            state.currentProblem = action.payload;
        },
        setAllSolvedProblems: (state, action) => {
            state.allSolvedProblems = action.payload;
        },
        setActiveTab:(state,action)=>{
            state.activeTab = action.payload
        }
    },
})


export const { 
    setAllProblems,
    setCurrentProblem,
    setAllSolvedProblems,
    setActiveTab

} = problemSlice.actions

export default problemSlice.reducer