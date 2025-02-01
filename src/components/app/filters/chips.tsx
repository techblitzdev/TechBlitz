"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { capitalise } from "@/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function FilterChips() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  // Convert search params to an object
  const paramsObj = Object.fromEntries(
    Array.from(searchParams.entries()).filter(
      ([key]: [string, string]) => key !== "page",
    ),
  );

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "tags" && value) {
      // Handle array-based 'tags' parameter
      const updatedTags =
        params
          .get("tags")
          ?.split(",")
          .filter((tag) => tag !== value) || [];
      if (updatedTags.length > 0) {
        params.set("tags", updatedTags.join(","));
      } else {
        params.delete("tags");
      }
    } else {
      // Remove other single-value parameters
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("?");
  };

  if (Object.keys(paramsObj).length === 0) return null;

  const getChipText = (key: string, value: string) => {
    const textMap: Record<string, string | ((val: string) => string)> = {
      tags: (tag) => capitalise(tag),
      answered: (val) => (val === "true" ? "Answered" : "Unanswered"),
      bookmarked: () => "Bookmarked",
      isPremiumQuestion: () => "Premium",
      recommended: () => "Recommended",
      default: (val) => capitalise(val).replace("_", " "),
    };

    const textGenerator = textMap[key] || textMap.default;
    return typeof textGenerator === "function"
      ? textGenerator(value)
      : textGenerator;
  };

  const renderChip = (key: string, value: string, tag?: string) => {
    return (
      <div
        key={tag ? `${key}-${tag}` : key}
        className="flex items-center gap-2 px-3 py-1 text-sm border border-black-50 rounded-md hover:bg-black-25 duration-300"
      >
        <span>{getChipText(key, tag || value)}</span>
        <button
          onClick={() => startTransition(() => removeFilter(key, tag))}
          className="bg-black-50 rounded-full p-0.5"
        >
          <X className="size-2.5" />
        </button>
      </div>
    );
  };

  return (
    <div
      data-pending={isPending ? "" : undefined}
      className="space-y-2 flex flex-wrap justify-between"
    >
      <div
        className={cn(
          "flex gap-2 flex-wrap duration-300",
          Object.keys(paramsObj).length === 0 ? "h-0" : "",
        )}
      >
        {Object.entries(paramsObj).map(([key, value]) => {
          if (key === "page") return null;
          if (key === "tags") {
            return value.split(",").map((tag) => renderChip(key, value, tag));
          }
          return renderChip(key, value);
        })}
      </div>
      <Button
        onClick={() => startTransition(() => clearAllFilters())}
        variant="destructive"
        className="py-0.5 px-2 h-fit"
      >
        Clear all
      </Button>
    </div>
  );
}
