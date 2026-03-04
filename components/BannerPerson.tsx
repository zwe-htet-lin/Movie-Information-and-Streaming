import { usePersonDetails, useSocial } from "@/hooks/useTMDB";
import { getFormattedDate } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import BannerPersonSkeleton from "./BannerPersonSkeleton";
import ExpandableText from "./ExpandleText";

interface Props {
  tmdbId: number;
}

const BannerPerson = ({ tmdbId }: Props) => {
  const { data: person, isLoading } = usePersonDetails(tmdbId);
  const { data: social, isLoading: socialLoading } = useSocial(
    tmdbId,
    "person",
  );

  if (!person || !social || isLoading) return <BannerPersonSkeleton />;

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-5 py-10 pt-25 md:px-10">
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-5">
          <div className="h-[200px] w-[200px] shrink-0 overflow-hidden rounded-lg md:h-[465px] md:w-[300px]">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                  : "/no-image-available.png"
              }
              alt={person.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="w-full text-center text-2xl font-bold md:text-left md:text-3xl lg:text-4xl">
              {person.name}
            </h1>
            {social.facebook_id && social.twitter_id && social.instagram_id && (
              <div className="mt-3 flex items-center justify-center space-x-2 md:hidden">
                {social.facebook_id && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                    href={`https://www.facebook.com/${social.facebook_id}`}
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {social.twitter_id && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                    href={`https://www.x.com/${social.twitter_id}`}
                  >
                    <FaXTwitter size={18} />
                  </a>
                )}
                {social.instagram_id && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                    href={`https://www.instagram.com/${social.instagram_id}`}
                  >
                    <Instagram size={18} />
                  </a>
                )}
              </div>
            )}
            <div className="flex flex-col-reverse md:flex-col">
              <div className="mt-8 md:mt-4">
                <p className="mb-2 w-full text-lg font-bold text-gray-300 md:text-base">
                  Biography
                </p>
                <div className="font-medium">
                  <ExpandableText
                    text={
                      person.biography
                        ? person.biography
                        : `We don't have a biography for ${person.name}.`
                    }
                  />
                </div>
              </div>
              <div className="mt-8 md:mt-4">
                <p className="mb-2 w-full text-lg font-bold text-gray-300 md:text-base">
                  Personal Info
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-base leading-snug font-semibold">
                      Known For
                    </p>
                    <p className="text-sm font-medium text-gray-300">
                      {person.known_for_department
                        ? person.known_for_department
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-base leading-snug font-semibold">
                      Gender
                    </p>
                    <p className="text-sm font-medium text-gray-300">
                      {person.gender
                        ? person.gender === 1
                          ? "Female"
                          : "Male"
                        : "-"}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-base leading-snug font-semibold">
                      Birthday
                    </p>
                    <p className="text-sm font-medium text-gray-300">
                      {person.birthday
                        ? getFormattedDate(person.birthday)
                        : "-"}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-base leading-snug font-semibold">
                      Place of Birth
                    </p>
                    <p className="text-sm font-medium text-gray-300">
                      {person.place_of_birth ? person.place_of_birth : "-"}
                    </p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-base leading-snug font-semibold">
                      Also Know As
                    </p>
                    <p className="text-sm font-medium text-gray-300">
                      {person.also_known_as.length > 0
                        ? person.also_known_as.map((aka, index) => (
                            <span key={index}>{aka}</span>
                          ))
                        : "-"}
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-base leading-snug font-semibold">
                      Socials
                    </p>
                    {social.facebook_id &&
                    social.twitter_id &&
                    social.instagram_id ? (
                      <div className="mt-1 flex items-center space-x-2">
                        {social.facebook_id && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                            href={`https://www.facebook.com/${social.facebook_id}`}
                          >
                            <Facebook size={15} />
                          </a>
                        )}
                        {social.twitter_id && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                            href={`https://www.x.com/${social.twitter_id}`}
                          >
                            <FaXTwitter size={15} />
                          </a>
                        )}
                        {social.instagram_id && (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
                            href={`https://www.instagram.com/${social.instagram_id}`}
                          >
                            <Instagram size={15} />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div>-</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="mx-auto h-[1px] w-full max-w-[calc(80rem-40px)] bg-neutral-700 px-5 md:max-w-[calc(80rem-80px)] md:px-10"></div> */}
    </>
  );
};

export default BannerPerson;
