import { Timeline } from '@/components/ui/timelime';
import { changelogEntries } from '@/data/changelog';

export default function ChangelogTimeline() {
  const data = changelogEntries.map((entry) => ({
    title: entry.title,
    content: entry.content,
    date: entry.date,
  }));

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
