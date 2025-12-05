import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const getUserFromSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.user.findFirst({ where: { email: session.user.email } });
};

const getFavorites = async (userId: string) => {
  return prisma.favorite.findMany({
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

    const favorites = await getFavorites(user.id);
    return NextResponse.json(favorites);
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

    const { tmdb_id, media_type, release_date, title, genre_ids, poster_path } =
      await req.json();

    await prisma.favorite.create({
      data: {
        userId: user.id,
        tmdb_id,
        media_type,
        release_date,
        title,
        genre_ids,
        poster_path,
      },
    });

    const favorites = await getFavorites(user.id);
    return NextResponse.json(favorites);
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

    const hasFavorite = await prisma.favorite.findFirst({
      where: { tmdb_id, media_type, userId: user.id },
    });

    if (!hasFavorite) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    await prisma.favorite.delete({ where: { id: hasFavorite.id } });

    const favorites = await getFavorites(user.id);
    return NextResponse.json(favorites);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
