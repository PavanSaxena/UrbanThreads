import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, ShoppingBag, Heart, Settings, Package, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const menuItems = [
    { icon: User, label: 'Profile', description: 'Manage your personal information' },
    { icon: Package, label: 'Orders', description: 'View your order history' },
    { icon: Heart, label: 'Wishlist', description: 'Items you want to buy later' },
    { icon: CreditCard, label: 'Payment Methods', description: 'Manage your payment options' },
    { icon: Settings, label: 'Settings', description: 'Account preferences' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
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
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-200">
                    <IconComponent className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                      {item.label}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Welcome to UrbanThreads!</p>
                <p className="text-gray-600 text-sm">Your account has been created successfully</p>
              </div>
              <span className="text-gray-500 text-sm">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;