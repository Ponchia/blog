import { useEffect, useState } from 'react';

// Theme toggle component with a simple switch UI
export default function ThemeToggle() {
  // Initialize with a placeholder - actual theme determined in useEffect
  const [theme, setTheme] = useState('dark');

  // Set initial theme based on localStorage or system preference
  useEffect(() => {
    // Get theme from DOM as it's already set in Layout.astro
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);
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
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 3V5M12 19V21M5 12H3M21 12H19M18.4 5.6L16.8 7.2M7.2 16.8L5.6 18.4M7.2 7.2L5.6 5.6M16.8 16.8L18.4 18.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z" fill="currentColor"/>
        </svg>
      )}
    </button>
  );
}

export const isThemeToggleEnabled = true; 