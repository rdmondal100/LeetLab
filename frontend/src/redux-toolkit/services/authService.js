
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
            }),
            invalidatesTags: ['Auth']

        }),

        getAuthUser: builder.query({
            query:()=>({
                url: "/auth/check"
            }),
            invalidatesTags: ['Auth']

        }),
        loginUser: builder.mutation({
            query: (userData)=>({
                url: '/auth/login',
                method: "POST",
                body: userData
            }),
            invalidatesTags: ['Auth']

        }),
        logoutUser: builder.mutation({
            query: ()=>({
                url: '/auth/logout',
                method: "POST"
            }),
            invalidatesTags: ['Auth']

        })
    }),
})


export const { useRegisterNewUserMutation , useGetAuthUserQuery, useLoginUserMutation , useLogoutUserMutation } = authApi