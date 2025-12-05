"use client";

import BookmarkBreadcrumb from "@/components/BookmarkBreadcrumb";
import CustomPagination from "@/components/CustomPagination";
import { MovieCard } from "@/components/MovieCard";
import { MovieCardSkeleton } from "@/components/MovieCardSkeleton";
import { Button } from "@/components/ui/button";
import { formatLabel } from "@/lib/utils";
import { useAppSelector } from "@/store/hook";
import { Movie } from "@/types/tmdb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BookmarkPath() {
  const router = useRouter();
  const { status } = useSession();

  const params = useParams();
  const bookmarkValue = params.path as string;
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const {
    value: bookmarks,
    isInitializing,
    isLoading,
  } = useAppSelector((state) => state.bookmark);

  const filteredBookmarks = bookmarks.filter(
    (b) => b.bookmark === bookmarkValue
  );

  const totalPages = Math.ceil(filteredBookmarks.length / 20);

  const paginatedBookmarks = () => {
    const start = (page - 1) * 20;
    const end = start + 20;
    return filteredBookmarks.slice(start, end);
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
        <h2 className="text-xl md:text-2xl font-semibold mb-6">MY BOOKMARKS</h2>
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
      <h2 className="text-xl md:text-2xl font-semibold mb-6">MY BOOKMARKS</h2>
      <BookmarkBreadcrumb value={bookmarkValue} />
      {paginatedBookmarks().length ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
            {paginatedBookmarks().map((bookmark, index) => (
              <MovieCard
                key={index}
                movie={
                  {
                    id: bookmark.tmdb_id,
                    title: bookmark.title,
                    release_date: bookmark.release_date,
                    genre_ids: bookmark.genre_ids,
                    poster_path: bookmark.poster_path,
                  } as Movie
                }
                mediaType={bookmark.media_type}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <CustomPagination
              endpoint="bookmark"
              path={bookmarkValue}
              page={page}
              count={totalPages}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center mt-6">
          <h2 className="">
            You haven't added any movies to your "{formatLabel(bookmarkValue)}"
            bookmark.
          </h2>
          <Button variant="link" className="px-2">
            <Link href="/">Explore now</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
