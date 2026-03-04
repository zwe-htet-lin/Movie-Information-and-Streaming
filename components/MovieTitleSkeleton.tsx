import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const MovieTitleSkeleton = () => {
  return (
    <Card className="rounded-none">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 bg-neutral-500" />
        </div>

        <div className="hidden items-center space-x-5 sm:flex">
          <Skeleton className="h-4 w-12 bg-neutral-500" />
          <Skeleton className="h-4 w-14 bg-neutral-500" />
          <Skeleton className="h-4 w-14 bg-neutral-500" />
        </div>

        <div className="sm:hidden">
          <Skeleton className="h-5 w-14 bg-neutral-500" />
        </div>
      </div>

      <div className="flex items-end gap-3 md:gap-4">
        <Skeleton className="h-[120px] w-[80px] rounded-md bg-neutral-500 md:h-[135px] md:w-[90px] lg:h-[150px] lg:w-[100px]" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40 bg-neutral-500 md:h-7 md:w-56 lg:h-8 lg:w-64" />
          <Skeleton className="h-8 w-52 bg-neutral-500 md:h-10 md:w-72 lg:h-12 lg:w-96" />
        </div>
      </div>
    </Card>
  );
};

export default MovieTitleSkeleton;
