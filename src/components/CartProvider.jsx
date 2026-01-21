'use client';
import React, { createContext, useContext } from 'react';
import { useCart } from '@/lib/cart';
import Cart from './Cart';

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export default function CartProvider({ children }) {
  const cartMethods = useCart();

  return (
    <CartContext.Provider value={cartMethods}>
      {children}
      <Cart {...cartMethods} />
    </CartContext.Provider>
  );
}