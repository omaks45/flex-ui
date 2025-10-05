import axios from 'axios';

    // Create axios instance with base configuration
    const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://flex-living-hmhm.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
    });

    // Request interceptor
    api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
    );

    // Response interceptor
    api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
        console.error('API Error Response:', {
            status: error.response.status,
            url: error.config.url,
            method: error.config.method,
            data: error.response.data,
        });
        } else if (error.request) {
        console.error('Network Error:', error.message);
        } else {
        console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;