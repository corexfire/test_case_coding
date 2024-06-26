CREATE DATABASE IF NOT EXISTS apbatech_test;
USE apbatech_test;

CREATE TABLE `users` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL ,
	`password` VARCHAR(255) NOT NULL ,
	`mobile_number` VARCHAR(20) NOT NULL ,
	`foto` LONGBLOB NOT NULL,
	`createdAt` TIMESTAMP NULL DEFAULT NULL,
	`updatedAt` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE
)
ENGINE=InnoDB
;

