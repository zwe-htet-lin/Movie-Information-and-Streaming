import { formatToSlug, getYear } from "@/lib/utils";
import { Credit } from "@/types/tmdb";
import Link from "next/link";

interface Props {
  credit: Credit;
}

const CreditCard = ({ credit }: Props) => {
  return (
    <div>
      <div className="flex gap-10 md:gap-15">
        <p className="text-sm font-medium md:text-base">
          {getYear(credit.release_date || credit.first_air_date)}
        </p>
        <Link
          className="group flex w-full gap-2"
          href={`/${credit.media_type}/${credit.id}-${formatToSlug(credit.title || credit.name)}`}
        >
          <div className="h-[50px] w-[40px] shrink-0 overflow-hidden rounded-sm md:h-[60px]">
            <img
              src={
                credit.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${credit.backdrop_path}`
                  : "/no-image-available.png"
              }
              alt={credit.name || credit.title}
              className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:opacity-75 group-focus:opacity-75"
            />
          </div>
          <div>
            <p className="truncate text-sm leading-tight font-semibold underline-offset-4 transition duration-300 ease-in-out group-hover:underline group-focus:underline md:text-base">
              {credit.name || credit.title}
            </p>
            <p className="leading-tight text-gray-300">{credit.character}</p>
            {credit.job && (
              <p className="leading-tight text-gray-300">{credit.job}</p>
            )}
            {credit.episode_count && (
              <p className="text-[13px] leading-tight text-gray-400">
                {credit.episode_count} episodes
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreditCard;
