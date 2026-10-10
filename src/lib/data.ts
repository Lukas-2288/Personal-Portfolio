// Loads the YAML files in src/data/ and checks their shape, so a typo there
// fails the build with a clear message instead of rendering a broken page.
import { parse } from 'yaml';
import { z } from 'astro/zod';
import profileRaw from '../data/profile.yaml?raw';
import experienceRaw from '../data/experience.yaml?raw';
import educationRaw from '../data/education.yaml?raw';
import skillsRaw from '../data/skills.yaml?raw';

const Profile = z.object({
  name: z.string(),
  role: z.string(),
  headline: z.string(),
  intro: z.string(),
  about: z.string(),
  email: z.email(),
  linkedin: z.url(),
  github: z.url(),
});

const Experience = z.array(
  z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    dates: z.string(),
    summary: z.string(),
    project: z.string().optional(),
  }),
);

const Education = z.array(
  z.object({
    degree: z.string(),
    school: z.string(),
    short: z.string(),
    location: z.string(),
    dates: z.string(),
    honors: z.string().optional(),
    coursework: z.array(z.string()).default([]),
  }),
);

const Skills = z.array(z.object({ group: z.string(), items: z.array(z.string()).min(1) }));

function load<T extends z.ZodType>(file: string, raw: string, schema: T): z.infer<T> {
  const result = schema.safeParse(parse(raw));
  if (!result.success) {
    throw new Error(`src/data/${file} has a problem:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const profile = load('profile.yaml', profileRaw, Profile);
export const experience = load('experience.yaml', experienceRaw, Experience);
export const education = load('education.yaml', educationRaw, Education);
export const skills = load('skills.yaml', skillsRaw, Skills);

export const aboutParagraphs = profile.about
  .split(/\n\s*\n/)
  .map((p) => p.trim())
  .filter(Boolean);
