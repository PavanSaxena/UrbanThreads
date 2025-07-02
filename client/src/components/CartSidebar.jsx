import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const navigate = useNavigate();
  const { 
    isOpen, 
    closeCart, 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    itemCount, 
    totalPrice 
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Shopping Cart ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add some items to get started!
              </p>
              <button
                onClick={closeCart}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.cartId} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category}
                      </p>
                      {item.size !== 'Default' && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                      {item.color !== 'Default' && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Color: {item.color}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${item.price}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Clear Cart Button */}
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium py-2 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total:
              </span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={closeCart}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;