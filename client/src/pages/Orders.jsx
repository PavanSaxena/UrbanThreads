import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/orders/my-orders');
      if (response.data.success) {
        setOrders(response.data.data.orders);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (isPaid, isDelivered) => {
    if (isDelivered) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (isPaid) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
  };

  const getStatusText = (isPaid, isDelivered) => {
    if (isDelivered) return 'Delivered';
    if (isPaid) return 'Paid';
    return 'Pending Payment';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track and manage your order history
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="px-6 py-4 border-b dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">#{order._id.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.isPaid, order.isDelivered)}`}>
                      {getStatusText(order.isPaid, order.isDelivered)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="grid gap-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img
                          src={item.image || '/placeholder-image.jpg'}
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

                {/* Order Actions */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Payment Method: {order.paymentMethod.replace('-', ' ').toUpperCase()}</p>
                    <p>Delivery to: {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <Link
                      to={`/order-success/${order._id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    {!order.isPaid && (
                      <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium">
                        Pay Now
                      </button>
                    )}
                    {order.isPaid && !order.isDelivered && (
                      <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium">
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
