/*
  Warnings:

  - You are about to drop the column `points` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Words` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiscoveredWords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Friends` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pointsEN` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsES` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsHE` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsPT` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DiscoveredWords" DROP CONSTRAINT "_DiscoveredWords_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiscoveredWords" DROP CONSTRAINT "_DiscoveredWords_B_fkey";

-- DropForeignKey
ALTER TABLE "_Friends" DROP CONSTRAINT "_Friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_Friends" DROP CONSTRAINT "_Friends_B_fkey";

TRUNCATE TABLE "Users" CASCADE;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "points",
ADD COLUMN     "pointsEN" INTEGER NOT NULL,
ADD COLUMN     "pointsES" INTEGER NOT NULL,
ADD COLUMN     "pointsHE" INTEGER NOT NULL,
ADD COLUMN     "pointsPT" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Words";

-- DropTable
DROP TABLE "_DiscoveredWords";

-- DropTable
DROP TABLE "_Friends";

-- CreateTable
CREATE TABLE "WordsEN4" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsEN4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsEN5" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsEN5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsEN6" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsEN6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsES4" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsES4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsES5" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsES5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsES6" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsES6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsPT4" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsPT4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsPT5" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsPT5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsPT6" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsPT6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsHE4" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsHE4_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsHE5" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsHE5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordsHE6" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "WordsHE6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsEN4" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsEN5" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsEN6" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsES4" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsES5" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsES6" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsPT4" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsPT5" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsPT6" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsHE4" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsHE5" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DiscoveredWordsHE6" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WordsEN4_word_key" ON "WordsEN4"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsEN5_word_key" ON "WordsEN5"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsEN6_word_key" ON "WordsEN6"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsES4_word_key" ON "WordsES4"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsES5_word_key" ON "WordsES5"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsES6_word_key" ON "WordsES6"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsPT4_word_key" ON "WordsPT4"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsPT5_word_key" ON "WordsPT5"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsPT6_word_key" ON "WordsPT6"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsHE4_word_key" ON "WordsHE4"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsHE5_word_key" ON "WordsHE5"("word");

-- CreateIndex
CREATE UNIQUE INDEX "WordsHE6_word_key" ON "WordsHE6"("word");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsEN4_AB_unique" ON "_DiscoveredWordsEN4"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsEN4_B_index" ON "_DiscoveredWordsEN4"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsEN5_AB_unique" ON "_DiscoveredWordsEN5"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsEN5_B_index" ON "_DiscoveredWordsEN5"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsEN6_AB_unique" ON "_DiscoveredWordsEN6"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsEN6_B_index" ON "_DiscoveredWordsEN6"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsES4_AB_unique" ON "_DiscoveredWordsES4"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsES4_B_index" ON "_DiscoveredWordsES4"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsES5_AB_unique" ON "_DiscoveredWordsES5"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsES5_B_index" ON "_DiscoveredWordsES5"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsES6_AB_unique" ON "_DiscoveredWordsES6"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsES6_B_index" ON "_DiscoveredWordsES6"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsPT4_AB_unique" ON "_DiscoveredWordsPT4"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsPT4_B_index" ON "_DiscoveredWordsPT4"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsPT5_AB_unique" ON "_DiscoveredWordsPT5"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsPT5_B_index" ON "_DiscoveredWordsPT5"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsPT6_AB_unique" ON "_DiscoveredWordsPT6"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsPT6_B_index" ON "_DiscoveredWordsPT6"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsHE4_AB_unique" ON "_DiscoveredWordsHE4"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsHE4_B_index" ON "_DiscoveredWordsHE4"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsHE5_AB_unique" ON "_DiscoveredWordsHE5"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsHE5_B_index" ON "_DiscoveredWordsHE5"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiscoveredWordsHE6_AB_unique" ON "_DiscoveredWordsHE6"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscoveredWordsHE6_B_index" ON "_DiscoveredWordsHE6"("B");

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsEN4" ADD CONSTRAINT "_DiscoveredWordsEN4_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsEN4" ADD CONSTRAINT "_DiscoveredWordsEN4_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsEN4"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsEN5" ADD CONSTRAINT "_DiscoveredWordsEN5_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsEN5" ADD CONSTRAINT "_DiscoveredWordsEN5_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsEN5"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsEN6" ADD CONSTRAINT "_DiscoveredWordsEN6_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsEN6" ADD CONSTRAINT "_DiscoveredWordsEN6_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsEN6"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsES4" ADD CONSTRAINT "_DiscoveredWordsES4_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsES4" ADD CONSTRAINT "_DiscoveredWordsES4_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsES4"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsES5" ADD CONSTRAINT "_DiscoveredWordsES5_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsES5" ADD CONSTRAINT "_DiscoveredWordsES5_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsES5"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsES6" ADD CONSTRAINT "_DiscoveredWordsES6_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsES6" ADD CONSTRAINT "_DiscoveredWordsES6_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsES6"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsPT4" ADD CONSTRAINT "_DiscoveredWordsPT4_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsPT4" ADD CONSTRAINT "_DiscoveredWordsPT4_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsPT4"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsPT5" ADD CONSTRAINT "_DiscoveredWordsPT5_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsPT5" ADD CONSTRAINT "_DiscoveredWordsPT5_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsPT5"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsPT6" ADD CONSTRAINT "_DiscoveredWordsPT6_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsPT6" ADD CONSTRAINT "_DiscoveredWordsPT6_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsPT6"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsHE4" ADD CONSTRAINT "_DiscoveredWordsHE4_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsHE4" ADD CONSTRAINT "_DiscoveredWordsHE4_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsHE4"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsHE5" ADD CONSTRAINT "_DiscoveredWordsHE5_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsHE5" ADD CONSTRAINT "_DiscoveredWordsHE5_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsHE5"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsHE6" ADD CONSTRAINT "_DiscoveredWordsHE6_A_fkey" FOREIGN KEY ("A") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscoveredWordsHE6" ADD CONSTRAINT "_DiscoveredWordsHE6_B_fkey" FOREIGN KEY ("B") REFERENCES "WordsHE6"("id") ON DELETE CASCADE ON UPDATE CASCADE;
