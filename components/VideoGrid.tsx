"use client";

import { useMovieDetails, useVideos } from "@/hooks/useTMDB";
import { useEffect, useMemo, useState } from "react";
import CustomPagination from "./CustomPagination";
import MovieTitle from "./MovieTitle";
import MovieTitleSkeleton from "./MovieTitleSkeleton";
import { VideoGridCard } from "./VideoCard";
import { VideoGridCardSkeleton } from "./VideoCardSkeleton";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  tmdbId: number;
  mediaType: string;
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
  const [page, setPage] = useState(1);
  const [videoType, setVideoType] = useState("All");

  const { data: videos = [], isLoading } = useVideos(tmdbId, mediaType);
  const { data: tmdb, isLoading: detailsLoading } = useMovieDetails(
    tmdbId,
    mediaType,
  );

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      if (videoType !== "All" && video.type !== videoType) return false;
      return true;
    });
  }, [videos, videoType]);

  const paginatedVideos = () => {
    const start = (page - 1) * 21;
    const end = start + 21;
    return filteredVideos.slice(start, end);
  };

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / 21));

  useEffect(() => {
    setPage(1);
  }, [videoType]);

  useEffect(() => {
    if (page > totalPages) {
      return;
    }
  }, [page]);

  return (
    <section className="pt-10">
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

      <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <VideoGridCardSkeleton key={index} />
            ))
          : paginatedVideos().map((video) => (
              <VideoGridCard key={video.id} video={video} />
            ))}
      </div>
      {filteredVideos.length > 20 && (
        <div className="mt-10 flex w-full justify-center">
          <CustomPagination count={totalPages} page={page} setPage={setPage} />
        </div>
      )}
      {!isLoading && paginatedVideos().length === 0 && (
        <p className="my-10 flex w-full justify-center text-sm text-gray-400">
          No videos found.
        </p>
      )}
    </section>
  );
};

export default VideoGrid;
