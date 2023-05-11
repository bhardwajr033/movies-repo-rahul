-- DropForeignKey
ALTER TABLE "Movies" DROP CONSTRAINT "Movies_directorId_fkey";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Directors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
