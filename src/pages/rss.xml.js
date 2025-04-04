import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => {
		// Filter out posts with draft: true
		return !data.draft;
	});
	const site = context.site;
	
	// Create a proper site URL with the base path included
	const fullSiteUrl = site ? new URL(import.meta.env.BASE_URL || '', site).toString() : undefined;
	
	// IMPORTANT: This needs to match the actual deployed structure
	// The RSS stylesheet must be available at both /rss/styles.xsl and /blog/rss/styles.xsl
	// to handle both custom domain and GitHub Pages deployments
	const stylesheetPath = '/rss/styles.xsl';
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// Use the fixed site URL that includes the base path
		site: fullSiteUrl,
		items: posts.map((post) => {
			const postPath = `blog/${post.id}`;
			// Use BASE_URL for path construction
			const basePath = import.meta.env.BASE_URL || '';
			return {
				...post.data,
				// Generate the correct full URL for each post with base path
				link: site ? new URL(`${basePath}/${postPath}`, site).toString() : postPath,
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
		// Always use the consistent stylesheet path
		stylesheet: stylesheetPath,
		// Set customized RSS namespaces
		customData: `<language>en-us</language>`,
	});
}
