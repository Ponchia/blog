import { useEffect, useRef, useState } from 'react';

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

// Graph visualization component for force-directed graph
export default function GraphView({ graphData }) {
  console.log("GraphView component rendering with data:", graphData);
  
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ForceGraph;
    let graph;

    if (typeof window === 'undefined') {
      console.log("Skipping graph initialization - window is undefined (SSR)");
      return;
    }

    const loadGraph = async () => {
      console.log("Starting loadGraph function");
      try {
        // Dynamically import the library on client side only
        console.log("Importing ForceGraph");
        ForceGraph = (await import('force-graph')).default;
        console.log("ForceGraph imported successfully");
        
        if (!containerRef.current) {
          console.log("Container ref is not available yet");
          setLoading(false);
          return;
        }
        
        if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
          console.log("No graph data available:", graphData);
          setLoading(false);
          return;
        }

        console.log("Container dimensions:", {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });

        // Clear any existing content
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }

        // Initialize the graph
        console.log("Initializing ForceGraph");
        graph = ForceGraph()(containerRef.current)
          .width(containerRef.current.clientWidth)
          .height(containerRef.current.clientHeight)
          .graphData(graphData)
          .nodeId('id')
          .nodeLabel(node => `${node.label} (${node.type})`)
          .nodeVal(node => {
            // Base sizes by type
            return node.type === 'moc' ? 8 : node.type === 'tag' ? 6 : 7;
          })
          .nodeColor(node => {
            // Default colors based on node type
            if (node.type === 'post') {
              return node.status === 'evergreen' ? '#27ae60' : '#e74c3c';
            } else if (node.type === 'moc') {
              return '#2980b9';
            } else { // tag
              return '#8e44ad';
            }
          })
          .linkWidth(1.5)
          .linkColor(link => {
            // Colors based on link type
            return link.type === 'related' ? '#8e44ad' : 
                  link.type === 'in-moc' ? '#2980b9' : '#d35400';
          })
          .d3AlphaDecay(0.01) // Slower decay for more natural movement
          .d3VelocityDecay(0.08) // Less friction for smoother interaction
          .cooldownTime(10000) // Longer cooldown to let graph settle
          .onNodeClick(node => {
            console.log("Node clicked:", node);
            // Handle node click - navigate to the appropriate page
            if (node.type === 'post') {
              window.location.href = getPath(`blog/${node.id}`);
            } else if (node.type === 'moc') {
              window.location.href = getPath(`mocs/${node.id.replace('moc-', '')}`);
            } else if (node.type === 'tag') {
              window.location.href = getPath(`tags/${node.id.replace('tag-', '')}`);
            }
          });

        console.log("Graph initialized, setting up zoom/fit");
        // Center the graph
        setTimeout(() => {
          console.log("Zooming to fit");
          graph.zoomToFit(400, 40);
        }, 500);

        // Handle window resize
        const handleResize = () => {
          if (containerRef.current && graph) {
            graph
              .width(containerRef.current.clientWidth)
              .height(containerRef.current.clientHeight);
          }
        };
        
        window.addEventListener('resize', handleResize);
        console.log("Graph setup complete, setting loading = false");
        setLoading(false);

        // Cleanup
        return () => {
          console.log("Cleaning up force graph");
          window.removeEventListener('resize', handleResize);
        };
      } catch (err) {
        console.error("Error initializing force graph:", err);
        setError("Failed to load graph visualization. Please try refreshing the page.");
        setLoading(false);
      }
    };

    console.log("Calling loadGraph");
    loadGraph();
  }, [graphData]);

  console.log("Rendering GraphView component, loading:", loading, "error:", error);

  if (error) {
    return (
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          fontSize: '1.2rem',
          color: '#e74c3c'
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {loading && (
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          fontSize: '1.2rem',
          color: '#666',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}>
          Initializing graph...
        </div>
      )}
      {(!graphData || !graphData.nodes || !graphData.nodes.length) && !loading && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          No graph data available. Add some MOCs and tags to your posts.
        </div>
      )}
    </div>
  );
} 