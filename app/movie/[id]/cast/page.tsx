"use client";

import CastGrid from "@/components/CastGrid";
import { useParams, useSearchParams } from "next/navigation";

const page = () => {
  const { id: param } = useParams<{ id: string }>();
  const tmdbId = parseInt(param.split("-")[0]);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <CastGrid tmdbId={tmdbId} mediaType={"movie"} page={page} param={param} />
    </section>
  );
};

export default page;
