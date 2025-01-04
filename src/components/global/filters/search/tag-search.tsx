'use client';

import { Input } from '@/components/ui/input';

interface FilterSearchTagProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSearchTag({
  value,
  onChange,
}: FilterSearchTagProps) {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 max-w-xs bg-transparent text-white placeholder:text-gray-400 border border-black-50 pl-8"
      />
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
