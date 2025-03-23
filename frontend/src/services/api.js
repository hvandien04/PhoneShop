import axios from 'axios';
import { API_URL } from '../config/api';

// Create axios instance with custom config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Cho phép gửi cookie trong mọi request
});

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response); // Debug log
        return response;
    },
    (error) => {
        console.error('API Error:', error.response || error); // Debug log
        if (error.response) {
            // Handle different error status codes
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                // case 403:
                //     // Handle forbidden
                //     window.location.href = '/forbidden';
                //     break;
                case 404:
                    // Handle not found
                    window.location.href = '/not-found';
                    break;
                case 500:
                    // Handle server error
                    console.error('Server error:', error.response.data);
                    break;
                default:
                    console.error('API error:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);

export default api; 