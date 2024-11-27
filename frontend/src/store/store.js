import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi'; // Check import paths
import { subscriptionApi } from '../features/subscriptions/subscriptionApi'; // Check import paths
import { blogApi } from '../features/blogs/blogApi'; // Check import paths
import authReducer from '../features/auth/authSlice'; // Ensure authReducer is correctly imported

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)  // API middleware for auth
            .concat(subscriptionApi.middleware)  // API middleware for subscription
            .concat(blogApi.middleware),  // API middleware for blog
});
