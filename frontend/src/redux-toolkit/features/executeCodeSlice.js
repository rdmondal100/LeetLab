

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     currentCodeRunResult:null
}

export const executeCodeSlice = createSlice({
    name: 'executeCode',
    initialState,
    reducers: {
        setCurrentCodeRunResult: (state, action) => {
            state.currentCodeRunResult = action.payload;
        },
       
    },
})


export const { 
    setCurrentCodeRunResult

} = executeCodeSlice.actions

export default executeCodeSlice.reducer