/*
  Warnings:

  - You are about to drop the column `actor` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `gross_earning_in_mil` on the `Movies` table. All the data in the column will be lost.
  - You are about to drop the column `release_year` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `grossEarningsInMil` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "actor",
DROP COLUMN "gross_earning_in_mil",
DROP COLUMN "release_year",
ADD COLUMN     "grossEarningsInMil" DOUBLE PRECISION NOT NULL;
