"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useTMDB";
import { formatToSlug, getYear } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBoxSkeleton from "./SearchBoxSkeleton";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const {
    data: { searchResults },
    isLoading,
  } = useSearch(1, query);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = () => {
    setShowDropdown(false);
    setQuery("");
  };

  const handleEnter = () => {
    if (query.trim()) {
      setQuery("");
      setShowDropdown(false);
      router.push(`/search?query=${query}&page=1`);
    }
  };

  return (
    <div className="relative">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 300);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEnter();
          }}
          className="text-primary transition-300 rounded-full border-0 bg-neutral-700 px-6 py-5 text-center placeholder:text-sm placeholder:font-semibold placeholder:text-white/60 hover:bg-neutral-700/75 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Search className="text-primary absolute top-1/2 right-5 size-4 -translate-y-1/2" />
      </div>

      {showDropdown && (
        <ul className="hide-scrollbar absolute top-full z-50 max-h-[330px] w-full overflow-y-auto rounded-xl bg-neutral-700 shadow-lg">
          {isLoading
            ? [...Array(5)].map((_, index) => <SearchBoxSkeleton key={index} />)
            : searchResults
                .filter((search) => search.media_type !== "person")
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${item.media_type}/${item.id}-${formatToSlug(item.title || item.name)}`}
                      onClick={() => handleSelect()}
                      className="transition-300 hover:bg-muted-foreground/30 hover:text-primary focus:bg-muted-foreground/30 focus:text-primary flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left"
                    >
                      <div className="h-[50] w-[50] flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
                              : "/no-image-available.png"
                          }
                          alt={item.title || item.name || ""}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="truncate font-semibold">
                          {item.title || item.name || ""}
                        </span>
                        <span className="text-sm font-medium opacity-60">
                          {item.release_date
                            ? getYear(item.release_date)
                            : getYear(item.first_air_date!)}{" "}
                          (
                          {item.media_type === "movie"
                            ? "Movie"
                            : item.media_type.toUpperCase()}
                          )
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
