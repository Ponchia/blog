import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const site = context.site;
	
	// Helper to create consistent paths with full URL (including site and base path)
	const getFullUrl = (path) => {
		if (!site) return path;
		
		// Create URL object from site
		const siteUrl = new URL(site);
		
		// Use Astro's import.meta.env.BASE_URL to get the base path
		const basePath = import.meta.env.BASE_URL || '';
		
		// Ensure path doesn't have leading slash
		const cleanPath = path.startsWith('/') ? path.slice(1) : path;
		
		// Construct the full URL: site + base + path
		return new URL(`${basePath}/${cleanPath}`, siteUrl).toString();
	};
	
	// Create a proper site URL with the base path included
	const fullSiteUrl = site ? new URL(import.meta.env.BASE_URL || '', site).toString() : undefined;
	
	// For production, use the correct domain with /blog base path
	const isProduction = process.env.NODE_ENV === 'production';
	const correctBasePath = isProduction ? '/blog' : '';
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// Use the fixed site URL that includes the base path
		site: fullSiteUrl,
		items: posts.map((post) => {
			const postPath = `blog/${post.id}`;
			return {
				...post.data,
				// Generate the correct full URL for each post with base path
				link: site ? new URL(`${correctBasePath}/${postPath}`, site).toString() : postPath,
				// Add category tags for better RSS feed discovery
				categories: post.data.tags || [],
				// Use custom pubDate format to ensure valid dates
				pubDate: post.data.pubDate || 
					post.data.gitCreatedDate || 
					new Date(),
				// Compute content for description
				content: post.data.description,
			};
		}),
		// Set the proper XML stylesheet with base path
		stylesheet: `${correctBasePath}/rss/styles.xsl`,
		// Set customized RSS namespaces
		customData: `<language>en-us</language>`,
	});
}
