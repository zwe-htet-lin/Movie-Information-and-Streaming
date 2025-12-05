/*
  Warnings:

  - You are about to drop the column `genres` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `tmdbId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `email` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_type` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmdb_id` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Favorite" DROP COLUMN "genres",
DROP COLUMN "mediaType",
DROP COLUMN "poster",
DROP COLUMN "releaseDate",
DROP COLUMN "tmdbId",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "media_type" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "release_date" TEXT NOT NULL,
ADD COLUMN     "tmdb_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
