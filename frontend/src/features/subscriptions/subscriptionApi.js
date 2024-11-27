import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCurrentToken } from '../auth/authSlice';  // Import the selector to access the token from Redux state

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-web-1h74.onrender.com/api/subscriptions',
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
        activateSubscription: builder.mutation({
            query: () => ({
                url: '/activate',
                method: 'POST',
            }),
        }),
        checkSubscriptionStatus: builder.query({
            query: () => '/status',
        }),
    }),
});

export const {
    useActivateSubscriptionMutation,
    useCheckSubscriptionStatusQuery, // This should be the correct query hook
} = subscriptionApi;
