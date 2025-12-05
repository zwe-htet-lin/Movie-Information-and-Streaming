"use client";

import { CircleRating } from "@/components/CircleRating";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getFormattedDate } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { clearUser, deleteUser } from "@/store/slices/userSlice";
import { CalendarDays, TriangleAlert } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#eab308", "#ec4899"];

const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

const page = () => {
  const { data: session } = useSession();
  const { value: user, isLoading } = useAppSelector((state) => state.user);
  const ratings = useAppSelector((state) => state.rating.value);
  const favorites = useAppSelector((state) => state.favorite.value);
  const bookmarks = useAppSelector((state) => state.bookmark.value);

  const dispatch = useAppDispatch();

  const handleDeleteAccount = async () => {
    await dispatch(deleteUser());
    dispatch(clearUser());
    await signOut({ callbackUrl: "/" });
  };

  const ratingStars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const averageRating = () => {
    if (!ratings.length) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return Number((total / ratings.length).toFixed(1));
  };

  const ratingCounts = () => {
    return ratingStars.map((star) => {
      const count = ratings.filter(
        (rating) => rating.rating === Number(star)
      ).length;
      return { star, count };
    });
  };

  const topGenres = (items: { genre_ids: number[] }[]) => {
    let separated = Object.values(genreMap).map((name) => ({
      name,
      count: items.filter((item) =>
        item.genre_ids.some((id) => genreMap[id] === name)
      ).length,
    }));

    return separated
      .filter((genre) => genre.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const renderCountLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight={600}
      >
        {value}
      </text>
    );
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="pt-28 px-5">
      <div className="flex gap-4 sm:gap-5">
        <Link href="/profile">
          <Avatar className="size-24 sm:size-30">
            <AvatarImage src={session?.user?.image!} />
          </Avatar>
        </Link>
        <div>
          <div className="flex items-start">
            <Link
              href="/profile"
              className="text-2xl font-bold sm:text-4xl break-words"
            >
              {session?.user?.name}
            </Link>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-2 font-medium text-base text-neutral-300 sm:text-lg">
            <CalendarDays /> Joined {getFormattedDate(user?.createdAt!)}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="mt-4 rounded-full"
              >
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent className="border-neutral-800">
              <DialogHeader className="flex-col">
                <DialogTitle className="flex items-center justify-start gap-2">
                  <TriangleAlert className="h-5 w-5 text-yellow-400" />
                  <span>Delete Account</span>
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-neutral-300">
                  Deleting your account cannot be undone, so please double check
                  that you really want to delete this account.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-3 rounded-lg border border-neutral-800 bg-neutral-950 p-4 text-sm">
                <p className="font-semibold">Your account details:</p>
                <div className="space-y-1 text-neutral-200">
                  <p>
                    <span className="font-semibold mr-2">Name</span>
                    {session?.user?.name}
                  </p>
                  <p>
                    <span className="font-semibold mr-2">Email</span>
                    {session?.user?.email}
                  </p>
                  <p>
                    <span className="font-semibold mr-2">Joined</span>
                    {getFormattedDate(user?.createdAt!)}
                  </p>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleDeleteAccount()}
                >
                  Delete Permanently
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="my-10 border-1 border-neutral-800 sm:my-12" />

      <h1 className="mb-5 text-xl font-bold sm:text-2xl">Insights</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Card className="text-center">
          <p className="mb-2 font-semibold text-base sm:text-lg">
            Average Rating
          </p>
          <div className="flex justify-center">
            <CircleRating value={averageRating()} />
          </div>
        </Card>
        <Card className="text-center">
          <p className="mb-4 font-semibold text-base sm:text-lg">
            Total Ratings
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-yellow-500">
            {ratings.length}
          </p>
        </Card>
        <Card className="text-center">
          <p className="mb-4 font-semibold text-base sm:text-lg">
            Total Favorites
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-red-600">
            {favorites.length}
          </p>
        </Card>
        <Card className="text-center">
          <p className="mb-4 font-semibold text-base sm:text-lg">
            Total Bookmarks
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-primary">
            {bookmarks.length}
          </p>
        </Card>
      </div>

      <Card className="my-10">
        <p className="text-lg font-semibold sm:text-xl">Rating Breakdown</p>
        <p className="text-sm text-neutral-300 sm:text-lg">
          Your ratings from 1 to 10 stars
        </p>
        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          {ratings.length === 0 ? (
            <div className="flex items-center justify-center text-sm text-neutral-400 sm:h-56 sm:text-base">
              No ratings yet. Add some ratings to see this chart.
            </div>
          ) : (
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingCounts()}>
                  <XAxis dataKey="star" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <Card className="border border-neutral-800 bg-background p-0">
            <div className="grid grid-cols-1 gap-1 p-1 sm:grid-cols-2 sm:p-2">
              {ratingCounts()
                .slice(0, 5)
                .map(({ star, count }) => {
                  const s = Number(star);
                  const starLabel = s === 1 ? "star" : "stars";
                  const ratingLabel = count === 1 ? "rating" : "ratings";

                  return (
                    <div
                      key={star}
                      className="flex w-full justify-between rounded-lg px-4 py-3 hover:bg-neutral-900 text-sm"
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{star}</span>
                        <span className="font-semibold">{starLabel}</span>
                        <span className="text-neutral-400">
                          · {count} {ratingLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              {ratingCounts()
                .slice(5, 10)
                .map(({ star, count }) => {
                  const s = Number(star);
                  const starLabel = s === 1 ? "star" : "stars";
                  const ratingLabel = count === 1 ? "rating" : "ratings";

                  return (
                    <div
                      key={star}
                      className="flex w-full justify-between rounded-lg px-4 py-3 hover:bg-neutral-900 text-sm"
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{star}</span>
                        <span className="font-semibold">{starLabel}</span>
                        <span className="text-neutral-400">
                          · {count} {ratingLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card>
          <p className="text-lg font-semibold sm:text-xl text-center">
            Most Favorite Genres
          </p>
          {favorites.length === 0 ? (
            <div className="flex h-52 items-center justify-center text-sm text-neutral-400 sm:h-56 sm:text-base">
              No favorites yet. Add some favorites to see this chart.
            </div>
          ) : (
            <div className="mt-3 h-52 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topGenres(favorites)}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={renderCountLabel}
                  >
                    {topGenres(favorites).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="line"
                    wrapperStyle={{
                      color: "white",
                      fontSize: "12px",
                      lineHeight: "18px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card>
          <p className="text-lg font-semibold sm:text-xl text-center">
            Most Bookmark Genres
          </p>
          {bookmarks.length === 0 ? (
            <div className="flex h-52 items-center justify-center text-sm text-neutral-400 sm:h-56 sm:text-base">
              No bookmarks yet. Add some bookmarks to see this chart.
            </div>
          ) : (
            <div className="mt-3 h-52 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topGenres(bookmarks)}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={renderCountLabel}
                  >
                    {topGenres(bookmarks).map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="line"
                    wrapperStyle={{
                      color: "white",
                      fontSize: "12px",
                      lineHeight: "18px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default page;
