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

-- sample sql joins
SELECT
    "user"."id",
    "user"."username",
    "user"."name",
    "user"."disabled",
    "readings"."id" AS "readings.id",
    "readings"."author" AS "readings.author",
    "readings"."url" AS "readings.url",
    "readings"."title" AS "readings.title",
    "readings"."likes" AS "readings.likes",
    "readings"."year" AS "readings.year",
    "readings->readinglist"."id" AS "readings.readinglist.id",
    "readings->readinglist"."state" AS "readings.readinglist.state"
FROM "users" AS "user"
    LEFT OUTER JOIN (
        "readinglist" AS "readings->readinglist"
        INNER JOIN "blogs" AS "readings" ON "readings"."id" = "readings->readinglist"."blog_id"
        AND "readings->readinglist"."state" = 'unread'
    ) ON "user"."id" = "readings->readinglist"."user_id"
WHERE
    "user"."id" = '1';