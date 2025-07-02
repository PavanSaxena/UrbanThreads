import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

// Theme reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDark: !state.isDark
      };
    case 'SET_THEME':
      return {
        ...state,
        isDark: action.payload
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isDark: false
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch({
        type: 'SET_THEME',
        payload: savedTheme === 'dark'
      });
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch({
        type: 'SET_THEME',
        payload: prefersDark
      });
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    if (state.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDark]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (isDark) => {
    dispatch({
      type: 'SET_THEME',
      payload: isDark
    });
  };

  const value = {
    ...state,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};