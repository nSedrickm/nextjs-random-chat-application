import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://random-word-api.herokuapp.com",
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<Array<string>, void>({
      query: () => ({
        url: `/word`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSendMessageMutation } = API;
