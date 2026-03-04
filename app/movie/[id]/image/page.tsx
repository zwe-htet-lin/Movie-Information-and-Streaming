import ImageGrid from "@/components/ImageGrid";
import React from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: param } = React.use(params);
  const tmdbId = parseInt(param.split("-")[0]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <ImageGrid tmdbId={tmdbId} mediaType="movie" param={param} />
    </section>
  );
};

export default page;
