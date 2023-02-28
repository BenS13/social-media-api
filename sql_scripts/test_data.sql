INSERT INTO users (username, email) VALUES 
    ("bob25", "bob25@example.com"),
    ("alice36", "alice02@example.com"),
    ("jeff12", "jeff13@example.com");

INSERT INTO posts (title, allText, authorID) VALUES
    ("TestTitle", "TestTextHAHAHAHA", 1),
    ("TestTitle2", "TestsdsdsddTextHAHAHAHA", 2),
    ("TestTitl3", "TestTsdsdsdsdextHAHAHAHA", 3);

INSERT INTO comments (postID, allText, authorID) VALUES
    (1, "TestComment1", 1),
    (1, "TestComment2", 2),
    (2, "TestComment3", 3);
