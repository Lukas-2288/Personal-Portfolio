// Published notes, newest first. Returns [] when src/content/notes/ has no
// Markdown files, without asking Astro for an empty collection (which logs a
// warning on every page).
import { getCollection } from 'astro:content';

const noteFiles = import.meta.glob('/src/content/notes/**/*.md');

export async function publishedNotes() {
  if (Object.keys(noteFiles).length === 0) return [];
  const notes = await getCollection('notes', (n) => !n.data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
