import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 h-6 w-6 text-yellow-500 transition-all duration-300 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />

        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 h-6 w-6 text-blue-400 transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isDark ? 'Light mode' : 'Dark mode'}
      </div>
    </button>
  );
};

export default ThemeToggle;
