-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `prenom` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `pp` VARCHAR(500) NULL DEFAULT NULL,
  `desc` VARCHAR(45) NULL DEFAULT NULL,
  `admin` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 102
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`post` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(300) NULL DEFAULT NULL,
  `imageUrl` VARCHAR(300) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `like` INT NULL DEFAULT '0',
  `authorId` INT NOT NULL,
  `comment` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`postId`),
  INDEX `authorId_idx` (`authorId` ASC) VISIBLE,
  CONSTRAINT `authorId`
    FOREIGN KEY (`authorId`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 316
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`comment` (
  `idComment` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(500) NOT NULL,
  `authorId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY (`idComment`),
  INDEX `authorId_idx` (`authorId` ASC) VISIBLE,
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `author`
    FOREIGN KEY (`authorId`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `postId`
    FOREIGN KEY (`postId`)
    REFERENCES `groupomania`.`post` (`postId`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 210
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`like` (
  `likeId` INT NOT NULL AUTO_INCREMENT,
  `postId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`likeId`),
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  INDEX `userIdlike_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `postIdlikes`
    FOREIGN KEY (`postId`)
    REFERENCES `groupomania`.`post` (`postId`)
    ON DELETE CASCADE,
  CONSTRAINT `userIdlike`
    FOREIGN KEY (`userId`)
    REFERENCES `groupomania`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 446
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
