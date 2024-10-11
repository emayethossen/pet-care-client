// src/utils/api.ts
import axios from 'axios';

// Create an Axios instance with a base URL and default config
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://pet-care-server-three.vercel.app/api', // Backend API URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add JWT token to headers for authenticated requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;
