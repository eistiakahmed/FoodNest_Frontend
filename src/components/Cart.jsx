'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaPlus, FaMinus, FaShoppingBag, FaTrash } from 'react-icons/fa';

export default function Cart({ 
  isOpen, 
  setIsOpen, 
  cartItems, 
  updateQuantity, 
  removeFromCart, 
  clearCart,
  getSubtotal,
  getDeliveryFee,
  getFinalTotal 
}) {
  const handleCheckout = () => {
    // Simple checkout simulation
    alert('Checkout functionality would be implemented here!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaShoppingBag className="text-orange-500" />
                Your Cart ({cartItems.length})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <FaShoppingBag className="text-6xl text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mt-2">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex gap-3">
                        {/* Food Image */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Food Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium text-sm truncate">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-xs mt-1">
                            {item.category} • {item.cuisine}
                          </p>
                          
                          {/* Price */}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-orange-500 font-bold text-sm">
                              ₹{item.discountPrice || item.price}
                            </span>
                            {item.discountPrice && (
                              <span className="text-gray-500 line-through text-xs">
                                ₹{item.price}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors self-start"
                        >
                          <FaTrash className="text-red-400 text-xs" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                          >
                            <FaMinus className="text-white text-xs" />
                          </button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-colors"
                          >
                            <FaPlus className="text-white text-xs" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <span className="text-white font-bold">
                          ₹{(item.discountPrice || item.price) * item.quantity}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart Button */}
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Order Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-700 p-6 bg-gray-800">
                {/* Order Summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Delivery Fee</span>
                    <span className={getDeliveryFee() === 0 ? 'text-green-400' : ''}>
                      {getDeliveryFee() === 0 ? 'FREE' : `₹${getDeliveryFee()}`}
                    </span>
                  </div>
                  {getDeliveryFee() === 0 && (
                    <p className="text-green-400 text-xs">
                      🎉 Free delivery on orders above ₹500!
                    </p>
                  )}
                  <div className="flex justify-between text-white font-bold text-lg border-t border-gray-600 pt-2">
                    <span>Total</span>
                    <span>₹{getFinalTotal()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}