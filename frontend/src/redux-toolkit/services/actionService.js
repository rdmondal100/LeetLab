
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASEURL } from '../../lib/constants'


export const actionApi = createApi({
    reducerPath: "actionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
          }
    }),
    tagTypes: ['Action'],

    endpoints: (builder) => ({
        deleteProblemById: builder.mutation({
            query: (id) => ({
                url: `/problems/delete-problem/${id}`,
                method: "POST",
                credentials: 'include', 
            }),
            invalidatesTags: ['Action']

        }),

        editProblemById: builder.mutation({
            query:(id)=>({
                url: `/problems/update-problem/${id}`,
                credentials: 'include', 
            }),
            invalidatesTags: ['Action'],

        }),
      
    }),
})


export const { useDeleteProblemByIdMutation, useEditProblemByIdMutation  } = actionApi