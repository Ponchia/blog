import React, { useEffect, useRef } from 'react';

export default function PyScriptDemo({ code, packages = [] }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Add PyScript CSS
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://pyscript.net/releases/2024.1.1/core.css';
    document.head.appendChild(linkEl);

    // Prepare any packages that need to be pre-loaded
    const packageList = Array.isArray(packages) ? packages : [];
    const packageConfig = packageList.length > 0 ? 
      `<py-config>
        packages = ${JSON.stringify(packageList)}
      </py-config>` : '';
    
    // Add the config for packages if needed
    if (packageConfig) {
      const configEl = document.createElement('div');
      configEl.innerHTML = packageConfig;
      containerRef.current.appendChild(configEl);
    }

    // Add PyScript JS as module
    const scriptEl = document.createElement('script');
    scriptEl.type = 'module';
    scriptEl.src = 'https://pyscript.net/releases/2024.1.1/core.js';
    document.head.appendChild(scriptEl);
    
    // For PyScript 2024.1.1, we don't need to manually load micropip
    // as it should be available through the config
    const pyScriptEl = document.createElement('script');
    pyScriptEl.type = 'py';
    pyScriptEl.textContent = code;
    
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
    
    // Add the script after the loading elements are in place
    containerRef.current.appendChild(pyScriptEl);

    // Cleanup function
    return () => {
      document.head.removeChild(linkEl);
      document.head.removeChild(scriptEl);
      if (containerRef.current) {
        if (containerRef.current.contains(pyScriptEl)) {
          containerRef.current.removeChild(pyScriptEl);
        }
        if (containerRef.current.contains(dialogEl)) {
          containerRef.current.removeChild(dialogEl);
        }
        if (containerRef.current.contains(loadingScriptEl)) {
          containerRef.current.removeChild(loadingScriptEl);
        }
      }
    };
  }, [code, packages]);

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