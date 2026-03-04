import { formatToSlug, getYear } from "@/lib/utils";
import { Person } from "@/types/tmdb";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

interface Props {
  person: Person;
}

const PersonCard = ({ person }: Props) => {
  return (
    <Card className="flex-shrink-0 gap-0 overflow-hidden border-0 p-0">
      <Link href={`/person/${person.id}-${formatToSlug(person.name)}`}>
        <div className="w-full">
          <img
            src={
              person.profile_path === null
                ? `/no-image-available.png`
                : `https://image.tmdb.org/t/p/w1280${person.profile_path}`
            }
            alt={person.name}
            className="h-full w-full rounded-t-lg object-cover"
          />
        </div>
      </Link>
      <CardContent className="hide-scrollbar overflow-y-scroll px-2 py-3">
        <p className="text-sm leading-tight font-semibold text-white transition hover:opacity-70 md:text-base">
          <Link href={`/person/${person.id}-${formatToSlug(person.name)}`}>
            {person.name}
          </Link>
        </p>
        <p className="mt-1 cursor-auto text-xs leading-tight text-gray-300 sm:text-sm">
          {person.known_for.map((known, index) => (
            <span key={index}>
              {known.name || known.title} (
              {getYear(known.release_date || known.first_air_date)})
              {index === person.known_for.length - 1 ? "" : ", "}
            </span>
          ))}
        </p>
      </CardContent>
    </Card>
  );
};

export default PersonCard;
