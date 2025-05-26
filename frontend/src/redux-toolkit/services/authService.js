
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASEURL } from '../../lib/constants'


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json')
            return headers
          }
    }),
    tagTypes: ['Auth'],

    endpoints: (builder) => ({
        registerNewUser: builder.mutation({
            query: (newUser) => ({
                url: '/auth/register',
                method: "POST",
                body: newUser
            })
        }),

        getAuthUser: builder.query({
            query:()=>({
                url: "/auth/check"
            })
        }),
        loginUser: builder.mutation({
            query: (userData)=>({
                url: '/auth/login',
                method: "POST",
                body: userData
            })
        })
    }),
    invalidatesTags: ['Auth']
})


export const { useRegisterNewUserMutation , useGetAuthUserQuery, useLoginUserMutation } = authApi