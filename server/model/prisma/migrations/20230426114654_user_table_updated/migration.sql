/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_email_password_key";

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
