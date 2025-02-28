'use client';

import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from './dropdown-menu';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void; // Accept undefined here
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full!">
        <Button
          variant="default"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <div className="p-3 border-t border-border">
          <Select onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
