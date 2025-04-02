import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Define a shared schema for both blog and archive
const postSchema = () => z.object({
	title: z.string(),
	description: z.string(),
	// Transform string to Date object
	pubDate: z.coerce.date().optional(),
	updatedDate: z.coerce.date().optional(),
	// Git-based dates
	gitCreatedDate: z.coerce.date().optional(),
	gitLastModified: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	// MOC connections - list of maps of content this post belongs to
	mocs: z.array(z.string()).optional(),
	// Related posts - explicit connections to other posts by slug
	related: z.array(z.string()).optional(),
	// Content status - for visual differentiation
	status: z.enum(['evergreen', 'fleeting']).optional().default('evergreen'),
	// Traditional tags can still be used alongside MOCs
	tags: z.array(z.string()).optional(),
	// Draft status - posts with draft: true won't be published
	draft: z.boolean().optional().default(false),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: postSchema,
});

const archive = defineCollection({
	// Load Markdown and MDX files in the `src/content/archive/` directory.
	loader: glob({ base: './src/content/archive', pattern: '**/*.{md,mdx}' }),
	// Use the same schema as the blog collection
	schema: postSchema,
});

export const collections = { blog, archive };
