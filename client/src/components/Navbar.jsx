import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, User, LogOut, Menu, ShoppingCart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toggleCart, itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">UrbanThreads</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;