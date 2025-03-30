import React, { useEffect, useRef } from 'react';

export default function PyScriptDemo({ code }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Add PyScript CSS
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://pyscript.net/releases/2024.1.1/core.css';
    document.head.appendChild(linkEl);

    // Add PyScript JS as module
    const scriptEl = document.createElement('script');
    scriptEl.type = 'module';
    scriptEl.src = 'https://pyscript.net/releases/2024.1.1/core.js';
    document.head.appendChild(scriptEl);
    
    // Create Python script element
    const pyScriptEl = document.createElement('script');
    pyScriptEl.type = 'py';
    pyScriptEl.textContent = code;
    containerRef.current.appendChild(pyScriptEl);
    
    // Add loading dialog
    const dialogEl = document.createElement('dialog');
    dialogEl.id = `loading-${Math.random().toString(36).substring(7)}`;
    dialogEl.innerHTML = '<h3>Loading Python...</h3>';
    containerRef.current.appendChild(dialogEl);
    
    // Add loading script
    const loadingScriptEl = document.createElement('script');
    loadingScriptEl.type = 'module';
    loadingScriptEl.textContent = `
      const loading = document.getElementById('${dialogEl.id}');
      loading.showModal();
      addEventListener('py:ready', () => loading.close());
    `;
    containerRef.current.appendChild(loadingScriptEl);

    // Cleanup function
    return () => {
      document.head.removeChild(linkEl);
      document.head.removeChild(scriptEl);
      if (containerRef.current) {
        containerRef.current.removeChild(pyScriptEl);
        containerRef.current.removeChild(dialogEl);
        containerRef.current.removeChild(loadingScriptEl);
      }
    };
  }, [code]);

  return (
    <div 
      ref={containerRef}
      className="pyscript-demo" 
      style={{
        margin: '1.5rem 0',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '0.5rem',
        backgroundColor: '#f8f9fa'
      }}
    >
      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Python Output:</div>
      <section className="pyscript"></section>
    </div>
  );
} 