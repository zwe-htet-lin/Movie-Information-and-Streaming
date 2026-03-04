"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  size: "default" | "cast";
}

const CastCardSkeletonBase = ({ size }: Props) => {
  const cardSize =
    size === "cast"
      ? "h-[300px] w-[160px] sm:h-[320px] sm:w-[180px]"
      : "aspect-[3/5]";

  const cardImageHeight = size === "cast" ? "h-[65%]" : "h-[75%]";

  return (
    <Card
      className={`${cardSize} flex-shrink-0 gap-0 overflow-hidden border-0 p-0`}
    >
      <div className={`${cardImageHeight} w-full`}>
        <Skeleton className="h-full w-full rounded-t-lg bg-neutral-500" />
      </div>

      <CardContent className="h-[35%] space-y-2 px-2 py-3">
        <Skeleton className="h-4 w-3/4 bg-gray-600" />
        <Skeleton className="h-3 w-1/2 bg-gray-700" />
      </CardContent>
    </Card>
  );
};

export const CastCardSkeleton = () => <CastCardSkeletonBase size="cast" />;

export const CastGridCardSkeleton = () => (
  <CastCardSkeletonBase
    size="default"
    // width="w-full"
    // height="h-[280px] sm:h-[300px] md:h-[320px]"
  />
);
