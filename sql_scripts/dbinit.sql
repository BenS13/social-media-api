BEGIN TRANSACTION;

CREATE TABLE roles(
    name VARCHAR(16) UNIQUE NOT NULL,
    description TEXT,
    PRIMARY KEY(name)
);


CREATE TABLE users(
    ID INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(16) NOT NULL DEFAULT 'user',
    username VARCHAR(16) UNIQUE NOT NULL,
    about TEXT,
    dateRegistered DATETIME DEFAULT CURRENT_TIMESTAMP,
    password VARCHAR(32),
    passwordSalt VARCHAR(16),
    email VARCHAR(64) UNIQUE NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (role) REFERENCES roles(name)
);

CREATE TABLE posts (
    ID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    allText TEXT NOT NULL,
    dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateModified DATETIME ON UPDATE CURRENT_TIMESTAMP,
    imageURL VARCHAR(2048),
    authorID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (authorID) REFERENCES users (ID)
);

CREATE TABLE comments (
    ID INT NOT NULL AUTO_INCREMENT,
    postID INT NOT NULL,
    alltext TEXT NOT NULL,
    authorID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (postID) REFERENCES posts (ID),
    FOREIGN KEY (authorID) REFERENCES users (ID)
);

CREATE TABLE likes (
    ID INT NOT NULL AUTO_INCREMENT,
    postID INT NOT NULL,
    authorID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (postID) REFERENCES posts(ID),
    FOREIGN KEY (authorID) REFERENCES users (ID)
);



COMMIT;

INSERT INTO roles (name) VALUES
    ("user"),
    ("admin");

COMMIT;

INSERT INTO users (username, role, password, passwordSalt, email) VALUES 
    ("bob25", "admin", "password1", "tree", "bob25@example.com"),
    ("alice36", "user", "password1", "tree", "alice02@example.com"),
    ("jeff12", "user","password1", "tree", "jeff13@example.com");

COMMIT;

INSERT INTO posts (title, allText, authorID) VALUES
    ("TestTitle1", "TestBody1", 1),
    ("TestTitle2", "TestBody2", 2),
    ("TestTitl3", "TestBody3", 3);

COMMIT;

INSERT INTO comments (postID, allText, authorID) VALUES
    (1, "TestComment1", 1),
    (1, "TestComment2", 2),
    (2, "TestComment3", 3);

COMMIT;

INSERT INTO likes (postID, authorID) VALUES
    (1,2),
    (2,1),
    (3,2),
    (2,3);

COMMIT;