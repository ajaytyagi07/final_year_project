-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_text` VARCHAR(191) NOT NULL,
    `question_type` ENUM('MCQ', 'FILL_IN_THE_BLANK', 'DESCRIPTIVE') NOT NULL,
    `options` VARCHAR(191) NULL,
    `correct_answer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
