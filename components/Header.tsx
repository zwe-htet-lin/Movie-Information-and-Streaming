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
    <header className="absolute w-full z-50 bg-transparent p-5  ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MenuDrawer />
          <Link href="/" className="flex items-center ml-1">
            <img src="/logo.png" alt="Logo" className="w-20 md:w-30 h-8 md:h-10" />
          </Link>
        </div>

        <div className="w-[45%] hidden md:inline">
          <SearchBox />
        </div>

        <div>
          {status === "authenticated" ? (
            <ProfileMenu />
          ) : (
            <>
              <Link href="/api/auth/signin">
                <Button
                  variant="default"
                  className="transition-300 rounded-full font-semibold hidden md:inline"
                >
                  SIGN IN
                </Button>
              </Link>
              <div className="flex items-center space-x-2 md:hidden">
                {display === "none" ? (
                  <Search
                    className="w-6 h-6"
                    onClick={() => setDisplay("flex")}
                  />
                ) : (
                  <X className="w-6 h-6" onClick={() => setDisplay("none")} />
                )}
                <Link href="/api/auth/signin">
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      {display === "flex" && (
        <div className="inline md:hidden">
          <SearchBox />
        </div>
      )}
    </header>
  );
};

export default Header;
