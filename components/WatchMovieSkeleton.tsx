"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function WatchMovieSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10">
      <div className="mb-5 flex items-center">
        <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">WATCH NOW</h2>
      </div>

      <div className="aspect-video w-full">
        <Skeleton className="h-full w-full bg-neutral-500" />
      </div>
    </div>
  );
}
