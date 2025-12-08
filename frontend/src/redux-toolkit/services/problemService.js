import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../lib/constants";

export const problemApi = createApi({
  reducerPath: "problemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Problem"],

  endpoints: (builder) => ({
    createNewProblem: builder.mutation({
      query: (newProblemData) => ({
        url: "/problems/create-problem",
        method: "POST",
        body: newProblemData,
      }),
      providesTags: ["Problem"],
    }),

    getAllProblems: builder.query({
      query: ({ page, limit, search, difficulty, tags, solved, userId }) => ({
        url: "/problems/get-all-problems",
        method: "GET",
        params: {
          page,
          limit,
          search,
          difficulty,
          tags,
          solved,
          userId,
        },
      }),
    }),

    getProblemById: builder.query({
      query: (id) => ({
        url: `/problems/get-problem/${id}`,
      }),
      providesTags: ["Problem"],
    }),
    getAllProblemSolvedByAuthUser: builder.query({
      query: (id) => ({
        url: `/problems/get-solved-problems`,
      }),
      providesTags: ["Problem"],
    }),
  }),
});

export const {
  useCreateNewProblemMutation,
  useGetAllProblemsQuery,
  useGetProblemByIdQuery,
} = problemApi;
