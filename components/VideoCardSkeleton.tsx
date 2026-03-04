import { Skeleton } from "./ui/skeleton";

interface Props {
  size?: "default" | "video";
}

const VideoCardSkeletonBase = ({ size }: Props) => {
  const cardSize =
    size === "video"
      ? "w-[300px] sm:w-[320px] aspect-video"
      : "w-full aspect-video";

  return (
    <div>
      <Skeleton className={`${cardSize} rounded-md bg-neutral-500`} />

      <Skeleton className="mt-4 h-5 w-[75%] bg-neutral-500" />

      <Skeleton className="mt-2 h-4 w-24 bg-neutral-500" />
    </div>
  );
};

export const VideoCardSkeleton = () => <VideoCardSkeletonBase size="video" />;

export const VideoGridCardSkeleton = () => (
  <VideoCardSkeletonBase size="default" />
);
