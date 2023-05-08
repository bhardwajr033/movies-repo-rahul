-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_directorId_fkey";

-- AlterTable
ALTER TABLE "Movies" ALTER COLUMN "directorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Directors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
