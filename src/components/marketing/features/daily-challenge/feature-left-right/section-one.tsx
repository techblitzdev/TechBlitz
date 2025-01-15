import LeftRightBlock from '@/components/marketing/global/blocks/left-right-block';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@mantine/dates';

export default function FeatureLeftRightSectionOne(opts: {
  leftHeader?: string;
  leftSubheader?: string;
  learnMoreLink?: boolean;
}) {
  const { leftHeader, leftSubheader, learnMoreLink } = opts;

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const dateRange: [Date | null, Date | null] = [today, nextWeek];

  return (
    <LeftRightBlock
      left={
        <div className="flex flex-col gap-y-6">
          <h2 className="text-2xl lg:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55">
            {leftHeader ? leftHeader : 'Achieve Your Goals Effortlessly'}
          </h2>
          <p className="text-white/70 max-w-xl text-base font-onest">
            {leftSubheader
              ? leftSubheader
              : "TechBlitz empowers your growth with intuitive progress tracking. See how far you've come with streak counts that celebrate your dedication and keep you motivated. Stay on track, achieve consistency, and make self-improvement a daily habit."}
          </p>
          {learnMoreLink && (
            <Button
              variant="secondary"
              href={'/features/daily-coding-challenges'}
            >
              Learn more
            </Button>
          )}
        </div>
      }
      right={
        <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
          <div
            className="w-full max-w-fit p-4 backdrop-blur-sm rounded-xl border border-black-50 shadow-2xl relative top-12"
            style={{
              background:
                'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
            }}
          >
            <DatePicker
              type="range"
              value={dateRange}
              size="lg"
              classNames={{
                calendarHeader: 'text-white/90',
                day: 'text-white/80 hover:bg-white/10',
                weekday: 'text-white/60',
                month: 'text-white/90',
              }}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000] to-transparent pointer-events-none z-30"></div>
        </div>
      }
    />
  );
}
