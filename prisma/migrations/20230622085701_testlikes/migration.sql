/*
  Warnings:

  - You are about to drop the column `postId` on the `likes` table. All the data in the column will be lost.
  - Added the required column `likedItem` to the `likes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "likesType" AS ENUM ('post', 'comment', 'picture');

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postId_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "postId",
ADD COLUMN     "likedItem" TEXT NOT NULL,
ADD COLUMN     "type" "likesType" NOT NULL DEFAULT 'post';
