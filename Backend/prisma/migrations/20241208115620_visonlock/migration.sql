/*
  Warnings:

  - The values [gk] on the enum `Question_subject` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Question` MODIFY `subject` ENUM('physics', 'chemistry', 'biology', 'GK') NOT NULL;
