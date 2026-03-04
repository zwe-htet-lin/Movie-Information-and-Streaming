"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";

const ImageGallerySkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <Button
        variant="ghost"
        disabled
        className="absolute top-5 left-5 text-white"
      >
        <X size={28} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled
        className="absolute left-5 size-11 text-white [&_svg]:size-6"
      >
        <ChevronLeft />
      </Button>

      <Skeleton className="h-[25vh] w-[85vw] max-w-5xl rounded-lg bg-neutral-500 sm:h-[50vh] md:h-[80vh] md:w-[90vw]" />

      <Button
        variant="ghost"
        size="icon"
        disabled
        className="absolute right-5 size-11 text-white [&_svg]:size-6"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ImageGallerySkeleton;
