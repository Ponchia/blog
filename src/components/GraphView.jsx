import { useEffect, useRef, useState } from 'react';
// Remove direct import of ForceGraph2D
// import ForceGraph2D from 'react-force-graph-2d';

// Helper function to get proper path with base URL
function getPath(path) {
  const base = import.meta.env.BASE_URL || '';
  // Ensure base ends with slash if not empty
  const baseWithSlash = base && !base.endsWith('/') ? `${base}/` : base;
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Join base with path
  return `${baseWithSlash}${cleanPath}`;
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Helper function to get CSS variable value
function getCssVar(varName) {
  if (!isBrowser) return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

// Graph visualization component for force-directed graph
export default function GraphView({ graphData }) {
  const [ForceGraph, setForceGraph] = useState(null);
  // Theme color references
  const [themeColors, setThemeColors] = useState({
    text: '#666',
    error: '#e74c3c',
    moc: '#2980b9',
    tag: '#8e44ad',
    evergreen: '#27ae60',
    fleeting: '#e74c3c',
    related: '#8e44ad',
    hasTag: '#d35400'
  });
  
  // Update theme colors when theme changes
  useEffect(() => {
    if (!isBrowser) return;

    const updateThemeColors = () => {
      setThemeColors({
        text: getCssVar('--text-secondary') || '#666',
        error: getCssVar('--accent-dark') || '#e74c3c',
        moc: '#2980b9', // Keep consistent for visual mapping
        tag: '#8e44ad', // Keep consistent for visual mapping
        evergreen: '#27ae60', // Keep consistent for visual mapping
        fleeting: '#e74c3c', // Keep consistent for visual mapping
        related: '#8e44ad', // Keep consistent for visual mapping
        hasTag: '#d35400' // Keep consistent for visual mapping
      });
    };

    // Initial color setup
    updateThemeColors();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateThemeColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);
  
  // Load ForceGraph component dynamically only on client-side
  useEffect(() => {
    if (isBrowser) {
      import('react-force-graph-2d').then(module => {
        setForceGraph(() => module.default);
      }).catch(err => {
        console.error("Failed to load ForceGraph:", err);
        setError("Failed to load graph visualization library.");
      });
    }
  }, []);
  
  console.log("GraphView component rendering with data:", graphData);
  
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const graphRef = useRef();

  // Update dimensions on mount and window resize
  useEffect(() => {
    if (!isBrowser) return;
    
    const updateDimensions = () => {
      const container = containerRef.current;
      if (container && container.parentElement) {
        const { width, height } = container.parentElement.getBoundingClientRect();
        setDimensions({ 
          width: width || 800, 
          height: height || 600 
        });
      }
    };

    // Initial update
    updateDimensions();
    
    // Add event listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // If we have a reference to the graph and valid data, fit it to view
    if (graphRef.current && graphData?.nodes?.length > 0) {
      // Wait a bit for the graph to initialize
      setTimeout(() => {
        graphRef.current.zoomToFit(400, 40);
      }, 500);
    }
  }, [graphData, ForceGraph]);

  // If not in browser environment, render a placeholder
  if (!isBrowser) {
    return <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Graph visualization loading...</div>;
  }
  
  // If ForceGraph hasn't loaded yet
  if (!ForceGraph) {
    return (
      <div ref={containerRef} style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%',
        fontSize: '1.2rem',
        color: themeColors.text
      }}>
        Loading graph visualization...
      </div>
    );
  }

  // If there's no data to display
  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    return (
      <div ref={containerRef} style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%',
        fontSize: '1.2rem',
        color: themeColors.text
      }}>
        No graph data available. Add some MOCs and tags to your posts.
      </div>
    );
  }

  // If there's an error
  if (error) {
    return (
      <div ref={containerRef} style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%',
        fontSize: '1.2rem',
        color: themeColors.error
      }}>
        {error}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <ForceGraph
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeId="id"
        nodeLabel={(node) => `${node.label} (${node.type})`}
        nodeVal={(node) => {
          // Base sizes by type
          return node.type === 'moc' ? 8 : node.type === 'tag' ? 6 : 7;
        }}
        nodeColor={(node) => {
          // Default colors based on node type
          if (node.type === 'post') {
            return node.status === 'evergreen' ? themeColors.evergreen : themeColors.fleeting;
          } else if (node.type === 'moc') {
            return themeColors.moc;
          } else { // tag
            return themeColors.tag;
          }
        }}
        linkWidth={1.5}
        linkColor={(link) => {
          // Colors based on link type
          return link.type === 'related' ? themeColors.related : 
                link.type === 'in-moc' ? themeColors.moc : themeColors.hasTag;
        }}
        onNodeClick={(node) => {
          console.log("Node clicked:", node);
          // Handle node click - navigate to the appropriate page
          if (node.type === 'post') {
            window.location.href = getPath(`blog/${node.id}`);
          } else if (node.type === 'moc') {
            window.location.href = getPath(`mocs/${node.id.replace('moc-', '')}`);
          } else if (node.type === 'tag') {
            window.location.href = getPath(`tags/${node.id.replace('tag-', '')}`);
          }
        }}
        cooldownTicks={100}
        cooldownTime={10000} // Longer cooldown to let graph settle
      />
    </div>
  );
} 