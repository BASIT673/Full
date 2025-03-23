// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/auth' }),
//     endpoints: (builder) => ({
//         register: builder.mutation({
//             query: (user) => ({
//                 url: '/register',
//                 method: 'POST',
//                 body: user,
//             }),
//         }),
//         login: builder.mutation({
//             query: (credentials) => ({
//                 url: '/login',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),
//     }),
// });

// export const { useRegisterMutation, useLoginMutation } = authApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }),
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     register: builder.mutation({
//       query: (user) => ({
//         url: "/register",
//         method: "POST",
//         body: user,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useRegisterMutation } = authApi;

import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    getUserProfile: builder.query({
      query: () => '/profile'
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'PATCH',
        body: profileData
      })
    })
  })
});

export const { 
  useRegisterMutation, 
  useLoginMutation, 
  useGetUserProfileQuery,
  useUpdateProfileMutation 
} = authApi;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;