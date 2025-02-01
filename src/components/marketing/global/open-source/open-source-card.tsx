import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ellipsis, Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { capitalise } from "@/utils";

type cardStyle = "comment" | "issue" | "pr";

export default function OpenSourceCard(opts: {
  cardStyle?: cardStyle;
  content?: string;
  contributorName?: string;
  actionType?: string;
}) {
  const { cardStyle = "comment", content, actionType, contributorName } = opts;

  const emojis = ["👍", "👎", "😄", "🎉", "😕", "❤️", "🚀", "👀"];

  // determine the colours of the card based on the card style
  const cardColors = {
    comment: {
      headerBg: "bg-[#131D2E]",
      headerColor: "#131D2E",
      border: "border-[#1F4272]",
      borderColor: "#1F4272",
    },
    issue: {
      headerBg: "bg-[#2D1111]",
      headerColor: "#2D1111",
      border: "border-[#4E1C1C]",
      borderColor: "#4E1C1C",
    },
    pr: {
      headerBg: "bg-[#151B23]",
      headerColor: "#151B23",

      border: "border-[#3C444D]",
      borderColor: "#3C444D",
    },
  };

  return (
    <Card
      className={cn("border rounded-md relative", cardColors[cardStyle].border)}
    >
      <CardHeader
        className={cn(
          "space-y-0 flex flex-row w-full justify-between items-center text-white text-sm px-4 py-3 border-b gh-card-arrow rounded-t-md",
          cardColors[cardStyle].headerBg,
          cardColors[cardStyle].border,
        )}
        style={
          {
            "--arrow-color": cardColors[cardStyle].headerColor,
            "--arrow-border-color": cardColors[cardStyle].borderColor,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-row items-center gap-x-2">
          <span className="font-semibold">
            {contributorName || "techblitz"}
          </span>
          <span className="text-gray-400">commented 11 hours ago</span>
        </div>
        <div className="flex items-center gap-x-2">
          <p
            className={cn(
              "text-xs text-[#9198a1] border rounded-full py-px px-1.5 font-semibold",
              cardColors[cardStyle].border,
            )}
          >
            {actionType && capitalise(actionType)}
          </p>
          <Ellipsis className="size-4" />
        </div>
      </CardHeader>
      <CardContent className="rounded-b-md text-white p-4 pb-14 text-sm relative bg-[#000000]">
        {content}
        <Popover>
          <PopoverTrigger
            className="absolute bottom-4 left-4 border border-black-50 rounded-full p-1"
            aria-label="GitHub card emoji button"
          >
            <Smile className="size-4 text-gray-200" />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            alignOffset={-4}
            side="top"
            className="bg-black-75 border border-black-50 px-2 py-1 rounded-lg min-w-fit [transform:perspective(4101px)_rotateX(47deg)_rotateY(-13deg)_rotateZ(31deg)] top-8 relative"
          >
            <div className="flex items-center gap-x-1 justify-between">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className="hover:bg-black-50 py-1 px-1.5 rounded"
                >
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
