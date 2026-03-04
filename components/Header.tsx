"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import MenuDrawer from "./MenuDrawer";
import ProfileMenu from "./ProfileMenu";
import SearchBox from "./SearchBox";

const Header = () => {
  const { status } = useSession();
  const [display, setDisplay] = useState("none");

  return (
    <header className="absolute left-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center">
          <MenuDrawer />
          <Link href="/" className="ml-1 flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-20 md:h-10 md:w-30"
            />
          </Link>
        </div>

        <div className="hidden w-[45%] md:inline">
          <SearchBox />
        </div>

        <div>
          {status === "authenticated" ? (
            <div className="flex items-center space-x-2">
              {display === "none" ? (
                <Search
                  className="inline h-6 w-6 md:hidden"
                  onClick={() => setDisplay("flex")}
                />
              ) : (
                <X
                  className="inline h-6 w-6 md:hidden"
                  onClick={() => setDisplay("none")}
                />
              )}
              <ProfileMenu />
            </div>
          ) : (
            <>
              <Link href="/api/auth/signin">
                <Button
                  variant="default"
                  className="transition-300 hidden rounded-full font-semibold md:inline"
                >
                  SIGN IN
                </Button>
              </Link>
              <div className="flex items-center space-x-2 md:hidden">
                {display === "none" ? (
                  <Search
                    className="h-6 w-6"
                    onClick={() => setDisplay("flex")}
                  />
                ) : (
                  <X className="h-6 w-6" onClick={() => setDisplay("none")} />
                )}
                <Link href="/api/auth/signin">
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {display === "flex" && (
        <div className="absolute top-3/4 inline w-full md:hidden">
          <div className="mx-auto w-[90%]">
            <SearchBox />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
