import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const taxRate = 0.1; // 10% tax
  const itemsPrice = totalPrice;
  const taxPrice = itemsPrice * taxRate;
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const totalOrderPrice = itemsPrice + taxPrice + shippingPrice;

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!shippingAddress.address || !shippingAddress.city || 
          !shippingAddress.postalCode || !shippingAddress.country) {
        throw new Error('Please fill in all shipping address fields');
      }

      if (items.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice: totalOrderPrice
      };

      // Create order
      const response = await axios.post('http://localhost:5001/api/orders', orderData);

      if (response.data.success) {
        // Clear cart and redirect to success page
        clearCart();
        navigate(`/order-success/${response.data.data.order._id}`);
      }

    } catch (error) {
      console.error('Order creation error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please Log In
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be logged in to proceed with checkout
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some items to your cart before proceeding to checkout
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Payment Method
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Credit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700 dark:text-gray-300">PayPal</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash-on-delivery"
                      checked={paymentMethod === 'cash-on-delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {loading ? 'Processing...' : `Place Order - $${totalOrderPrice.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.cartId} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (10%)</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-2 flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${totalOrderPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
