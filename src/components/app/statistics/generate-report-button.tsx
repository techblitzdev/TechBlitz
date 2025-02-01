'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { generateStatisticsReport } from '@/actions/ai/reports/generate-report'
import StatsReportCardSkeleton from '@/components/app/statistics/stats-report-card-loading'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="accent" disabled={pending}>
      {pending ? 'Generating...' : 'Generate Report'}
    </Button>
  )
}

export default function GenerateReportButton() {
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const report = await generateStatisticsReport()
      toast.success('Report generated successfully')
      router.push(`/statistics/reports/${report.uid}`)
    } catch (error) {
      toast.error('Failed to generate report')
    }
  }

  return (
    <form action={handleSubmit}>
      <SubmitButton />
      {useFormStatus().pending && <StatsReportCardSkeleton />}
    </form>
  )
}
