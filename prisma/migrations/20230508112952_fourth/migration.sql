/*
  Warnings:

  - Added the required column `releaseYear` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "releaseYear" INTEGER NOT NULL;
