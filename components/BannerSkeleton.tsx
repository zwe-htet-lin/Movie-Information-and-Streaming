"use client";

import { Skeleton } from "@/components/ui/skeleton";

const BannerSkeleton = () => {
  return (
    <div className="relative w-full h-[70vh] md:h-screen bg-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_#181818_0%,_#181818_0%,_rgba(24,24,24,0)_100%)]" />

      <div className="absolute inset-0 z-10 flex flex-col justify-end items-center md:items-start px-5 pb-10 lg:w-3/4 md:w-5/6 gap-4">
        <Skeleton className="h-10 w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 rounded-full bg-neutral-500" />

        <div className="flex flex-wrap items-center space-x-4 text-sm">
          <Skeleton className="h-5 w-12 rounded-full bg-neutral-500" />
          <Skeleton className="h-5 w-16 bg-neutral-500" />
          <Skeleton className="h-5 w-12 bg-neutral-500" />
          <Skeleton className="h-5 w-24 hidden md:inline bg-neutral-500" />
          <Skeleton className="h-5 w-16 bg-neutral-500" />
        </div>

        <Skeleton className="md:hidden h-5 w-40 bg-neutral-500" />

        <Skeleton className="h-5 w-1/2 bg-neutral-500" />

          <Skeleton className="h-4 w-full bg-neutral-500" />
          <Skeleton className="h-4 w-5/6 bg-neutral-500" />
          <Skeleton className="h-4 w-2/3 bg-neutral-500" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-40 rounded-full bg-neutral-500" />
          <Skeleton className="h-10 w-40 rounded-full bg-neutral-500" />
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
