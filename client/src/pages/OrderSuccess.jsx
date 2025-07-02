import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BillReceipt from '../components/BillReceipt';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data.order);
      }
    } catch (error) {
      console.error('Fetch order error:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'The order you are looking for could not be found.'}
          </p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-green-500 text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="border-b dark:border-gray-700 pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Order Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                <p className="font-medium text-gray-900 dark:text-white">{order._id}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                <p className={`font-medium ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Items Ordered
            </h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
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
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Address
            </h3>
            <div className="text-gray-600 dark:text-gray-400">
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t dark:border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? 'Free' : `$${order.shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-2 flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            What's Next?
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1">
            <li>• You will receive an email confirmation shortly</li>
            <li>• We'll notify you when your order ships</li>
            <li>• Track your order status in your dashboard</li>
            <li>• Expected delivery: 3-7 business days</li>
          </ul>
        </div>

        {/* Bill Receipt */}
        <div className="mb-8">
          <BillReceipt order={order} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
          >
            View My Orders
          </Link>
          <Link
            to="/shop"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors text-center font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
