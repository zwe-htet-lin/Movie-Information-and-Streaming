"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/useTMDB";
import { getYear } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBoxSkeleton from "./SearchBoxSkeleton";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data: searchResults, isLoading } = useSearch(1, query);
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
          className="rounded-full px-6 py-5 text-center text-primary placeholder:text-sm placeholder:font-semibold placeholder:text-white/60 transition-300 bg-neutral-900 hover:bg-neutral-900/75 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 size-4 text-primary" />
      </div>

      {showDropdown && (
        <ul className="absolute z-50 top-full w-full bg-background rounded-xl shadow-lg max-h-[330px] overflow-y-auto hide-scrollbar">
          {isLoading
            ? [...Array(5)].map((_, index) => <SearchBoxSkeleton key={index} />)
            : searchResults?.results
                .filter((search) => search.media_type !== "person")
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${item.media_type}/${item.id}`}
                      onClick={() => handleSelect()}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 transition-300 hover:bg-muted-foreground/30 hover:text-primary focus:bg-muted-foreground/30 focus:text-primary cursor-pointer"
                    >
                      <div className="w-[50] h-[50] flex-shrink-0 rounded overflow-hidden">
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
                        <span className="font-semibold truncate">
                          {item.title || item.name || ""}
                        </span>
                        <span className="font-medium opacity-60 text-sm">
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
