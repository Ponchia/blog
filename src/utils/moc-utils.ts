// Utility functions for working with Maps of Content (MOCs)
import type { CollectionEntry } from 'astro:content';

// Type for blog posts with slug property
type BlogPost = CollectionEntry<'blog'> & { slug: string };

/**
 * Get all posts belonging to a specific MOC
 */
export function getPostsByMoc(allPosts: BlogPost[], mocName: string): BlogPost[] {
  // Make sure we're only returning posts that have the MOC and have a valid slug
  return allPosts.filter(post => 
    post.data.mocs && 
    post.data.mocs.includes(mocName) && 
    post.slug // Ensure slug exists
  );
}

/**
 * Get all MOCs in the system
 */
export function getAllMocs(allPosts: BlogPost[]): string[] {
  const mocSet = new Set<string>();
  allPosts.forEach(post => {
    if (post.data.mocs) {
      post.data.mocs.forEach(moc => mocSet.add(moc));
    }
  });
  return Array.from(mocSet);
}

/**
 * Get related posts (explicitly defined)
 */
export function getRelatedPosts(allPosts: BlogPost[], currentPost: BlogPost): BlogPost[] {
  if (!currentPost.data.related) return [];
  
  return allPosts.filter(post => 
    currentPost.data.related?.includes(post.slug)
  );
}

/**
 * Get posts with a specific tag
 */
export function getPostsByTag(allPosts: BlogPost[], tag: string): BlogPost[] {
  return allPosts.filter(post => 
    post.data.tags && post.data.tags.includes(tag)
  );
}

/**
 * Get all tags in the system
 */
export function getAllTags(allPosts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  allPosts.forEach(post => {
    if (post.data.tags) {
      post.data.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet);
}

/**
 * Get post by slug
 */
export function getPostBySlug(allPosts: BlogPost[], slug: string): BlogPost | undefined {
  return allPosts.find(post => post.slug === slug);
}

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 