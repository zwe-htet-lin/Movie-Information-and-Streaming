import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const getUserFromSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.user.findFirst({ where: { email: session.user.email } });
};

const getRatings = async (userId: string) => {
  return prisma.rating.findMany({
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

    const ratings = await getRatings(user.id);
    return NextResponse.json(ratings);
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
      rating,
      tmdb_id,
      media_type,
      release_date,
      title,
      genre_ids,
      poster_path,
    } = await req.json();

    await prisma.rating.create({
      data: {
        userId: user.id,
        rating,
        tmdb_id,
        media_type,
        release_date,
        title,
        genre_ids,
        poster_path,
      },
    });

    const ratings = await getRatings(user.id);
    return NextResponse.json(ratings);
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

    const { rating, tmdb_id, media_type } = await req.json();

    const hasRating = await prisma.rating.findFirst({
      where: { tmdb_id, media_type, userId: user.id },
    });

    if (!hasRating) {
      return NextResponse.json({ error: "Rating not found" }, { status: 404 });
    }

    await prisma.rating.update({
      where: { id: hasRating.id },
      data: { rating },
    });

    const ratings = await getRatings(user.id);
    return NextResponse.json(ratings);
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

    const hasRating = await prisma.rating.findFirst({
      where: { tmdb_id, media_type, userId: user.id },
    });

    if (!hasRating) {
      return NextResponse.json({ error: "Rating not found" }, { status: 404 });
    }

    await prisma.rating.delete({ where: { id: hasRating.id } });

    const ratings = await getRatings(user.id);
    return NextResponse.json(ratings);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
