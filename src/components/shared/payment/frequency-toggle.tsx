'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FrequencySwitcherProps {
  initialFrequency: 'month' | 'year';
  onFrequencyChange: (frequency: 'month' | 'year') => void;
}

export default function FrequencySwitcher({
  initialFrequency,
  onFrequencyChange,
}: FrequencySwitcherProps) {
  const [isYearly, setIsYearly] = useState(initialFrequency === 'year');

  const handleFrequencyChange = (checked: boolean) => {
    const newFrequency = checked ? 'year' : 'month';
    setIsYearly(checked);
    onFrequencyChange(newFrequency);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <Switch id="frequency-switch" checked={isYearly} onCheckedChange={handleFrequencyChange} />
      <Label htmlFor="frequency-switch" className="text-sm font-medium text-white">
        Annual discount <span className="text-accent">(20% discount)</span>
      </Label>
    </div>
  );
}
