"use client";

import VideoGrid from "@/components/VideoGrid";
import { useParams } from "next/navigation";

const page = () => {
  const { id: param, path } = useParams<{ id: string; path: string }>();
  const tmdbId = parseInt(param.split("-")[0]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <VideoGrid tmdbId={tmdbId} mediaType="tv" param={param} path={path} />
    </section>
  );
};

export default page;
