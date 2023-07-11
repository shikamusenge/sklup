/*
  Warnings:

  - The primary key for the `groupsMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `groupsMembers` table. All the data in the column will be lost.
  - The `role` column on the `groupsMembers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Status` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'inprogress', 'online');

-- CreateEnum
CREATE TYPE "groupRoles" AS ENUM ('admin', 'editor', 'basic');

-- AlterTable
ALTER TABLE "groupsMembers" DROP CONSTRAINT "groupsMembers_pkey",
DROP COLUMN "id",
DROP COLUMN "role",
ADD COLUMN     "role" "groupRoles" NOT NULL DEFAULT 'basic',
ADD CONSTRAINT "groupsMembers_pkey" PRIMARY KEY ("groupsId", "usersId");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "Status",
ADD COLUMN     "Status" "AccountStatus" NOT NULL DEFAULT 'inprogress';
