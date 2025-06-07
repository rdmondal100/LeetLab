

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentCodeRunData:null,
     currentTestCaseResults:[]
}

export const executeCodeSlice = createSlice({
    name: 'executeCode',
    initialState,
    reducers: {
        setCurrentTestCaseResults: (state, action) => {
            state.currentTestCaseResults = action.payload;
        },
        setCurrentCodeRunData:(state,action) =>{
            state.currentCodeRunData = action.payload
        }
       
    },
})


export const { 
    setCurrentTestCaseResults,setCurrentCodeRunData

} = executeCodeSlice.actions

export default executeCodeSlice.reducer