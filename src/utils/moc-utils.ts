// Utility functions for working with Maps of Content (MOCs)
import type { CollectionEntry } from 'astro:content';

// Type for blog posts with slug property
type BlogPost = CollectionEntry<'blog'>;

/**
 * Get a valid slug for a post, using either the existing slug or extracting from id
 */
export function getPostSlug(post: BlogPost): string {
  // If post has any slug property (from Collection Entry), use it
  if ('slug' in post && typeof post.slug === 'string') return post.slug;
  
  // Otherwise extract from id which is typically in format like 'src/content/blog/first-post.md'
  if (post.id) {
    const parts = post.id.split('/');
    const filename = parts[parts.length - 1];
    // Remove file extension
    return filename.replace(/\.(md|mdx)$/, '');
  }
  
  // Fallback to empty string if we can't determine
  return '';
}

/**
 * Get all posts belonging to a specific MOC
 */
export function getPostsByMoc(allPosts: BlogPost[], mocName: string): BlogPost[] {
  // Make sure we're only returning posts that have the MOC
  return allPosts.filter(post => 
    post.data.mocs && 
    post.data.mocs.includes(mocName)
  );
}

/**
 * Get all MOCs in the system
 */
export function getAllMocs(allPosts: BlogPost[]): string[] {
  const mocSet = new Set<string>();
  allPosts.forEach(post => {
    if (post.data.mocs) {
      post.data.mocs.forEach((moc: string) => mocSet.add(moc));
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
    currentPost.data.related?.includes(getPostSlug(post))
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
      post.data.tags.forEach((tag: string) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet);
}

/**
 * Get post by slug
 */
export function getPostBySlug(allPosts: BlogPost[], slug: string): BlogPost | undefined {
  return allPosts.find(post => getPostSlug(post) === slug);
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

/**
 * Safely format a date with fallback value
 * Handles undefined dates and ensures the input is a Date object
 */
export function safeFormatDate(date: Date | undefined | null, format = 'short'): string {
  if (!date) return '';
  
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Ensure it's a valid date
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }
  
  try {
    if (format === 'short') {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } else {
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (e) {
    console.error('Error formatting date:', e);
    return '';
  }
} 