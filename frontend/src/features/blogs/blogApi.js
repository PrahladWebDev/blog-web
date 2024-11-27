import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCurrentToken } from '../auth/authSlice';  // Import the selector to access the token from Redux state

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1000/api/blogs', // Adjust URL to your backend API
        prepareHeaders: (headers, { getState }) => {
            // Get the token from Redux state
            const token = selectCurrentToken(getState());
            if (token) {
                // Add the token to the Authorization header if it exists
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => '/', // Fetch all blogs
        }),
        getBlog: builder.query({
            query: (id) => `/${id}`, // Fetch blog by ID
        }),
        createBlog: builder.mutation({
            query: (newBlog) => ({
                url: '/',
                method: 'POST',
                body: newBlog, // Send new blog data in the request body
            }),
        }),
    }),
});

export const { useGetBlogsQuery, useCreateBlogMutation, useGetBlogQuery } = blogApi;
