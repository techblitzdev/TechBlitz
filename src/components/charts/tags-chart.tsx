import { cn } from '@/lib/utils';
import { BarList } from './bar-list-chart';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SPulse2 from '../ui/icons/s-pulse-2';
import { Separator } from '../ui/separator';

interface TagsChartProps {
  data: {
    name: string;
    value: number;
  }[];
  backgroundColor?: string;
  title?: string;
  barColor?: string;
}

export default function TagsChart({ data, backgroundColor, title, barColor }: TagsChartProps) {
  return (
    <Card
      className={cn(
        'flex flex-col gap-4 rounded-lg border-black-50',
        backgroundColor ? backgroundColor : 'bg-black'
      )}
    >
      <CardHeader className="flex flex-row items-start gap-3 p-5 pb-0">
        <CardTitle className="flex flex-col gap-0.5">
          <h4 className="text-xl font-semibold text-white">{title}</h4>
        </CardTitle>
      </CardHeader>
      <Separator className="bg-black-50" />
      <CardContent className="p-5">
        <BarList data={data} barColor={barColor} />
      </CardContent>
    </Card>
  );
}
