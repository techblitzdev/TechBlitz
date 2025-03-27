import { format } from 'date-fns';

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
    <div className="bg-black border border-black-50 p-3 rounded-md shadow-md">
      <p className="text-sm mb-2 text-white font-onest">{formattedLabel}</p>

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

        // Get color from available properties
        const color = entry.color || entry.stroke || entry.fill || '#3b82f6';

        return (
          <div
            key={`tooltip-item-${index}`}
            className="flex items-center justify-between gap-3 mb-1"
          >
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-sm" style={{ backgroundColor: color }} />
              <p className="text-sm text-gray-400">{name}</p>
            </div>
            <p className="text-sm font-medium text-gray-400">{displayValue}</p>
          </div>
        );
      })}
    </div>
  );
}
