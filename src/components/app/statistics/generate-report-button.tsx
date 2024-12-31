'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { generateStatisticsReport } from '@/actions/ai/reports/generate-report';
import StatsReportCardSkeleton from '@/components/app/statistics/stats-report-card-loading';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? 'Generating...' : 'Generate Report'}
    </Button>
  );
}

export default function GenerateReportButton() {
  return (
    <form action={generateStatisticsReport}>
      <SubmitButton />
      {useFormStatus().pending && <StatsReportCardSkeleton />}
    </form>
  );
}
