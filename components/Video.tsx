"use client";

import { useVideos } from "@/hooks/useTMDB";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { VideoCard } from "./VideoCard";
import { VideoCardSkeleton } from "./VideoCardSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
  param: string;
}

const Video = ({ tmdbId, mediaType, param }: Props) => {
  const { data: videos, isLoading } = useVideos(tmdbId, mediaType);

  const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <section className="relative mx-auto w-full max-w-7xl px-5 pt-10 md:px-10">
      <Link
        href={`/${mediaType}/${param}/video`}
        className="group flex w-fit items-center space-x-2"
      >
        <div className="bg-primary h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">VIDEOS</h2>
        <div className="ml-1 flex items-center">
          <span className="group-focus:text-primary group-hover:text-primary font-medium text-neutral-300 transition duration-300">
            {videos && videos.length > 0 ? videos.length : ""}
          </span>
          <FaChevronRight className="group-focus:text-primary group-hover:text-primary size-5 transition duration-300 sm:size-6" />
        </div>
      </Link>
      {children}
    </section>
  );

  // Show loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="flex gap-6 overflow-x-auto scroll-smooth py-5">
          {[...Array(10)].map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </Layout>
    );
  }

  // Don't render if no videos
  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="flex gap-6 overflow-x-auto scroll-smooth py-5">
        {videos.slice(0, 10).map((video, index) => (
          <VideoCard video={video} key={video.id || index} />
        ))}
      </div>
    </Layout>
  );
};

export default Video;
