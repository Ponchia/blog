import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const site = context.site;
	
	// Helper to create consistent paths with base URL
	const getPathWithBase = (path) => {
		// Get the base path (pathname) from the site URL
		const basePath = site ? new URL(site).pathname : '';
		// Ensure path doesn't have leading slash
		const cleanPath = path.startsWith('/') ? path.slice(1) : path;
		// Join with correct slashes
		return `${basePath}blog/${cleanPath}/`;
	};
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: getPathWithBase(post.id),
		})),
	});
}
