import React, { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

/**
 * Comments component that integrates Giscus and adapts to the site's theme
 * 
 * This component:
 * 1. Detects the current theme from the DOM (dark/light)
 * 2. Sets the appropriate Giscus theme to match
 * 3. Watches for theme changes and updates comments theme accordingly
 */
export default function Comments() {
  // Initialize with a theme state
  const [currentTheme, setCurrentTheme] = useState('dark');
  
  useEffect(() => {
    // Get initial theme from DOM
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setCurrentTheme(initialTheme);
    
    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
          setCurrentTheme(newTheme);
        }
      });
    });
    
    // Start observing theme changes on the document element
    observer.observe(document.documentElement, { attributes: true });
    
    // Clean up observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Map site theme to giscus theme
  const giscusTheme = currentTheme === 'light' ? 'light' : 'dark_dimmed';
  
  return (
    <div className="comments-wrapper">
      <h2>Comments</h2>
      <Giscus
        id="comments"
        repo="Ponchia/blog"
        repoId="R_kgDOORDwSQ"
        category="Blog Post Comments"
        categoryId="DIC_kwDOORDwSc4ComQN"
        mapping="url"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={giscusTheme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}