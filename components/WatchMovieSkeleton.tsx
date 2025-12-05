"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function WatchMovieSkeleton() {
  return (
    <div className="px-5 py-20 bg-accent-foreground">
      <h2 className="text-lg md:text-xl font-semibold mb-5">WATCH NOW</h2>

      <div className="aspect-video w-full">
        <Skeleton className="w-full h-full bg-neutral-500" />
      </div>
    </div>
  );
}
