"use client";

import { useState } from "react";
import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10">
          <AlignJustify className="size-6 md:size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 border-r-0">
        {/* Header */}
        <div className="flex items-center justify-end pt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Menu List */}
        <nav className="flex flex-col font-semibold">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="px-5 py-2 transition-300 hover:text-primary hover:bg-muted-foreground/30"
          >
            Home
          </Link>
          <Link
            href="/movie?page=1"
            onClick={() => setOpen(false)}
            className="px-5 py-2 transition-300 hover:text-primary hover:bg-muted-foreground/30"
          >
            Movies
          </Link>
          <Link
            href="/tv?page=1"
            onClick={() => setOpen(false)}
            className="px-5 py-2 transition-300 hover:text-primary hover:bg-muted-foreground/30"
          >
            TV Shows
          </Link>
          {/* <Link
            href="/person?page=1"
            onClick={() => setOpen(false)}
            className="px-5 py-2 transition-300 hover:text-primary hover:bg-muted-foreground/30"
          >
            People
          </Link> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
