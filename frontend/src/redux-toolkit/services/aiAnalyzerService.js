import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "../../lib/constants";

export const aiAnalyzerApi = createApi({
  reducerPath: "aiAnalyzerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["aiAnalyzerApi"],

  endpoints: (builder) => ({
    aiAnalysisData: builder.mutation({
      query: ({
        currentProblemDescription,
        currentProblemExamples,
        userCode,
      }) => ({
        url: "/ai-agent/code-analyzer",
        method: "POST",
        body: { currentProblemDescription, currentProblemExamples, userCode },
      }),
      providesTags: ["aiAnalyzerApi"],
    }),
  }),
});

export const { useAiAnalysisDataMutation } = aiAnalyzerApi;
