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
import { useEffect, useState } from "react";
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
  } = useRating(tmdb, mediaType, status);

  const [season, setSeason] = useState(1);
  const [episode, setEpisode] = useState(1);

  const numberOfSeasons = tmdb?.number_of_seasons ?? 1;
  const numberOfEpisodes =
    tmdb?.seasons?.find((s) => s.season_number === season)?.episode_count ?? 1;

  useEffect(() => {
    setEpisode(1);
  }, [season]);

  if (status === "authenticated" && (isLoading || !tmdb || isLoadingRating)) {
    return <WatchMovieSkeleton />;
  }

  const src =
    mediaType === "tv"
      ? `${config.vidsrcUrl}/${mediaType}/${tmdbId}/${season}-${episode}`
      : `${config.vidsrcUrl}/${mediaType}/${tmdbId}`;

  const handleNext = () => {
    if (episode < numberOfEpisodes) setEpisode((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (episode > 1) setEpisode((prev) => prev - 1);
  };

  const ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="px-5 py-20 bg-accent-foreground">
      <h2 className="mb-5 text-lg font-semibold md:text-xl">WATCH NOW</h2>

      {isRated ? (
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

          {mediaType === "tv" && numberOfSeasons > 0 && (
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
                    {tmdb!.seasons
                      ?.filter((s: any) => s.season_number > 0)
                      .map((s: any) => (
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
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-neutral-700 bg-neutral-900/40 px-4 py-10">
          <p className="text-center text-base font-medium text-neutral-200 md:text-lg">
            Rate this {mediaType === "tv" ? "TV show" : "movie"} out of 10 to
            unlock streaming.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {ratingOptions.map((value) => (
              <Button
                key={value}
                variant="outline"
                className="w-10"
                onClick={() => rate(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchMovie;
