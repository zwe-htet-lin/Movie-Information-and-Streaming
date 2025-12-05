"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-10 py-6 px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-5 text-sm sm:text-base text-neutral-300">
          <img src="/logo.png" alt="Logo" className="w-20 h-8" />
          <Link href="/movie?page=1" className="hover:text-white transition">
            Movies
          </Link>
          <Link href="/tv?page=1" className="hover:text-white transition">
            TV Shows
          </Link>
        </div>

        <p className="text-neutral-400 text-sm text-center">
          Copyright {new Date().getFullYear()} | Developed by{" "}
          <span className="text-white font-semibold">Zwe Htet Lin</span>
        </p>
      </div>
    </footer>
  );
}
