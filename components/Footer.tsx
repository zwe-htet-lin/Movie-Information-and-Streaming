"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 py-7">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
        <div className="flex items-center gap-5 text-sm text-neutral-300 sm:text-base">
          <Link href="/"><img src="/logo.png" alt="Logo" className="h-8 w-20" /></Link>
          <Link href="/movie?page=1" className="transition hover:text-white">
            Movies
          </Link>
          <Link href="/tv?page=1" className="transition hover:text-white">
            TV Shows
          </Link>
        </div>

        <p className="text-center text-sm text-neutral-400">
          Copyright {new Date().getFullYear()} | Developed by{" "}
          <span className="font-semibold text-white">Zwe Htet Lin</span>
        </p>
      </div>
    </footer>
  );
}
