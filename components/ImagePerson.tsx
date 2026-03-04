"use client";

import { useImages, useMovieDetails } from "@/hooks/useTMDB";
import Link from "next/link";
import { useMemo } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { PosterImageCard } from "./ImageCard";
import { PosterImageCardSkeleton } from "./ImageCardSkeleton";

interface Props {
  tmdbId: number;
  param: string;
}

const Image = ({ tmdbId, param }: Props) => {
  const { data: profiles, isLoading } = useImages(tmdbId, "person", "profile");
  const { data: movie } = useMovieDetails(tmdbId, "person");

  const filteredProfiles = useMemo(() => {
    if (!profiles || !profiles.length) return [];

    const origin = movie?.origin_country?.[0];

    const filtered = profiles.filter(
      (i) => i.iso_3166_1 === null || (origin && i.iso_3166_1 === origin),
    );
    if (filtered.length > 0) return filtered;

    return profiles;
  }, [profiles, movie]);

  //   useEffect(() => {
  //     if (
  //       imageGalleryType === "backdrop" &&
  //       filteredProfiles.length === 0 &&
  //     ) {
  //       dispatch(setImageGalleryType("poster"));
  //     } else if (
  //       imageGalleryType === "poster" &&
  //       filteredProfiles.length > 0
  //     ) {
  //       dispatch(setImageGalleryType("backdrop"));
  //     }
  //   }, [
  //     filteredProfiles.length,
  //     imageGalleryType,
  //     dispatch,
  //   ]);

  const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <section className="mx-auto min-h-[300px] w-full max-w-7xl px-5 py-10 md:px-10">
      <Link
        href={`/person/${param}/image`}
        className="group flex w-fit items-center space-x-2"
      >
        <div className="bg-primary h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">IMAGES</h2>
        <div className="ml-1 flex items-center">
          <span className="group-focus:text-primary group-hover:text-primary font-medium text-neutral-300 transition duration-300">
            {filteredProfiles && filteredProfiles.length > 0
              ? filteredProfiles.length
              : ""}
          </span>
          <FaChevronRight className="group-focus:text-primary group-hover:text-primary size-5 transition duration-300 sm:size-6" />
        </div>
      </Link>
      {children}
    </section>
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="flex gap-6 overflow-x-auto scroll-smooth py-5">
          {[...Array(10)].map((_, index) => (
            <PosterImageCardSkeleton key={index} />
          ))}
        </div>
      </Layout>
    );
  }

  if (filteredProfiles.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="flex gap-6 overflow-x-auto scroll-smooth py-5">
        {profiles.slice(0, 10).map((image, index) => (
          <PosterImageCard
            key={index}
            image={image}
            mediaType={"person"}
            param={param}
            type="person"
            index={index}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Image;
