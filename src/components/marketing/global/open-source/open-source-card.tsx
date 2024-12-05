import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Ellipsis, Smile } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

export default function OpenSourceCard() {
  const emojis = ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀'];

  return (
    <Card className="border border-[#1F4272] rounded-md overflow-hidden">
      <CardHeader className="space-y-0 flex flex-row w-full justify-between items-center text-white text-sm bg-[#131D2E] px-4 py-3 border-b border-[#1F4272]">
        <div className="flex flex-row items-center gap-x-2">
          <span className="font-semibold">techblitz</span>
          <span className="text-gray-400">commented 11 hours ago</span>
        </div>
        <Ellipsis className="size-4" />
      </CardHeader>
      <CardContent className="text-white p-4 pb-14 text-sm relative bg-[#000000]">
        or maybe infinite card scrolling with 'GitHub comment' style cards?
        <Popover>
          <PopoverTrigger className="absolute bottom-4 left-4 border border-black-50 rounded-full p-1">
            <Smile className="size-4 text-gray-200" />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            alignOffset={-4}
            side="top"
            className="bg-black-75 border border-black-50 p-2 rounded-lg"
          >
            <div className="flex items-center gap-x-1 justify-between">
              {emojis.map((emoji) => (
                <button className="hover:bg-black-50 py-1 px-1.5 rounded">
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
