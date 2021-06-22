DROP DATABASE IF EXISTS craigs_list;

CREATE DATABASE craigs_list;

\c craigs_list

CREATE TABLE "regions" (
    "id" serial   NOT NULL,
    "region_name" text   NOT NULL,
    CONSTRAINT "pk_regions" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "users" (
    "id" serial   NOT NULL,
    "username" text   NOT NULL,
    "region_id" int   NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "posts" (
    "id" serial   NOT NULL,
    "title" text   NOT NULL,
    "content" text   NOT NULL,
    "user_id" int   NOT NULL,
    "location" text   NOT NULL,
    "region_id" int   NOT NULL,
    "category_id" int   NOT NULL,
    CONSTRAINT "pk_posts" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "categories" (
    "id" serial   NOT NULL,
    "cat_name" text   NOT NULL,
    CONSTRAINT "pk_categories" PRIMARY KEY (
        "id"
     )
);

INSERT INTO regions
    (region_name)
VALUES
    ('North Bend'),
    ('East Docks'),
    ('Southern District'),
    ('Western Front');

INSERT INTO users
    (username, region_id)
VALUES
    ('Jules Beni', 4),
    ('Emmett Dalton', 3),
    ('Pancho Daniel', 3),
    ('Roy Daugherty', 2),
    ('Bill Downing', 1),
    ('Yginio Salazar', 4);

INSERT INTO posts
    (title, content, user_id, location, region_id, category_id)
VALUES
    ('Dwarf needed for Canoe Trip', 'Looking for a dwarf for a canoe trip this Saturday.', 1, 'No.6 Blue st.', 4, 1),
    ('Room for rent: Cupboard under stairs.', 'Live like Harry Potter!  There was a bat in there once, no owls.', 2, 'My house', 2, 2),
    ('Good times with peanuts.', 'Looking for someone to pelt me with peanuts while I ride a unicycle.', 5, '711 near the bus stop.', 4, 1),
    ('Selling lightly used basketball.', 'It''s actually a volleyball, but works as a basketball.', 3, 'At Bobbie''s house.', 3, 2),
    ('Got any grapes?', 'The lemonade stand doesn''t have any.', 4, 'Next to the park.', 1, 1),
    ('Large box of mismatched shoes.', 'Not sure where the other ones are to complete a pair. Assorted sizes.', 5, 'Middle of the forest.', 1, 2);

INSERT INTO categories
    (cat_name)
VALUES
    ('Buying'),
    ('Selling');

ALTER TABLE "users" ADD CONSTRAINT "fk_users_region_id" FOREIGN KEY("region_id")
REFERENCES "regions" ("id");

ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_region_id" FOREIGN KEY("region_id")
REFERENCES "regions" ("id");

ALTER TABLE "posts" ADD CONSTRAINT "fk_posts_category_id" FOREIGN KEY("category_id")
REFERENCES "categories" ("id");

