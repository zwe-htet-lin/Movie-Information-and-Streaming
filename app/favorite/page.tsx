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
import { useEffect } from "react";

export default function Favorite() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    value: favorites,
    isInitializing,
    isLoading,
  } = useAppSelector((state) => state.favorite);
  const totalPages = Math.ceil(favorites.length / 20);

  const paginatedFavorites = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return favorites.slice(start, end);
  };

  useEffect(() => {
    if (page > totalPages || isNaN(page)) {
      return;
    }
  }, [page]);

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return;
  }

  if (!isInitializing || isLoading) {
    return (
      <div className="pt-25 px-5">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">MY FAVORITES</h2>
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
      <h2 className="text-xl md:text-2xl font-semibold mb-6">MY FAVORITES</h2>
      {favorites.length ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
            {paginatedFavorites().map((favorite, index) => (
              <MovieCard
                key={index}
                movie={
                  {
                    id: favorite.tmdb_id,
                    title: favorite.title,
                    release_date: favorite.release_date,
                    genre_ids: favorite.genre_ids,
                    poster_path: favorite.poster_path,
                  } as Movie
                }
                mediaType={favorite.media_type}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <CustomPagination
              endpoint="favorite"
              page={page}
              count={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <h2 className="">You haven't added any favorite movies.</h2>
          <Button variant="link" className="px-2">
            <Link href="/">Explore now</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
