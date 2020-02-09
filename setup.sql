CREATE SCHEMA amirtours;

USE amirtours;

CREATE TABLE `amirtours`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `userName` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isAdmin` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

INSERT INTO `amirtours`.`users` (`firstName`, `lastName`, `userName`, `password`, `isAdmin`)
VALUES ('amir', 'debi', 'admin', '1234', '1');

CREATE TABLE `amirtours`.`vacations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(200) NOT NULL,
  `destination` VARCHAR(45) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `amirtours`.`followers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vacationId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `amirtours`.`followers` 
ADD UNIQUE INDEX `uniqueFollower` (`vacationId` ASC, `userId` ASC);
