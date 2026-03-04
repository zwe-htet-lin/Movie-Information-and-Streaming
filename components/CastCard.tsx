import { formatToSlug } from "@/lib/utils";
import { Cast } from "@/types/tmdb";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

interface Props {
  cast: Cast;
  type: string;
  size?: "default" | "cast";
}

const CastCardBase = ({ cast, type, size }: Props) => {
  const cardSize =
    size === "cast" ? "h-[300px] w-[160px] sm:h-[320px] sm:w-[180px]" : "";

  const cardImageHeight = size === "cast" ? "h-[65%]" : "h-[75%]";

  const cardContentHeight = size === "cast" ? "h-[35%]" : "h-[25%]";

  return (
    <Card
      className={`${cardSize} flex-shrink-0 gap-0 overflow-hidden border-0 p-0`}
    >
      <Link href={`/person/${cast.id}-${formatToSlug(cast.name)}`}>
        <div className={`${cardImageHeight} w-full`}>
          <img
            src={
              cast.profile_path === null
                ? `/no-image-available.png`
                : `https://image.tmdb.org/t/p/original${cast.profile_path}`
            }
            alt={cast.name}
            className="h-full w-full rounded-t-lg object-cover"
          />
        </div>
      </Link>
      <CardContent
        className={`${cardContentHeight} hide-scrollbar overflow-y-scroll px-2 py-3`}
      >
        <p className="text-sm leading-none font-semibold text-white transition hover:opacity-70">
          <Link href={`/person/${cast.id}-${formatToSlug(cast.name)}`}>
            {cast.name}
          </Link>
        </p>
        {type === "cast" || type === "Acting" ? (
          <>
            <p className="mt-2 cursor-auto text-sm leading-none text-gray-300">
              {cast.character}
            </p>
            {cast.roles && (
              <>
                <p className="mt-2 cursor-auto text-sm leading-none text-gray-300">
                  {cast.roles[0].character}
                </p>
                <p className="mt-2 cursor-auto text-xs leading-none text-neutral-400 sm:text-[13px]">
                  {cast.total_episode_count} Episodes
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <p className="mt-2 cursor-auto text-sm leading-none text-gray-300">
              {cast.job}
            </p>
            {cast.jobs && (
              <>
                <p className="mt-2 cursor-auto text-sm leading-none text-gray-300">
                  {cast.jobs.map((job) => job.job).join(", ")}
                </p>
                <p className="mt-2 cursor-auto text-xs leading-none text-neutral-400 sm:text-[13px]">
                  {cast.total_episode_count} Episodes
                </p>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const CastCard = (props: Props) => (
  <CastCardBase {...props} size="cast" />
);

export const CastGridCard = (props: Props) => (
  <CastCardBase {...props} size="default" />
);
