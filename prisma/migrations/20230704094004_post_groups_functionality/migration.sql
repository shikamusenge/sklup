-- AlterTable
ALTER TABLE "post" ADD COLUMN     "groupsId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'personal';

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_groupsId_fkey" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
