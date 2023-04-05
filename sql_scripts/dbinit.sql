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
    password VARCHAR(100),
    passwordSalt VARCHAR(50),
    email VARCHAR(64) UNIQUE NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (role) REFERENCES roles(name)
);

CREATE TABLE posts (
    ID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(2048) NOT NULL,
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
    ("Get Fit with Regular Exercise!", "Exercise isn't just about getting in shape, it has many other benefits too! Regular exercise can improve your cardiovascular health, boost your strength and endurance, and even make you feel happier. Don't wait, start your fitness journey today!", 1),
    ("The Secret to a Healthy Lifestyle: Sleep", "Did you know that getting enough quality sleep is essential for a healthy lifestyle? It can help reduce stress, increase productivity, and even boost your immune system. So why not make sleep a priority tonight and every night? Your body will thank you!", 2),
    ("Think Positive, Feel Positive!", "Your thoughts can have a big impact on your mood and well-being. So why not try focusing on the positive things in your life and approaching challenges with a can-do attitude? You'll be amazed at how much happier and more fulfilled you'll feel. Start today and see the power of positive thinking!", 3);

COMMIT;

INSERT INTO comments (postID, allText, authorID) VALUES
    (1, "I totally agree! Exercise not only makes you look good, but it also makes you feel good.", 1),
    (1, "Thanks for the reminder! I need to get back into my exercise routine.", 1),
    (1, "I never realized how much better I would feel after incorporating exercise into my daily routine. It's amazing!", 1),
    (1, "I always feel so much better when I get enough sleep. It's amazing what a good night's rest can do for you.", 2),
    (1, "I struggle with getting enough sleep, but I know how important it is. Thanks for the reminder!", 2),
    (1, "Sleep is so underrated. It's amazing how much better I feel when I prioritize it.", 2),
    (2, "I needed this reminder today. Thanks for sharing!", 3);
    (2, "I've been trying to focus on the positive lately, and I've noticed a huge difference in my mood and outlook.", 3);
    (2, "I used to be such a negative person, but now I try to find the good in every situation. It's made such a difference in my life!", 3);

COMMIT;

INSERT INTO likes (postID, authorID) VALUES
    (1,2),
    (2,1),
    (3,2),
    (2,3);

COMMIT;