"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CastCardSkeleton = () => {
  return (
    <Card className="w-[140px] sm:w-[150px] h-[260px] sm:h-[300px] gap-0 p-0 border-0 rounded-lg flex-shrink-0 overflow-hidden">
      <div className="w-full h-[70%]">
        <Skeleton className="w-full h-full rounded-t-lg bg-neutral-500" />
      </div>

      <CardContent className="px-2 py-3 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-gray-600" />
        <Skeleton className="h-3 w-1/2 bg-gray-700" />
      </CardContent>
    </Card>
  );
};

export default CastCardSkeleton;
