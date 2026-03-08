"use client";

import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const MenuDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    // <Drawer direction="top" open={open} onOpenChange={setOpen}>
    //   <DrawerTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       size="icon"
    //       className="size-10"
    //       onClick={() => setOpen(true)}
    //     >
    //       <AlignJustify className="size-6 md:size-7" />
    //     </Button>
    //   </DrawerTrigger>
    //   <DrawerContent className="h-[50vh] w-full rounded-none border-b-transparent">
    //     <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10">
    //       <div className="flex w-full items-center justify-between">
    //         <Link href="/" className="ml-1 flex items-center">
    //           <img
    //             src="/logo.png"
    //             alt="Logo"
    //             className="h-8 w-20 md:h-10 md:w-30"
    //           />
    //         </Link>
    //         <Button
    //           size="icon"
    //           className="size-12 rounded-full"
    //           onClick={() => setOpen(false)}
    //         >
    //           <X className="size-6" />
    //         </Button>
    //       </div>
    //       <div className="mt-10 flex w-full items-start justify-between">
    //         <div className="flex flex-col space-y-2">
    //           <h1 className="mb-3 text-2xl font-bold">Movies</h1>
    //           <Link
    //             href="/movie"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Popular
    //           </Link>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Coming Soon
    //           </Link>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Streaming
    //           </Link>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Top Rated
    //           </Link>
    //         </div>
    //         <div className="flex flex-col space-y-2">
    //           <h1 className="mb-3 text-2xl font-bold">TV Shows</h1>
    //           <Link
    //             href="/tv"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Popular
    //           </Link>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Coming Soon
    //           </Link>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Streaming
    //           </Link>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Top Rated
    //           </Link>
    //         </div>
    //         <div className="flex flex-col space-y-2">
    //           <h1 className="mb-3 text-2xl font-bold">People</h1>
    //           <Link
    //             href="/"
    //             className="transition-300 text-lg font-medium underline-offset-4 hover:underline"
    //           >
    //             Popular People
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </DrawerContent>
    // </Drawer>
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
            href="/movie"
            onClick={() => setOpen(false)}
            className="transition-300 hover:text-primary hover:bg-muted-foreground/30 px-5 py-2"
          >
            Movies
          </Link>
          <Link
            href="/tv"
            onClick={() => setOpen(false)}
            className="transition-300 hover:text-primary hover:bg-muted-foreground/30 px-5 py-2"
          >
            TV Shows
          </Link>
          <Link
            href="/person"
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
