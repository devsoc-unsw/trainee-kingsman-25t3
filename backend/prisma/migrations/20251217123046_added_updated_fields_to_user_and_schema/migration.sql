-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastActivityDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Session_userId_duration_idx" ON "Session"("userId", "duration" DESC);

-- CreateIndex
CREATE INDEX "User_name_email_idx" ON "User"("name", "email");
