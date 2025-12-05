"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ratingStars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function ProfileSkeleton() {
  return (
    <div className="pt-28 px-4 md:px-8">
      <div className="flex gap-4 sm:gap-5">
        <Skeleton className="size-24 sm:size-28 rounded-full bg-neutral-500" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-40 sm:h-9 sm:w-56 bg-neutral-500" />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Skeleton className="h-5 w-5 rounded-full bg-neutral-500" />
            <Skeleton className="mt-1 h-5 w-40 sm:w-56 bg-neutral-500" />
          </div>
          <Skeleton className="mt-3 h-6 w-20 sm:w-24 bg-neutral-500" />
        </div>
      </div>

      <div className="my-10 border-1 border-neutral-800 sm:my-12" />

      <Skeleton className="mb-5 h-7 w-28 sm:h-8 sm:w-32 bg-neutral-500" />

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Card
            key={i}
            className="flex flex-col items-center justify-center gap-2 py-4 text-center"
          >
            <Skeleton className="h-4 w-24 sm:w-28 bg-neutral-500" />
            <Skeleton className="h-20 w-20 bg-neutral-500" />
          </Card>
        ))}
      </div>

      <Card className="my-10 p-4 sm:p-6">
        <Skeleton className="h-6 w-40 sm:w-48 bg-neutral-500" />
        <Skeleton className="mt-2 h-4 w-56 sm:w-72 bg-neutral-500" />
        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="h-56 sm:h-64">
            <Skeleton className="h-full w-full rounded-md bg-neutral-500" />
          </div>
          <Card className="border border-neutral-800 bg-background p-0">
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-2 sm:p-2">
              {ratingStars.map((star) => (
                <div
                  key={star}
                  className="flex w-full justify-between rounded-lg px-4 py-3"
                >
                  <div className="flex w-full items-center gap-2">
                    <Skeleton className="h-4 w-6 bg-neutral-500" />
                    <Skeleton className="h-4 w-10 bg-neutral-500" />
                    <Skeleton className="h-4 w-16 bg-neutral-500" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {[0, 1].map((i) => (
          <Card key={i} className="p-4 sm:p-6">
            <Skeleton className="mx-auto mb-3 h-6 w-40 sm:w-52 bg-neutral-500" />
            <div className="h-52 sm:h-56">
              <Skeleton className="h-full w-full rounded-md bg-neutral-500" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
