"use client";

import ImageGrid from "@/components/ImageGrid";
import { useParams } from "next/navigation";

const page = () => {
  const { id: param } = useParams<{ id: string }>();
  const tmdbId = parseInt(param.split("-")[0]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <ImageGrid tmdbId={tmdbId} mediaType="tv" param={param} />
    </section>
  );
};

export default page;
