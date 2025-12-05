import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const getUserFromSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.user.findFirst({ where: { email: session.user.email } });
};

const getBookmarks = async (userId: string) => {
  return prisma.bookmark.findMany({
    where: { userId },
    include: { user: true },
  });
};

export const GET = async () => {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookmarks = await getBookmarks(user.id);
    return NextResponse.json(bookmarks);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      bookmark,
      tmdb_id,
      media_type,
      release_date,
      title,
      genre_ids,
      poster_path,
    } = await req.json();

    await prisma.bookmark.create({
      data: {
        userId: user.id,
        bookmark,
        tmdb_id,
        media_type,
        release_date,
        title,
        genre_ids,
        poster_path,
      },
    });

    const bookmarks = await getBookmarks(user.id);
    return NextResponse.json(bookmarks);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: Request) => {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookmark, tmdb_id, media_type } = await req.json();

    const hasBookmark = await prisma.bookmark.findFirst({
      where: { tmdb_id, media_type, userId: user.id },
    });

    if (!hasBookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    await prisma.bookmark.update({
      where: { id: hasBookmark.id },
      data: { bookmark },
    });

    const bookmarks = await getBookmarks(user.id);
    return NextResponse.json(bookmarks);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: Request) => {
  try {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tmdb_id, media_type } = await req.json();

    const hasBookmark = await prisma.bookmark.findFirst({
      where: { tmdb_id, media_type, userId: user.id },
    });

    if (!hasBookmark) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }

    await prisma.bookmark.delete({ where: { id: hasBookmark.id } });

    const bookmarks = await getBookmarks(user.id);
    return NextResponse.json(bookmarks);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
