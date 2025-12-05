"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AvatarImage } from "@radix-ui/react-avatar";
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
      <PopoverContent className="w-auto py-2 px-0 text-sm font-semibold">
        <Link
          href="/profile"
          className="flex items-center pl-3 pr-6 py-1.5 rounded-md transition-300 hover:bg-muted-foreground/30 hover:text-primary"
        >
          <User className="mr-3 size-4" />
          Profile
        </Link>
        <Link
          href="/rating?page=1"
          className="flex items-center pl-3 pr-6 py-1.5 rounded-md transition-300 hover:bg-muted-foreground/30 hover:text-primary"
        >
          <Star className="mr-3 size-4" />
          Rating
        </Link>
        <Link
          href="/favorite?page=1"
          className="flex items-center pl-3 pr-6 py-1.5 rounded-md transition-300 hover:bg-muted-foreground/30 hover:text-primary"
        >
          <Heart className="mr-3 size-4" />
          Favorite
        </Link>
        <Link
          href="/bookmark?page=1"
          className="flex items-center pl-3 pr-6 py-1.5 rounded-md transition-300 hover:bg-muted-foreground/30 hover:text-primary"
        >
          <Bookmark className="mr-3 size-4" />
          Bookmark
        </Link>
        <div className="border-1 border-muted-foreground my-1"></div>
        <Link
          href="/api/auth/signout"
          className="flex items-center pl-3 pr-6 py-1.5 rounded-md transition-300 hover:bg-muted-foreground/30 hover:text-primary"
        >
          <LogOut className="mr-3 size-4" />
          Sign out
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileMenu;
