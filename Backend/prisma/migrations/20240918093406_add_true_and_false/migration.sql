-- AlterTable
ALTER TABLE `Question` MODIFY `question_type` ENUM('MCQ', 'FILL_IN_THE_BLANK', 'DESCRIPTIVE', 'TF') NOT NULL;
