"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bookmark, Heart, LogOut, Star, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfileMenu = () => {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.user?.image!} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-auto px-0 py-2 text-sm font-semibold">
        <Link
          href="/profile"
          className="transition-300 hover:bg-muted-foreground/30 hover:text-primary flex items-center rounded-md py-1.5 pr-6 pl-3"
        >
          <User className="mr-3 size-4" />
          Profile
        </Link>
        <Link
          href="/rating"
          className="transition-300 hover:bg-muted-foreground/30 hover:text-primary flex items-center rounded-md py-1.5 pr-6 pl-3"
        >
          <Star className="mr-3 size-4" />
          Rating
        </Link>
        <Link
          href="/favorite"
          className="transition-300 hover:bg-muted-foreground/30 hover:text-primary flex items-center rounded-md py-1.5 pr-6 pl-3"
        >
          <Heart className="mr-3 size-4" />
          Favorite
        </Link>
        <Link
          href="/bookmark"
          className="transition-300 hover:bg-muted-foreground/30 hover:text-primary flex items-center rounded-md py-1.5 pr-6 pl-3"
        >
          <Bookmark className="mr-3 size-4" />
          Bookmark
        </Link>
        <div className="border-muted-foreground my-1 border-1"></div>
        <Link
          href="/api/auth/signout"
          className="transition-300 hover:bg-muted-foreground/30 hover:text-primary flex items-center rounded-md py-1.5 pr-6 pl-3"
        >
          <LogOut className="mr-3 size-4" />
          Sign out
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileMenu;
