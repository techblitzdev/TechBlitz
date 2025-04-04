import { ChangelogEntry, changelogEntries } from '@/utils/constants/changelog';

export async function getChangelogEntry(slug: string): Promise<ChangelogEntry | undefined> {
  return changelogEntries.find((entry) => entry.slug === slug);
}

export async function getAllChangelogEntries(): Promise<ChangelogEntry[]> {
  return changelogEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getLatestChangelogEntry(): Promise<ChangelogEntry | undefined> {
  const entries = await getAllChangelogEntries();
  return entries[0];
}
