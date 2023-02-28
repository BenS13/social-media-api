CREATE TABLE users(
    ID INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) UNIQUE NOT NULL,
    about TEXT,
    dateRegistered DATETIME DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(32),
    passwordSalt VARCHAR(16),
    email VARCHAR(64) UNIQUE NOT NULL,
    PRIMARY KEY (ID)
);