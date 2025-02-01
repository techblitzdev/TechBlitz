'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FrequencyTabsProps {
  initialFrequency: 'month' | 'year'
  onFrequencyChange: (frequency: 'month' | 'year') => void
}

export default function FrequencyTabs({
  initialFrequency,
  onFrequencyChange,
}: FrequencyTabsProps) {
  const [frequency, setFrequency] = useState<'month' | 'year'>(initialFrequency)

  const handleFrequencyChange = (newFrequency: 'month' | 'year') => {
    setFrequency(newFrequency)
    onFrequencyChange(newFrequency)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2 mt-8">
      <div className="inline-flex gap-3 items-center rounded-md bg-primary p-1 text-muted-foreground border border-black-50">
        <Button
          variant={frequency === 'month' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => handleFrequencyChange('month')}
          className={cn(
            frequency === 'month' ? 'text-black' : 'text-white',
            'relative',
          )}
        >
          Monthly
        </Button>
        <Button
          variant={frequency === 'year' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => handleFrequencyChange('year')}
          className={cn(frequency === 'year' ? 'text-black' : 'text-white')}
        >
          Yearly (Save 20%)
        </Button>
      </div>
    </div>
  )
}
