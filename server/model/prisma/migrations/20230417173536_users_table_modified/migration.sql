/*
  Warnings:

  - Made the column `accessToken` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "accessToken" SET NOT NULL,
ALTER COLUMN "refreshToken" SET NOT NULL;
