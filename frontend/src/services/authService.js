import api from './api';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
    login: async (username, password) => {
        const loginData = {
            username: username,
            password: password
        };
        const response = await api.post(API_ENDPOINTS.LOGIN, loginData);
        return response.data === "Login successful!";
    },

    register: async (userData) => {
        const response = await api.post(API_ENDPOINTS.REGISTER, userData);
        return response.data;
    },

    logout: async () => {
        const response = await api.post(API_ENDPOINTS.LOGOUT, {});
        return response.data;
    },

    checkSession: async () => {
        const response = await api.get('/api/auth/session');
        return response.data.message === "User is logged in!";
    },

    getCurrentUser: async () => {
        const response = await api.get('/api/auth/session');
        return response.data.user;
    },

    updateProfile: async (userData) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_PROFILE, userData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put(API_ENDPOINTS.UPDATE_PASSWORD, passwordData);
        return response.data;
    }
}; 