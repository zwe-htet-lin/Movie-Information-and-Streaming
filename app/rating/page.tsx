"use client";

import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hook";
import { Movie } from "@/types/tmdb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Rating() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    value: ratings,
    isInitializing,
    isLoading,
  } = useAppSelector((state) => state.rating);

  const totalPages = Math.max(1, Math.ceil(ratings.length / 20));

  const paginatedRatings = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return ratings.slice(start, end);
  };

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  if (!isInitializing || isLoading) {
    return (
      <div className="pt-25 px-5">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">MY RATINGS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
          {[...Array(10)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-25 px-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">MY RATINGS</h2>
      {ratings.length ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
            {paginatedRatings().map((rating, index) => (
              <MovieCard
                key={index}
                movie={
                  {
                    id: rating.tmdb_id,
                    title: rating.title,
                    release_date: rating.release_date,
                    genre_ids: rating.genre_ids,
                    poster_path: rating.poster_path,
                  } as Movie
                }
                mediaType={rating.media_type}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <CustomPagination
              endpoint="rating"
              page={page}
              count={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <h2>You haven&apos;t rated any movies.</h2>
          <Button variant="link" className="px-2">
            <Link href="/">Explore now</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
