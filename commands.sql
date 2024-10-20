CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Justy', 'http://firstblog.com', 'Justy''s title', 5);
insert into blogs (author, url, title, likes) values ('Justy 2', 'http://secondblog.com', 'Justy''s 2nd title', 15);