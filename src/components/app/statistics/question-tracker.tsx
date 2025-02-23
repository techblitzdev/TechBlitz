'use client';

import { Tracker } from '@/components/ui/tremor/tracker';

const data = [
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-red-600', tooltip: 'Error' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-red-600', tooltip: 'Error' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-yellow-600', tooltip: 'Warn' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-yellow-600', tooltip: 'Warn' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-red-600', tooltip: 'Error' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
  { color: 'bg-emerald-600', tooltip: 'Tracker Info' },
];

export default function QuestionTracker() {
  return (
    <div className="col-span-12 border border-black-50 rounded-lg p-4">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-lg font-medium">Question Tracker</h3>
        <div>
          <Tracker className="hidden w-full lg:flex" data={data} />
          <Tracker className="hidden w-full sm:flex lg:hidden" data={data.slice(0, 60)} />
          <Tracker className="flex w-full sm:hidden" data={data.slice(0, 30)} />
        </div>
      </div>
    </div>
  );
}
