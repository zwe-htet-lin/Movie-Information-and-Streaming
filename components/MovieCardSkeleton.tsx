import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface Props {
  size: "default" | "trending";
}

const MovieCardSkeletonBase = ({ size }: Props) => {
  const cardSize =
    size === "default"
      ? "aspect-[2/3]"
      : "h-[280px] w-[170px] sm:h-[300px] sm:w-[190px]";

  return (
    <Card className="relative flex-shrink-0 animate-pulse overflow-hidden rounded-xl border-0 p-0">
      <Skeleton className={`${cardSize} bg-neutral-500 object-cover`} />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/30 to-transparent p-2">
        <Skeleton className="mb-1 h-3 w-10 bg-gray-700" />
        <Skeleton className="mb-2 h-4 w-4/5 rounded-sm bg-gray-600" />
        <Skeleton className="bg-primary/50 h-3 w-1/2 rounded-sm" />
      </div>
    </Card>
  );
};

export const MovieCardSkeleton = () => <MovieCardSkeletonBase size="default" />;

export const MovieTrendingCardSkeleton = () => (
  <MovieCardSkeletonBase size="trending" />
);
