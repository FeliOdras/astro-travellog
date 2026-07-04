import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const trips = defineCollection({
	// Load Markdown and MDX files in the `src/content/trips/` directory.
	loader: glob({ base: './src/content/trips', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			distance: z.string().optional(),
			start: z.string().optional(),
			end: z.string().optional(),	
			gpx: z.string().optional(),
			images: z.array(
				z.object({
					file: z.string(),
					caption: z.string().optional(),
				})
			).optional(),
			heroImage: z.optional(image()).optional(),
			heroImageAlt: z.string().optional(),
			category: z.enum(['hiking', 'cycling']),
		}),
});

export const collections = { trips };
