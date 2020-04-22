DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
USE user_db;

CREATE TABLE users
(
	userId INT NOT NULL AUTO_INCREMENT, 
	username VARCHAR(10) NOT NULL,
	password VARCHAR(10),
    CONSTRAINT fk_user
	PRIMARY KEY (userId)
);


CREATE TABLE locations
(
	locationId INT NOT NULL AUTO_INCREMENT,
	userId INT,
    location POINT NOT NULL,
    PRIMARY KEY(locationId),
    FOREIGN KEY (userId)
    REFERENCES users(userId)
);








CREATE TABLE content
(
	contentId INT NOT NULL AUTO_INCREMENT,
	locationId INT NOT NULL,
    name VARCHAR(10),
    review VARCHAR(250),
    image VARCHAR(250),
	address VARCHAR(150),
    FOREIGN KEY(locationId)
    REFERENCES locations(locationId),
	PRIMARY KEY (contentId)
);