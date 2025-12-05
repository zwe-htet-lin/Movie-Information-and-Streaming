import { Skeleton } from "./ui/skeleton";

const SearchBoxSkeleton = () => {
  return (
    <li className="px-4 py-2">
      <div className="flex items-center gap-3">
        <Skeleton className="w-[60] h-[50] rounded bg-neutral-500" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-3/4 bg-neutral-500" />
          <Skeleton className="h-3 w-1/2 bg-neutral-500" />
        </div>
      </div>
    </li>
  );
};

export default SearchBoxSkeleton;
