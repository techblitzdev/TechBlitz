"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export default function GlobalPagination(opts: {
  currentPage: number;
  totalPages: number;
  href: string;
  paramName: string;
  postsPerPage: number;
  margin?: string;
}) {
  const {
    currentPage,
    totalPages,
    href,
    paramName,
    margin = "mt-5",
    postsPerPage,
  } = opts;
  const searchParams = useSearchParams();
  const router = useRouter();

  // Helper function to construct the query string with the page and existing filters
  const getPaginationLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, page.toString());
    return `${href}?${params.toString()}`;
  };

  const updateQueryParam = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);
    router.push(`${href}?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center gap-4 w-full",
        margin ? margin : "",
      )}
    >
      {/** per page dropdown */}
      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(value) => updateQueryParam("postsPerPage", value)}
        >
          <SelectTrigger className="h-8 border border-black-50 rounded-md">
            <SelectValue placeholder={`${postsPerPage} per page`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 per page</SelectItem>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/** pagination */}
      <div className={cn("flex gap-2 sm:mx-auto")}>
        <Link
          href={currentPage > 1 ? getPaginationLink(currentPage - 1) : "#"}
          className={cn(
            "bg-black-75 border border-black-50 rounded-md size-8 flex items-center justify-center text-sm",
            `${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`,
          )}
        >
          <ArrowLeft className="size-5" />
        </Link>

        {/** display 1-6 pages, then last page at the end with '...' in between */}
        {Array.from({ length: totalPages > 6 ? 6 : totalPages }, (_, i) => (
          <Link
            key={i}
            href={getPaginationLink(i + 1)}
            className={cn(
              "bg-black-75 border border-black-50 hover:bg-black-50 duration-300 rounded-md size-8 flex items-center justify-center p-1 text-sm",
              `${
                currentPage === i + 1 ? "pointer-events-none border-accent" : ""
              }`,
            )}
          >
            {i + 1}
          </Link>
        ))}

        {totalPages > 6 && (
          <div className="bg-black-75 border border-black-50 rounded-md size-8 flex items-center justify-center p-2">
            <span>...</span>
          </div>
        )}

        {/** display last page */}
        {totalPages > 6 && (
          <Link
            href={getPaginationLink(totalPages)}
            className={cn(
              "bg-black-75 border border-black-50 hover:bg-black-50 duration-300 rounded-md size-8 flex items-center justify-center p-1 text-sm",
              `${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }`,
            )}
          >
            {totalPages}
          </Link>
        )}

        <Link
          href={
            currentPage < totalPages ? getPaginationLink(currentPage + 1) : "#"
          }
          className={cn(
            "bg-black-75 border border-black-50 hover:bg-black-50 duration-300 rounded-md size-8 flex justify-center items-center",
            `${
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }`,
          )}
        >
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </div>
  );
}
