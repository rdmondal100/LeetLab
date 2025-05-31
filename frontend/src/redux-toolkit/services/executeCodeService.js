
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASEURL } from '../../lib/constants'


export const executeCodeApi = createApi({
    reducerPath: "executeCodeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    tagTypes: ['ExecuteCode'],

    endpoints: (builder) => ({
        runCurrentProblem: builder.mutation({
            query: (newProblemData) => ({
                url: '/execute-code/run-code',
                method: "POST",
                body: currentProblemData
            }),
            invalidatesTags: ['ExecuteCode']

        }),

    }),
})


export const { useRunCurrentProblemMutation,  } = executeCodeApi