
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASEURL } from '../../lib/constants'


export const submissionApi = createApi({
    reducerPath: "submissionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
        }
    }),
    tagTypes: ['Submission'],

    endpoints: (builder) => ({

        getAllSubmissions: builder.query({
            query: () => ({
                url: "/submission/get-all-submissions"
            }),
            invalidatesTags: ['Submission']

        }),
       getSubmission: builder.query({
            query: (id) => ({
                url: `/submission/get-submission/${id}`
            }),
            invalidatesTags: ['Submission']

        }),
         getSubmissionCount: builder.query({
            query: (id) => ({
                url: `/submission/get-submissions-count/${id}`
            }),
            invalidatesTags: ['Submission']

        }),
    }),
})


export const { useGetAllSubmissionsQuery,useGetSubmissionCountQuery,useGetSubmissionQuery } = submissionApi