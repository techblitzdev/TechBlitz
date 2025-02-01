import { getReport } from '@/utils/data/statistics/reports/get-report'
import StatisticsReportContent from '@/components/app/statistics/statistics-report-content'
import { useUserServer } from '@/hooks/use-user-server'
import UpgradeLayout from '@/components/app/shared/upgrade-layout'

export default async function StatisticsReportPage({
  params,
}: {
  params: { uid: string }
}) {
  const { uid } = params
  const report = await getReport(uid)

  const user = await useUserServer()
  if (!user || user.userLevel === 'FREE') {
    return (
      <UpgradeLayout
        title="Reports"
        description="In order to view reports, you need to upgrade to Premium."
      />
    )
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Report not found
        </h1>
      </div>
    )
  }

  return <StatisticsReportContent report={report} />
}
