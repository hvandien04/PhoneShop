export const API_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',

    UPDATE_PASSWORD: '/api/auth/update-password',
    UPDATE_PROFILE: '/api/auth/update-profile',
    
    // Product endpoints
    GET_PRODUCTS: '/api/products',
    GET_PRODUCT_DETAIL: '/api/products/:id',
    
    // Cart endpoints
    GET_CART: '/api/cart/get',
    ADD_TO_CART: '/api/cart/add',
    REMOVE_FROM_CART: '/api/cart/remove',
    UPDATE_CART_ITEM_QUANTITY: '/api/cart/update',
    CREATE_ORDER: '/api/orders/create',

}; 