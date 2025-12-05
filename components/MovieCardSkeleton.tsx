import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface Props {
  width: string;
  height: string;
}

const BaseMovieCardSkeleton = ({ width, height }: Props) => {
  return (
    <Card className="relative p-0 border-0 flex-shrink-0 rounded-xl overflow-hidden animate-pulse">
      <Skeleton className={`${width} ${height} object-cover bg-neutral-500`} />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-2 flex flex-col justify-end">
        <Skeleton className="w-10 h-3 mb-1 bg-gray-700" />
        <Skeleton className="w-4/5 h-4 mb-2 bg-gray-600 rounded-sm" />
        <Skeleton className="w-1/2 h-3 bg-primary/50 rounded-sm" />
      </div>
    </Card>
  );
};

export const MovieCardSkeleton = () => (
  <BaseMovieCardSkeleton
    width="w-full"
    height="h-[240px] sm:h-[260px] md:h-[300px]"
  />
);

export const TrendingMovieCardSkeleton = () => (
  <BaseMovieCardSkeleton width="w-36 sm:w-40 md:w-44" height="h-56 md:h-64" />
);
