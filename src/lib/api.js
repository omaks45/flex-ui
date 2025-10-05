import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://flex-living-hmhm.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // Increase to 30 seconds (was 10000)
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
        if (error.code === 'ECONNABORTED') {
        console.error('Request timeout - API took too long to respond');
        } else if (error.response) {
        console.error('API Error:', {
            status: error.response.status,
            url: error.config.url,
            data: error.response.data,
        });
        } else if (error.request) {
        console.error('Network Error - No response received:', error.message);
        } else {
        console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;