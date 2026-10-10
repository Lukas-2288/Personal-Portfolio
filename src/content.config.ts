// Content schemas. Every Markdown file in src/content/ is checked against
// these when the site builds, so a missing or mistyped field stops the build
// with an error that names the file and the field.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const PROJECT_KINDS = ['Work project', 'Team project', 'Hackathon project', 'Personal project'] as const;

// Generic drawings used as card thumbnails when a project has no cover image.
export const DIAGRAMS = ['fleet-loop', 'phone-screens', 'card-deck', 'browser-grid'] as const;

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(PROJECT_KINDS),
      role: z.string(),
      // coerce: a bare year like `dates: 2026` is read as a number by YAML.
      dates: z.coerce.string(),
      sortDate: z.coerce.date(),
      duration: z.string().optional(),
      team: z.string().optional(),
      summary: z.string(),
      blurb: z.string().max(200),
      metrics: z
        .array(z.object({ value: z.coerce.string().max(12), label: z.coerce.string().max(60) }))
        .length(3, 'List exactly 3 metrics under "metrics".'),
      tags: z.array(z.string()).min(1),
      featured: z.boolean().default(false),
      confidential: z.boolean().default(false),
      diagram: z.enum(DIAGRAMS).default('browser-grid'),
      gallery: z
        .array(z.object({ src: image(), alt: z.string().min(1), caption: z.string().optional() }))
        .default([]),
      links: z
        .object({
          repo: z.url().optional(),
          demo: z.url().optional(),
        })
        .default({}),
    }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
