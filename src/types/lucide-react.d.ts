declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

  export const ArrowRight: Icon;
  export const ChevronRight: Icon;
  // Add other icons as needed
}
