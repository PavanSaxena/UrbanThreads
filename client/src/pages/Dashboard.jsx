import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, Package, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Profile', description: 'Manage your personal information', path: '/profile' },
    { icon: Package, label: 'Orders', description: 'View your order history', path: '/orders' },
    { icon: Heart, label: 'Wishlist', description: 'Items you want to buy later', path: '/wishlist' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage your payment options', path: '/payment-methods' },
    { icon: Settings, label: 'Settings', description: 'Account preferences', path: '/settings' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 transition-colors duration-300">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 dark:bg-indigo-900 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage your account and explore new collections
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.label || index}
                onClick={() => handleMenuClick(item.path)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-200">
                    <IconComponent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {item.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
              <div className="bg-green-100 dark:bg-green-900 w-10 h-10 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">Welcome to UrbanThreads!</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Your account has been created successfully</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;