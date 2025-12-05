import { Cast } from "@/types/tmdb";
import { Card, CardContent } from "./ui/card";

interface Props {
  cast: Cast;
}

const CastCard = ({ cast }: Props) => {
  return (
    <Card className="w-[150px] sm:w-[160px] h-[260px] sm:h-[300px] gap-0 p-0 border-0 flex-shrink-0 overflow-hidden">
      <div className="w-full h-[70%]">
        <img
          src={
            cast.profile_path === null
              ? `/no-image-available.png`
              : `https://image.tmdb.org/t/p/w1280${cast.profile_path}`
          }
          alt={cast.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-2 py-3 overflow-x-auto hide-scrollbar">
        <p className="text-sm text-white font-semibold leading-tight hover:opacity-70 transition">
          {cast.name}
        </p>
        <p className="text-xs sm:text-[13px] text-gray-300 mt-1">
          {cast.character}
        </p>
      </CardContent>
    </Card>
  );
};

export default CastCard;
