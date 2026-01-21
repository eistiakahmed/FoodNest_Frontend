'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Cart management with localStorage
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodnest_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodnest_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (food, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === food._id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = prevItems.map(item =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success(`Updated ${food.name} quantity in cart`);
        return updatedItems;
      } else {
        // Add new item to cart
        const newItem = {
          ...food,
          quantity,
          addedAt: new Date().toISOString()
        };
        toast.success(`${food.name} added to cart`);
        return [...prevItems, newItem];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (foodId) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item._id !== foodId);
      toast.success('Item removed from cart');
      return updatedItems;
    });
  };

  // Update item quantity
  const updateQuantity = (foodId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(foodId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === foodId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  // Calculate totals
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getSubtotal = () => getTotalPrice();
  const getDeliveryFee = () => getTotalPrice() > 500 ? 0 : 50;
  const getFinalTotal = () => getSubtotal() + getDeliveryFee();

  return {
    cartItems,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    getDeliveryFee,
    getFinalTotal
  };
};