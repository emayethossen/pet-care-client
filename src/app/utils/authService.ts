// src/services/authService.ts
import api from './api';

// Register user
export const registerUser = async (userData: { email: string; password: string }) => {
    return api.post('/auth/register', userData);
};

// Login user
export const loginUser = async (userData: { email: string; password: string }) => {
    const { data } = await api.post('/auth/login', userData);
    // Store JWT in localStorage
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};

// Get current user
export const getCurrentUser = async () => {
    const { data } = await api.get('/auth/me');
    return data;
};

// Logout user
export const logoutUser = () => {
    localStorage.removeItem('token');
};
