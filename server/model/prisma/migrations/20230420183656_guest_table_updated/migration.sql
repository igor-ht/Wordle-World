/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Guests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guests_id_key" ON "Guests"("id");
