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
          
          if (response.data && response.data.cartItems) {
            setCartItems(response.data.cartItems);
          } else {
            console.log('No items in cart response');
            setCartItems([]);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
          setCartItems([]);
        }
      } else {
        console.log('No user logged in, clearing cart');
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

      if (!product || !product.id) {
        throw new Error('Dữ liệu sản phẩm không hợp lệ');
      }

      const response = await api.post(API_ENDPOINTS.ADD_TO_CART, {
        productId: product.id,
        quantity: quantity
      });

      // Reload cart after adding item
      const cartResponse = await api.get(API_ENDPOINTS.GET_CART);
      if (cartResponse.data && cartResponse.data.cartItems) {
        setCartItems(cartResponse.data.cartItems);
      }

      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response) {
        throw new Error(error.response.data || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
      }
      throw error;
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      if (!user) {
        throw new Error('Vui lòng đăng nhập để xóa khỏi giỏ hàng');
      }

      const response = await api.delete(`${API_ENDPOINTS.REMOVE_FROM_CART}/${cartItemId}`);

      // Reload cart after removing item
      const cartResponse = await api.get(API_ENDPOINTS.GET_CART);
      if (cartResponse.data && cartResponse.data.cartItems) {
        setCartItems(cartResponse.data.cartItems);
      }

      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      if (error.response) {
        throw new Error(error.response.data || 'Có lỗi xảy ra khi xóa khỏi giỏ hàng');
      }
      throw error;
    }
  };

  const Checkout = async (orderData) => {
    try {
      const response = await api.post(API_ENDPOINTS.CREATE_ORDER,orderData);
      return response;
    } catch (error) {
      console.error('Error in Checkout:', error.response ? error.response.data : error.message);
      throw error;
    }
  };


  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      if (!user) {
        throw new Error('Vui lòng đăng nhập để cập nhật giỏ hàng');
      }
  
      // Tìm sản phẩm trong giỏ hàng
      const cartItem = cartItems.find(item => item.id === cartItemId);
      if (!cartItem) {
        throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');
      }
  
      console.log('Updating cart item:', cartItem);
      console.log('Updating quantity to:', newQuantity); // In ra số lượng mới
  
      // Gửi số lượng mới vào API
      await api.post(API_ENDPOINTS.UPDATE_CART_ITEM_QUANTITY, {
        productId: cartItem.productId,
        quantity: newQuantity, // Sử dụng newQuantity thay vì cartItem.quantity
      });
  
      // Reload cart after updating
      const cartResponse = await api.get(API_ENDPOINTS.GET_CART);
      if (cartResponse.data && cartResponse.data.cartItems) {
        setCartItems(cartResponse.data.cartItems);
      }
  
      return cartResponse.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      if (error.response) {
        throw new Error(error.response.data || 'Có lỗi xảy ra khi cập nhật giỏ hàng');
      }
      throw error;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      Checkout,
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