"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Social } from "@/types/tmdb";
import { Facebook, Globe, Instagram, Link2, X } from "lucide-react";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";

interface Props {
  social: Social;
  homepage?: string;
}

const SocialLinks = ({ social, homepage }: Props) => {
  const [open, setOpen] = useState(false);

  const hasLinks =
    social.facebook_id || social.twitter_id || social.instagram_id || homepage;

  if (!hasLinks) return null;

  return (
    <div className="relative">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Social links"
        className="group size-10 rounded-full bg-black/70 text-white backdrop-blur-md hover:bg-black/80 focus:bg-black/80 active:scale-95 md:hidden"
      >
        {open ? (
          <X size={18} className="group-focus:text-primary" />
        ) : (
          <Link2 size={18} className="group-focus:text-primary" />
        )}
      </Button>
      <div
        className={cn(
          "flex items-center gap-3 rounded-full bg-black/70 backdrop-blur-md",
          // mobile
          //mr-0 origin-right translate-y-1/2
          "absolute right-0 bottom-full flex-col px-3 py-4",
          "transition-all duration-300 ease-out",
          // desktop
          "md:pointer-events-auto md:static md:mr-0 md:translate-y-0 md:scale-100 md:flex-row md:px-4 md:py-3 md:opacity-100",
          // mobile open/close
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0 md:scale-100 md:opacity-100",
        )}
      >
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

        {homepage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
            href={homepage}
          >
            <Globe size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;
