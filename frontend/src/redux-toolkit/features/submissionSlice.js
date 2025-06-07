

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allSubmissions: [],
    submission:null,
    submissionCount:null
}

export const submissionSlice = createSlice({
    name: 'submission',
    initialState,
    reducers: {
        setAllSubmissions: (state, action) => {
            state.allSubmissions = action.payload;
        },
        setSubmission:(state,action)=>{
            state.submission = action.payload
        },
         setSubmissionCount:(state,action)=>{
            state.submission = action.payload
        },
    },
})


export const { 
    setAllSubmissions,setSubmission,setSubmissionCount

} = submissionSlice.actions

export default submissionSlice.reducer