-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
