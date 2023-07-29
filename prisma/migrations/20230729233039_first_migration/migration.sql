-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'inprogress', 'online', 'locked');

-- CreateEnum
CREATE TYPE "groupRoles" AS ENUM ('admin', 'editor', 'basic');

-- CreateEnum
CREATE TYPE "likesType" AS ENUM ('post', 'comment', 'picture');

-- CreateEnum
CREATE TYPE "reportType" AS ENUM ('abuse', 'harassment', 'notlikes', 'content', 'spam');

-- CreateTable
CREATE TABLE "users" (
    "Id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '123',
    "phone" TEXT NOT NULL,
    "depertiment" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "Status" "AccountStatus" NOT NULL DEFAULT 'inprogress',

    CONSTRAINT "users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'personal',
    "userId" TEXT NOT NULL,
    "attachmentsId" INTEGER NOT NULL DEFAULT 1,
    "groupsId" INTEGER NOT NULL DEFAULT 1,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    "reposts" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attachmentsId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "attachmentsId" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "likedItem" TEXT NOT NULL,
    "type" "likesType" NOT NULL DEFAULT 'post',
    "userId" TEXT NOT NULL,
    "postId" INTEGER,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "groupOunerID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "groupIcons" INTEGER NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profilepcs" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attachmentsId" INTEGER NOT NULL,

    CONSTRAINT "profilepcs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupsMembers" (
    "role" "groupRoles" NOT NULL DEFAULT 'basic',
    "groupsId" INTEGER NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "groupsMembers_pkey" PRIMARY KEY ("groupsId","usersId")
);

-- CreateTable
CREATE TABLE "search" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "query" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,

    CONSTRAINT "search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "title" "reportType" NOT NULL DEFAULT 'abuse',
    "frequency" INTEGER NOT NULL,
    "ReportedItemType" TEXT NOT NULL,
    "reportedItemId" TEXT NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "groupsMembers_groupsId_usersId_key" ON "groupsMembers"("groupsId", "usersId");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
