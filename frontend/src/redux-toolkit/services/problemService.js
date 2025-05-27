
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASEURL } from '../../lib/constants'


export const problemApi = createApi({
    reducerPath: "problemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
          }
    }),
    tagTypes: ['Problem'],

    endpoints: (builder) => ({
        createNewProblem: builder.mutation({
            query: (newProblemData) => ({
                url: '/problems/create-problem',
                method: "POST",
                body: newProblemData
            }),
            invalidatesTags: ['Problem']

        }),

        getAllProblems: builder.query({
            query:()=>({
                url: "/problems//get-all-problems"
            }),
            invalidatesTags: ['Problem']

        }),
      
    }),
})


export const { useCreateNewProblemMutation, useGetAllProblemsQuery } = problemApi