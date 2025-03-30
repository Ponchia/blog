import { useEffect, useState } from 'react';

// Theme toggle component with a simple switch UI
export default function ThemeToggle() {
  // Initialize with a placeholder - actual theme determined in useEffect
  const [theme, setTheme] = useState('dark');

  // Set initial theme based on localStorage or system preference
  useEffect(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm9.95-2.05a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM4.05 6.636a1 1 0 0 1 0 1.414L2.636 9.464a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zm2.586 11.314a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM21 12a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM6 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm15-5.364a1 1 0 0 1-1.414 0l-1.414-1.414a1 1 0 1 1 1.414-1.414l1.414 1.414a1 1 0 0 1 0 1.414zM19.95 17.364a1 1 0 0 1-1.414 0l-1.414-1.414a1 1 0 1 1 1.414-1.414l1.414 1.414a1 1 0 0 1 0 1.414zM12 18a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" 
            fill="currentColor" 
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M12.098 20.998C17.072 20.998 21.098 16.972 21.098 11.998C21.098 10.334 20.662 8.773 19.898 7.42C19.248 9.546 17.262 11.097 14.9 11.097C11.684 11.097 9.083 8.495 9.083 5.28C9.083 3.836 9.622 2.523 10.51 1.536C7.259 2.178 4.83 4.872 4.5 8.21C4.262 10.712 5.071 13.205 6.734 15.053C8.397 16.902 10.773 17.96 13.292 17.998C14.04 18.012 14.786 17.939 15.515 17.782C14.379 19.72 12.339 20.998 10 20.998C8.503 20.998 7.113 20.514 5.967 19.682C7.814 20.532 9.9 20.998 12.098 20.998Z" 
            fill="currentColor" 
          />
        </svg>
      )}
    </button>
  );
}

export const isThemeToggleEnabled = true; 