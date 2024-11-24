/*
  Warnings:

  - Added the required column `subject` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Question` ADD COLUMN `subject` ENUM('physics', 'chemistry', 'biology', 'GK') NOT NULL;
