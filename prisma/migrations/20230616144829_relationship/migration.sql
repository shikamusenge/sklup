/*
  Warnings:

  - You are about to drop the column `attchmentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `groupOuner` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `attchmentId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `attchmentId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `attchId` on the `profilepcs` table. All the data in the column will be lost.
  - Added the required column `attachmentsId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupOunerID` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attachmentsId` to the `profilepcs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `profilepcs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "attchmentId",
ADD COLUMN     "attachmentsId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "groupOuner",
ADD COLUMN     "groupOunerID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "attchmentId",
ADD COLUMN     "Status" TEXT NOT NULL,
ADD COLUMN     "attachmentsId" INTEGER NOT NULL,
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "attchmentId",
ADD COLUMN     "attachmentsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "profilepcs" DROP COLUMN "attchId",
ADD COLUMN     "attachmentsId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "groupsMembers" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "groupsId" INTEGER NOT NULL,
    "usersId" INTEGER NOT NULL,

    CONSTRAINT "groupsMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groupsMembers_groupsId_usersId_key" ON "groupsMembers"("groupsId", "usersId");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_groupOunerID_fkey" FOREIGN KEY ("groupOunerID") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profilepcs" ADD CONSTRAINT "profilepcs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profilepcs" ADD CONSTRAINT "profilepcs_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupsMembers" ADD CONSTRAINT "groupsMembers_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupsMembers" ADD CONSTRAINT "groupsMembers_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
