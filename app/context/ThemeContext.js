import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';

// Create the context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Manage the current theme state
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme || 'light');
    });

    return () => subscription.remove();
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
