/*
  Warnings:

  - Added the required column `done` to the `IndividualTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndividualTask" ADD COLUMN     "done" BOOLEAN NOT NULL;
