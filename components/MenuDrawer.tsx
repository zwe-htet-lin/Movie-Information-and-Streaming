"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10">
          <AlignJustify className="size-6 md:size-7" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-r-0 p-0">
        {/* Header */}
        <div className="flex items-center justify-end pt-2">
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Menu List */}
        <nav className="flex flex-col font-semibold">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="transition-300 hover:text-primary hover:bg-muted-foreground/30 px-5 py-2"
          >
            Home
          </Link>
          <Link
            href="/movie?page=1"
            onClick={() => setOpen(false)}
            className="transition-300 hover:text-primary hover:bg-muted-foreground/30 px-5 py-2"
          >
            Movies
          </Link>
          <Link
            href="/tv?page=1"
            onClick={() => setOpen(false)}
            className="transition-300 hover:text-primary hover:bg-muted-foreground/30 px-5 py-2"
          >
            TV Shows
          </Link>
          <Link
            href="/person?page=1"
            onClick={() => setOpen(false)}
            className="transition-300 hover:text-primary hover:bg-muted-foreground/30 px-5 py-2"
          >
            People
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
