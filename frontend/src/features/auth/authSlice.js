import { createSlice } from '@reduxjs/toolkit';

// Safely load user and token from localStorage
let user = null;
let token = null;

try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user = JSON.parse(storedUser); // Parse only if valid
    }
    token = localStorage.getItem('token'); // token is a simple string
} catch (error) {
    console.error("Error parsing user from localStorage:", error);
}

const initialState = {
    user: user || null, // Fallback to null if no valid data
    token: token || null, // Fallback to null if no token
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

            // Clear from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

// Selectors to get user and token from the state
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
