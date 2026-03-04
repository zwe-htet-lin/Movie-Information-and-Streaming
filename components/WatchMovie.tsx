import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRating } from "@/hooks/useRating";
import { useMovieDetails } from "@/hooks/useTMDB";
import { config } from "@/lib/config";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import WatchMovieSkeleton from "./WatchMovieSkeleton";

interface Props {
  tmdbId: number;
  mediaType: string;
}

const WatchMovie = ({ tmdbId, mediaType }: Props) => {
  const { status } = useSession();
  const { data: tmdb, isLoading } = useMovieDetails(tmdbId, mediaType);

  const {
    isRated,
    rate,
    isLoading: isLoadingRating,
  } = useRating(tmdb!, mediaType, status);

  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  // Safely get seasons data with validation
  const validSeasons = useMemo(() => {
    if (!tmdb?.seasons || !Array.isArray(tmdb.seasons)) return [];
    return tmdb.seasons.filter((s) => s && s.season_number > 0);
  }, [tmdb]);

  const numberOfEpisodes = useMemo(() => {
    if (!validSeasons || validSeasons.length === 0) return 0;
    const currentSeason = validSeasons.find((s) => s.season_number === season);
    return currentSeason?.episode_count ?? 0;
  }, [validSeasons, season]);

  // Reset episode when season changes
  useEffect(() => {
    setEpisode(1);
  }, [season]);

  // Show loading state
  if (status === "authenticated" && (isLoading || !tmdb || isLoadingRating)) {
    return <WatchMovieSkeleton />;
  }

  if (!tmdb) {
    return (
      <section className="bg-accent-foreground">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
          <div className="mb-5 flex items-center">
            <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
            <h2 className="text-xl font-bold sm:text-2xl">WATCH NOW</h2>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/40 py-20">
            <p className="text-center text-neutral-400">
              Unable to load {mediaType === "tv" ? "TV show" : "movie"}{" "}
              information.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mediaType === "tv" && (!validSeasons || validSeasons.length === 0)) {
    return (
      <section className="bg-accent-foreground">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
          <div className="mb-5 flex items-center">
            <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
            <h2 className="text-xl font-bold sm:text-2xl">WATCH NOW</h2>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900/40 py-20">
            <p className="text-center text-neutral-400">
              No seasons available for this TV show.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const src =
    mediaType === "tv"
      ? `${config.vidsrcUrl}/${mediaType}/${tmdbId}/${season}-${episode}`
      : `${config.vidsrcUrl}/${mediaType}/${tmdbId}`;

  const handleNext = () => {
    if (numberOfEpisodes > 0 && episode < numberOfEpisodes) {
      setEpisode((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (episode > 1) {
      setEpisode((prev) => prev - 1);
    }
  };

  const ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
      <div className="mb-5 flex items-center">
        <div className="bg-primary mr-2 h-6 w-1 rounded sm:h-7"></div>
        <h2 className="text-xl font-bold sm:text-2xl">WATCH NOW</h2>
      </div>
      {/* {isRated ? ( */}
      <>
        <div className="aspect-video">
          <iframe
            src={src}
            className="h-full w-full"
            allowFullScreen
            frameBorder={0}
            title="Video Player"
          />
        </div>
        {mediaType === "tv" && validSeasons.length > 0 && (
          <div className="mt-5 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <span className="font-medium">Season:</span>
              <Select
                value={season.toString()}
                onValueChange={(val) => setSeason(Number(val))}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  {validSeasons.map((s) => (
                    <SelectItem
                      key={s.season_number}
                      value={s.season_number.toString()}
                    >
                      Season {s.season_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {numberOfEpisodes > 0 && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={handlePrev}
                  disabled={episode === 1}
                  variant="outline"
                >
                  Prev
                </Button>
                <span className="font-medium">
                  Episode {episode} / {numberOfEpisodes}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={episode === numberOfEpisodes}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </>
      {/* // ) : (
      //   <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-neutral-700 bg-neutral-900/40 px-4 py-10">
      //     <p className="text-center text-base font-medium text-neutral-200 md:text-lg">
      //       Rate this {mediaType === "tv" ? "TV show" : "movie"} out of 10 to
      //       unlock streaming.
      //     </p>
      //     <div className="flex flex-wrap items-center justify-center gap-2">
      //       {ratingOptions.map((value) => (
      //         <Button
      //           key={value}
      //           variant="outline"
      //           className="w-10"
      //           onClick={() => rate(value)}
      //         >
      //           {value}
      //         </Button>
      //       ))}
      //     </div>
      //   </div>
      // )} */}
    </section>
  );
};

export default WatchMovie;
