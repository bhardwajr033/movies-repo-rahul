-- CreateTable
CREATE TABLE "Directors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "metascore" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL,
    "gross_earning_in_mil" DOUBLE PRECISION NOT NULL,
    "directorId" INTEGER NOT NULL,
    "actor" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Directors_name_key" ON "Directors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movies_rank_key" ON "Movies"("rank");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Directors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
