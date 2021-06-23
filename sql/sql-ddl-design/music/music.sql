DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE "songs" (
    "id" SERIAL   NOT NULL,
    "title" TEXT   NOT NULL,
    "duration_in_seconds" INTEGER   NOT NULL,
    "release_date" DATE   NOT NULL,
    "album_id" INTEGER   NOT NULL,
    CONSTRAINT "pk_songs" PRIMARY KEY (
        "id"
     )
);

INSERT INTO songs
    (title, duration_in_seconds, release_date, album_id)
VALUES
    ('MMMBop', 238, '04-15-1997', 1),--1
    ('Bohemian Rhapsody', 355, '10-31-1975', 2),--2
    ('One Sweet Day', 282, '11-14-1995', 3),--3
    ('Shallow', 216, '09-27-2018', 4),--4
    ('How You Remind Me', 223, '08-21-2001', 5),--5
    ('New York State of Mind', 276, '10-20-2009', 6),--6
    ('Dark Horse', 215, '12-17-2013', 7),--7
    ('Moves Like Jagger', 201, '06-21-2011', 8),--8
    ('Complicated', 244, '05-14-2002', 9),--9
    ('Say My Name', 240, '11-07-1999', 10);--10

CREATE TABLE "albums" (
    "id" SERIAL   NOT NULL,
    "album_name" TEXT   NOT NULL,
    CONSTRAINT "pk_albums" PRIMARY KEY (
        "id"
     )
);

INSERT INTO albums
    (album_name)
VALUES
    ('Middle of Nowhere'),--1
    ('A Night at the Opera'),--2
    ('Daydream'),--3
    ('A Star Is Born'),--4
    ('Silver Side Up'),--5
    ('The Blueprint 3'),--6
    ('Prism'),--7
    ('Hands All Over'),--8
    ('Let Go'),--9
    ('The Writing''s on the Wall');--10

CREATE TABLE "artists" (
    "id" SERIAL   NOT NULL,
    "artist_name" TEXT   NOT NULL,
    CONSTRAINT "pk_artists" PRIMARY KEY (
        "id"
     )
);

INSERT INTO artists
    (artist_name)
VALUES
    ('Hanson'),--1
    ('Queen'),--2
    ('Mariah Cary'),--3
    ('Boyz II Men'),--4
    ('Lady Gaga'),--5
    ('Bradley Cooper'),--6
    ('Nickelback'),--7
    ('Jay Z'),--8
    ('Alicia Keys'),--9
    ('Katy Perry'),--10
    ('Juicy J'),--11
    ('Maroon 5'),--12
    ('Christina Aguilera'),--13
    ('Avril Lavigne'),--14
    ('Destiny''s Child');--15

CREATE TABLE "producers" (
    "id" SERIAL   NOT NULL,
    "producer_name" TEXT   NOT NULL,
    CONSTRAINT "pk_producers" PRIMARY KEY (
        "id"
     )
);

INSERT INTO producers
    (producer_name)
VALUES
    ('Dust Brothers'),--1
    ('Stephen Lironi'),--2
    ('Roy Thomas Baker'),--3
    ('Walter Afanasieff'),--4
    ('Benjamin Rice'),--5
    ('Rick Parashar'),--6
    ('Al Shux'),--7
    ('Max Martin'),--8
    ('Cirkut'),--9
    ('Shellback'),--10
    ('Benny Blanco'),--11
    ('The Matrix'),--12
    ('Darkchild');--13

CREATE TABLE "song_artist" (
    "id" SERIAL   NOT NULL,
    "songs_id" INTEGER   NOT NULL,
    "artists_id" INTEGER   NOT NULL,
    CONSTRAINT "pk_song_artist" PRIMARY KEY (
        "id"
     )
);

INSERT INTO song_artist
    (songs_id, artists_id)
VALUES
    (1, 1),--1
    (2, 2),--2
    (3, 3),--3
    (3, 4),--4
    (4, 5),--5
    (4, 6),--6
    (5, 7),--7
    (6, 8),--8
    (6, 9),--9
    (7, 10),--10
    (7, 11),--11
    (8, 12),--12
    (8, 13),--13
    (9, 14),--14
    (10, 15);--15

CREATE TABLE "song_producer" (
    "id" SERIAL   NOT NULL,
    "songs_id" INTEGER   NOT NULL,
    "producers_id" INTEGER   NOT NULL,
    CONSTRAINT "pk_song_producer" PRIMARY KEY (
        "id"
     )
);

INSERT INTO song_producer
    (songs_id, producers_id)
VALUES
    (1, 1),--1
    (1, 2),--2
    (2, 3),--3
    (3, 4),--4
    (4, 5),--5
    (5, 6),--6
    (6, 7),--7
    (7, 8),--8
    (7, 9),--9
    (8, 10),--10
    (8, 11),--11
    (9, 12),--12
    (10, 13);--13

ALTER TABLE "songs" ADD CONSTRAINT "fk_songs_album_id" FOREIGN KEY("album_id")
REFERENCES "albums" ("id");

ALTER TABLE "song_artist" ADD CONSTRAINT "fk_song_artist_songs_id" FOREIGN KEY("songs_id")
REFERENCES "songs" ("id");

ALTER TABLE "song_artist" ADD CONSTRAINT "fk_song_artist_artists_id" FOREIGN KEY("artists_id")
REFERENCES "artists" ("id");

ALTER TABLE "song_producer" ADD CONSTRAINT "fk_song_producer_songs_id" FOREIGN KEY("songs_id")
REFERENCES "songs" ("id");

ALTER TABLE "song_producer" ADD CONSTRAINT "fk_song_producer_producers_id" FOREIGN KEY("producers_id")
REFERENCES "producers" ("id");

