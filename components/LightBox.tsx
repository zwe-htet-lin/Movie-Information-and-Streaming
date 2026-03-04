"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Lightbox({
  images,
  index,
}: {
  images: { file_path: string }[];
  index: number;
}) {
  const router = useRouter();

  const prev = index > 0 ? index - 1 : null;
  const next = index < images.length - 1 ? index + 1 : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Close */}
      <button
        // onClick={() => router.push(baseRoute)}
        className="absolute top-5 left-5 text-white"
      >
        <X size={28} />
      </button>

      {/* Prev */}
      {prev !== null && (
        <button
          onClick={() => router.push(`${baseRoute}/${prev}`)}
          className="absolute left-5 text-white"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Image */}
      <div className="relative h-[90vh] w-[90vw]">
        <Image
          src={`https://image.tmdb.org/t/p/original/${images[index].file_path}`}
          alt="TMDB full"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Next */}
      {next !== null && (
        <button
          onClick={() => router.push(`${baseRoute}/${next}`)}
          className="absolute right-5 text-white"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
}
