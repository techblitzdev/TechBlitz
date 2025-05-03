import { format } from 'date-fns';
import { Separator } from '../ui/separator';
import { capitalise } from '@/utils';

// Define PayloadItem to cover various formats from different chart types
interface PayloadItem {
  // From native recharts
  name?: string;
  value?: number;
  dataKey?: string;
  payload?: any;
  color?: string;
  stroke?: string;
  fill?: string;

  // From customized charts
  category?: string;
  index?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

// Function to get correct color for tooltip
const getTooltipColor = (entry: PayloadItem): string => {
  // First check the specified color
  const colorName = entry.color || '';

  // If it's an accent color, use the CSS variable
  if (colorName === 'accent') {
    return '#5b61d6'; // Hardcoded accent color
  }

  // Otherwise use the provided color or fallbacks
  return entry.color || entry.stroke || entry.fill || '#3b82f6';
};

export default function Tooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  // Format date if possible
  let formattedLabel = label || '';
  try {
    const date = new Date(formattedLabel);
    if (!isNaN(date.getTime())) {
      formattedLabel = format(date, 'MMM d, yyyy');
    }
  } catch (e) {
    // Use original label if date parsing fails
  }

  return (
    <div className="bg-black border border-black-50 rounded-md shadow-md">
      <p className="text-sm text-white font-onest px-4 pt-3">{formattedLabel}</p>

      {payload.map((entry, index) => {
        // Get the display name (try different properties)
        const name = entry.category || entry.name || entry.dataKey || 'Value';

        // Get the value to display (try different approaches)
        let displayValue: number | string = 0;

        // Direct value from entry
        if (typeof entry.value === 'number') {
          displayValue = entry.value;
        }
        // Try to get from payload if available
        else if (entry.payload) {
          const key = entry.dataKey || entry.name || 'questions';
          if (typeof entry.payload[key] === 'number') {
            displayValue = entry.payload[key];
          }
        }

        // Get the appropriate color
        const color = getTooltipColor(entry);

        return (
          <div
            key={`tooltip-item-${index}`}
            className="flex items-center justify-between gap-2 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm" style={{ backgroundColor: color }} />
              <p className="text-sm text-gray-400">{capitalise(name)}:</p>
            </div>
            <p className="text-sm font-medium text-gray-400">{displayValue}</p>
          </div>
        );
      })}
    </div>
  );
}
