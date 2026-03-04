"use client";

import { useMovieDetails, useVideos } from "@/hooks/useTMDB";
import { useState } from "react";
import MovieTitle from "./MovieTitle";
import MovieTitleSkeleton from "./MovieTitleSkeleton";
import { VideoGridCard } from "./VideoCard";
import { VideoGridCardSkeleton } from "./VideoCardSkeleton";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
  path: string;
}

const videoTypes = [
  { value: "All", label: "All" },
  { value: "Trailer", label: "Trailers" },
  { value: "Teaser", label: "Teasers" },
  { value: "Clip", label: "Clips" },
  { value: "Behind the Scenes", label: "Behind the Scenes" },
  { value: "Featurette", label: "Featurettes" },
];

const VideoGrid = ({ tmdbId, mediaType }: Props) => {
  const { data: videos = [], isLoading } = useVideos(tmdbId, mediaType);
  const { data: tmdb, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const [videoType, setVideoType] = useState("All");

  const filteredVideos = videos.filter((video) => {
    if (videoType !== "All" && video.type !== videoType) return false;
    return true;
  });

  return (
    <div className="pt-10">
      {!tmdb || detailsLoading ? (
        <MovieTitleSkeleton />
      ) : (
        <MovieTitle movie={tmdb} mediaType={mediaType} title="Videos" />
      )}

      {!isLoading && videos.length > 0 && (
        <Card className="mt-5 min-w-0 rounded-none">
          <Tabs
            value={videoType}
            onValueChange={setVideoType}
            className="hide-scrollbar overflow-scroll"
          >
            <TabsList className="h-fit gap-5 bg-transparent p-0">
              {videoTypes.map((videoType) => {
                const count =
                  videoType.value === "All"
                    ? videos.length
                    : videos.filter((v) => v.type === videoType.value).length;

                if (count === 0) return null;

                return (
                  <TabsTrigger
                    key={videoType.value}
                    value={videoType.value}
                    className="data-[state=active]:border-b-primary data-[state=active]:bg-accent-foreground h-fit cursor-pointer rounded-none border-b-2 p-0 font-semibold transition-all duration-300 data-[state=active]:scale-105"
                  >
                    {videoType.label}
                    <span className="font-medium text-neutral-300">
                      {count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 pt-5 sm:grid-cols-2 md:grid-cols-3">
        {isLoading &&
          [...Array(9)].map((_, index) => (
            <VideoGridCardSkeleton key={index} />
          ))}

        {!isLoading &&
          filteredVideos.map((video) => (
            <VideoGridCard key={video.id} video={video} />
          ))}

        {!isLoading && (filteredVideos.length === 0 || videos.length === 0) && (
          <p className="col-span-full py-10 text-center text-sm text-gray-400">
            No videos found.
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoGrid;
