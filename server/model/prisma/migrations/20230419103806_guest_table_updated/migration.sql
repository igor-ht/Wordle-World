/*
  Warnings:

  - Added the required column `points` to the `Guests` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `lastPlayed` on the `Guests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Guests" ADD COLUMN     "points" INTEGER NOT NULL,
DROP COLUMN "lastPlayed",
ADD COLUMN     "lastPlayed" INTEGER NOT NULL;
