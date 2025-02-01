import { User } from "lucide-react";
import { Suspense } from "react";
import LoadingSpinner from "./loading";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProfilePicture(opts: {
  src?: string | null;
  alt: string | null;
  className?: string;
}) {
  const { src, alt, className } = opts;

  // if no src, return a placeholder
  if (!src) {
    return (
      <div
        className={cn(
          "rounded-full size-6 flex items-center justify-center bg-black-50",
          className,
        )}
      >
        <User className="size-4" />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Image
        src={src}
        className={cn("rounded-full size-6", className)}
        alt={alt || "User Profile Picture"}
        width={24}
        height={24}
      />
    </Suspense>
  );
}
