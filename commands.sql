CREATE DATABASE bloglist;

\c bloglist 

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO
    blogs (author, url, title)
VALUES (
        'Dan Abramov',
        'nourl',
        'On let vs const'
    );

INSERT INTO
    blogs (author, url, title)
VALUES (
        'Laurenz Albe',
        'nourl',
        'Gaps in sequences in PostgreSQL'
    );