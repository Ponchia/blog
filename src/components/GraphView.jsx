import { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

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

// Graph visualization component for force-directed graph
export default function GraphView({ graphData }) {
  // If not in browser environment, render a placeholder
  if (!isBrowser) {
    return <div>Graph visualization loading...</div>;
  }
  
  console.log("GraphView component rendering with data:", graphData);
  
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const graphRef = useRef();

  // Update dimensions on mount and window resize
  useEffect(() => {
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
  }, [graphData]);

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
        color: '#666'
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
        color: '#e74c3c'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <ForceGraph2D
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
            return node.status === 'evergreen' ? '#27ae60' : '#e74c3c';
          } else if (node.type === 'moc') {
            return '#2980b9';
          } else { // tag
            return '#8e44ad';
          }
        }}
        linkWidth={1.5}
        linkColor={(link) => {
          // Colors based on link type
          return link.type === 'related' ? '#8e44ad' : 
                link.type === 'in-moc' ? '#2980b9' : '#d35400';
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