"use client";

import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface Props {
  size?: "backdrop" | "poster" | "grid-backdrop" | "grid-poster";
}

const ImageCardSkeletonBase = ({ size }: Props) => {
  const cardSize =
    size === "grid-backdrop"
      ? "aspect-[5/3]"
      : size === "grid-poster"
        ? "aspect-[2/3]"
        : size === "backdrop"
          ? "h-[180px] w-[300px] sm:h-[200px] sm:w-[320px]"
          : "h-[300px] w-[180px] sm:w-[200px] md:h-[310px] md:w-[220px]";

  return (
    <Card
      className={`${cardSize} flex-shrink-0 overflow-hidden border-0 bg-neutral-800 p-0`}
    >
      <Skeleton className="h-full w-full bg-neutral-500" />
    </Card>
  );
};

export const BackdropImageCardSkeleton = () => (
  <ImageCardSkeletonBase size="backdrop" />
);

export const PosterImageCardSkeleton = () => (
  <ImageCardSkeletonBase size="poster" />
);

export const GridBackdropImageCardSkeleton = () => (
  <ImageCardSkeletonBase size="grid-backdrop" />
);

export const GridPosterImageCardSkeleton = () => (
  <ImageCardSkeletonBase size="grid-poster" />
);

export default ImageCardSkeletonBase;
