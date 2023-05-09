/*
  Warnings:

  - Added the required column `actor` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "actor" TEXT NOT NULL;
