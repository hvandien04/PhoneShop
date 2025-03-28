import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load cart from server when component mounts and user is logged in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const response = await api.get(API_ENDPOINTS.GET_CART);
          setCartItems(response.data);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        setCartItems([]);
      }
      setIsLoading(false);
    };

    loadCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    try {
      if (!user) {
        throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');
      }

      const response = await api.post(API_ENDPOINTS.ADD_TO_CART, {
        productId: product.id,
        quantity: quantity
      });

      setCartItems(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (!user) {
        throw new Error('Vui lòng đăng nhập để cập nhật giỏ hàng');
      }

      const response = await api.put(API_ENDPOINTS.UPDATE_CART, {
        productId,
        quantity
      });

      setCartItems(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (!user) {
        throw new Error('Vui lòng đăng nhập để xóa khỏi giỏ hàng');
      }

      const response = await api.delete(`${API_ENDPOINTS.REMOVE_FROM_CART}/${productId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (!user) {
        throw new Error('Vui lòng đăng nhập để xóa giỏ hàng');
      }

      await api.delete(API_ENDPOINTS.CLEAR_CART);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 