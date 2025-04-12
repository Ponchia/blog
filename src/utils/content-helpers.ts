/**
 * Content Helper Utilities
 * Functions for managing and optimizing content for SEO and display
 */

/**
 * Extracts a description from the content if none is provided
 * @param content The Markdown/HTML content to extract description from
 * @param maxLength Maximum length for the description (default: 160 chars)
 * @returns A truncated description for SEO purposes
 */
export function generateDescriptionFromContent(
  content: string,
  maxLength = 160
): string {
  if (!content) return '';

  // Remove HTML tags
  const textContent = content.replace(/<\/?[^>]+(>|$)/g, ' ');
  
  // Remove markdown links
  const noLinks = textContent.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove markdown syntax
  const plainText = noLinks
    .replace(/[#*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Get first paragraph or truncate to max length
  const firstParagraph = plainText.split('. ').slice(0, 2).join('. ');
  
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }
  
  // Truncate and add ellipsis
  return firstParagraph.substring(0, maxLength - 3) + '...';
}

/**
 * Generates keywords from tags and content
 * @param tags Array of tags for the content
 * @param additionalKeywords Additional keywords to include
 * @returns Comma-separated string of keywords
 */
export function generateKeywords(
  tags: string[] = [],
  additionalKeywords: string[] = []
): string {
  // Combine tags and additional keywords
  const allKeywords = [...tags, ...additionalKeywords];
  
  // Remove duplicates and empty values
  const uniqueKeywords = [...new Set(allKeywords.filter(Boolean))];
  
  return uniqueKeywords.join(', ');
}

/**
 * Formats a URL slug to be SEO-friendly
 * @param text Input text to convert to slug
 * @returns SEO-friendly slug
 */
export function createSeoSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Calculates estimated reading time
 * @param content The content to calculate reading time for
 * @param wordsPerMinute Reading speed (default: 200 words/min)
 * @returns Formatted reading time string
 */
export function calculateReadingTime(
  content: string,
  wordsPerMinute = 200
): string {
  // Remove HTML tags
  const textContent = content.replace(/<\/?[^>]+(>|$)/g, ' ');
  
  // Count words (roughly)
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  
  // Calculate reading time in minutes
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return minutes <= 1 
    ? '1 min read' 
    : `${minutes} min read`;
} 