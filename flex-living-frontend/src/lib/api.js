import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://flex-living-hmhm.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor (add auth tokens here if needed)
api.interceptors.request.use(
    (config) => {
        // You can add authorization headers here
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
        // Server responded with error
        console.error('API Error:', error.response.data);
        } else if (error.request) {
        // Request made but no response
        console.error('Network Error:', error.message);
        } else {
        console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;