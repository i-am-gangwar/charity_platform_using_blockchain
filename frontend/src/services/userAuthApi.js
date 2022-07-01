import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user/' }),

  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: 'register',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, id, token }) => {
        return {
          url: `/reset-password/${id}/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),

    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: `loggeduser`,
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),

    changeUserPassword: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: 'changepassword',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    registerblogUser: builder.mutation({
      query: (user) => {
        return {
          url: 'createblog',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),



    // getting user projects data 

    getLoggedUserProjects: builder.query({
      query: (token) => {
        return {
          url: `userprojects`,
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,

          }
        }
      }
    }),

    getAllUserProjects: builder.query({
      query: (token) => {
        return {
          url: `allblogs`,
          method: 'GET',

          headers: {
            'authorization': `Bearer ${token}`,

          }
        }
      }
    }),
    totalfundraised: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: 'totalfundraised',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    alltxns: builder.mutation({
      query: (user) => {
        return {
          url: 'alltxn',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getAlltxnsinfo: builder.query({
      query: (token) => {
        return {
          url: `alltxnsinfo`,
          method: 'GET',

          headers: {
            'authorization': `Bearer ${token}`,

          }
        }
      }
    }),

  }),

})

export const { useRegisterUserMutation, useLoginUserMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation, useGetLoggedUserQuery,
  useChangeUserPasswordMutation, useRegisterblogUserMutation, useGetLoggedUserProjectsQuery, useGetAllUserProjectsQuery, useTotalfundraisedMutation,
  useAlltxnsMutation, useGetAlltxnsinfoQuery } = userAuthApi