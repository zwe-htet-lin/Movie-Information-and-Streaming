import { getFormattedDate } from "@/lib/utils";
import { Video } from "@/types/tmdb";
import { Play } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import VideoDialog from "./VideoDialog";

interface Props {
  video: Video;
  size?: "default" | "video";
}

const VideoCardBase = ({ video, size }: Props) => {
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  const cardSize =
    size === "video"
      ? "w-[300px] sm:w-[320px] aspect-video"
      : "w-full aspect-video";

  return (
    <div className={cardSize}>
      <Card
        className={`${cardSize} group relative flex flex-shrink-0 cursor-pointer overflow-hidden border-0 bg-green-300 p-0`}
        onClick={() => setOpenVideoDialog(true)}
      >
        <img
          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
          alt={video.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/70 backdrop-blur transition group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-white text-white" />
          </div>
        </div>
      </Card>
      <VideoDialog
        open={openVideoDialog}
        setOpen={setOpenVideoDialog}
        videoName={video.name}
        videoKey={video.key}
      />
      <div>
        <p
          className="mt-4 cursor-pointer leading-snug font-semibold text-white underline-offset-4 transition hover:underline focus:underline"
          onClick={() => setOpenVideoDialog(true)}
        >
          {video.name}
        </p>
        <p className="mt-2 cursor-auto text-sm text-neutral-300">
          {getFormattedDate(video.published_at)}
        </p>
      </div>
    </div>
  );
};

export const VideoCard = (props: Props) => (
  <VideoCardBase {...props} size="video" />
);

export const VideoGridCard = (props: Props) => (
  <VideoCardBase {...props} size="default" />
);
