import { Separator } from '@/components/ui/separator';

export default function OrSeparator() {
  return (
    <div className="relative pt-5 pb-1 col-span-full">
      <Separator className=" bg-black-50" />
      <span className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-[#000000] px-2 text-xs text-gray-300">
        OR
      </span>
    </div>
  );
}
