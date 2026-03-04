import { Skeleton } from "@/components/ui/skeleton";

const BannerHomeSkeleton = () => {
  return (
    <div className="relative h-[70vh] w-full bg-gray-900 md:h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_#181818_0%,_#181818_0%,_rgba(24,24,24,0)_100%)]" />

      <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col items-center justify-end gap-4 px-5 pb-10 md:items-start md:px-10">
        <Skeleton className="h-10 w-3/4 rounded-full bg-neutral-500 sm:w-2/3 md:w-1/2 lg:w-2/5" />
        <div className="flex flex-wrap items-center space-x-4 text-sm">
          <Skeleton className="h-5 w-12 rounded-full bg-neutral-500" />
          <Skeleton className="h-5 w-16 bg-neutral-500" />
          <Skeleton className="h-5 w-12 bg-neutral-500" />
          <Skeleton className="hidden h-5 w-24 bg-neutral-500 md:inline" />
          <Skeleton className="h-5 w-16 bg-neutral-500" />
        </div>
        <Skeleton className="h-5 w-40 bg-neutral-500 md:hidden" />
        <Skeleton className="h-5 w-1/2 bg-neutral-500" />
        <Skeleton className="h-4 w-full bg-neutral-500 lg:w-3/4" />
        <Skeleton className="h-4 w-5/6 bg-neutral-500 lg:w-3/5" />
        <Skeleton className="h-4 w-2/3 bg-neutral-500 lg:w-1/2" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-40 rounded-full bg-neutral-500" />
          <Skeleton className="h-10 w-40 rounded-full bg-neutral-500" />
        </div>
        {/* <Skeleton className="h-8 w-40 rounded-full bg-neutral-500 md:hidden" /> */}
      </div>
    </div>
  );
};

export default BannerHomeSkeleton;
