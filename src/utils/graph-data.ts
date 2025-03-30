// Utility functions for generating graph data for visualization
import type { CollectionEntry } from 'astro:content';
import { slugify } from './moc-utils';

// Type for blog posts with slug
type BlogPost = CollectionEntry<'blog'> & { slug: string };

// Node types for graph visualization
type NodeType = 'post' | 'moc' | 'tag';

// Link types for graph visualization
type LinkType = 'in-moc' | 'related' | 'has-tag';

// Node interface for graph visualization
interface Node {
  id: string;
  label: string;
  type: NodeType;
  date?: Date;
  status?: string;
  size?: number;
  color?: string;
}

// Link interface for graph visualization
interface Link {
  source: string;
  target: string;
  type: LinkType;
  color?: string;
  weight?: number;
}

// Graph data interface
export interface GraphData {
  nodes: Node[];
  links: Link[];
}

/**
 * Generate graph data from posts
 */
export function generateGraphData(posts: BlogPost[]): GraphData {
  if (!posts || posts.length === 0) {
    console.log("No posts provided to generateGraphData");
    return { nodes: [], links: [] };
  }

  // Create nodes for posts
  const postNodes: Node[] = posts.map(post => ({
    id: post.slug,
    label: post.data.title,
    type: 'post',
    date: post.data.pubDate,
    status: post.data.status || 'evergreen',
    // Size will be determined in the visualization component
  }));
  
  // Create nodes for MOCs
  const allMocs = new Set<string>();
  posts.forEach(post => {
    if (post.data.mocs && Array.isArray(post.data.mocs)) {
      post.data.mocs.forEach(moc => allMocs.add(moc));
    }
  });
  
  const mocNodes: Node[] = Array.from(allMocs).map(moc => ({
    id: `moc-${slugify(moc)}`,
    label: moc,
    type: 'moc',
  }));
  
  // Create nodes for tags
  const allTags = new Set<string>();
  posts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach(tag => allTags.add(tag));
    }
  });
  
  const tagNodes: Node[] = Array.from(allTags).map(tag => ({
    id: `tag-${slugify(tag)}`,
    label: tag,
    type: 'tag',
  }));
  
  // Create links from posts to MOCs
  const postMocLinks: Link[] = [];
  posts.forEach(post => {
    if (post.data.mocs && Array.isArray(post.data.mocs)) {
      post.data.mocs.forEach(moc => {
        postMocLinks.push({
          source: post.slug,
          target: `moc-${slugify(moc)}`,
          type: 'in-moc',
        });
      });
    }
  });
  
  // Create links from posts to tags
  const postTagLinks: Link[] = [];
  posts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach(tag => {
        postTagLinks.push({
          source: post.slug,
          target: `tag-${slugify(tag)}`,
          type: 'has-tag',
        });
      });
    }
  });
  
  // Create links for related posts
  const relatedLinks: Link[] = [];
  posts.forEach(post => {
    if (post.data.related && Array.isArray(post.data.related)) {
      post.data.related.forEach(relatedSlug => {
        // Ensure the related post exists
        if (posts.some(p => p.slug === relatedSlug)) {
          relatedLinks.push({
            source: post.slug,
            target: relatedSlug,
            type: 'related',
          });
        }
      });
    }
  });
  
  const result = {
    nodes: [...postNodes, ...mocNodes, ...tagNodes],
    links: [...postMocLinks, ...postTagLinks, ...relatedLinks],
  };
  
  console.log(`Generated graph data: ${result.nodes.length} nodes, ${result.links.length} links`);
  return result;
} 