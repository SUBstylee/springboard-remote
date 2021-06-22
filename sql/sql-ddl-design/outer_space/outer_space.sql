DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE "planets" (
    "id" serial   NOT NULL,
    "name" text   NOT NULL,
    "orbital_period_yrs" float   NOT NULL,
    "orbits_id" int   NOT NULL,
    "galaxy_id" int   NOT NULL,
    "moons" text DEFAULT '{}',
    CONSTRAINT "pk_planets" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "orbits" (
    "id" serial   NOT NULL,
    "star" text   NOT NULL,
    CONSTRAINT "pk_orbits" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "galaxies" (
    "id" serial   NOT NULL,
    "galaxy" text   NOT NULL,
    CONSTRAINT "pk_galaxies" PRIMARY KEY (
        "id"
     )
);

INSERT INTO planets
    (name, orbital_period_yrs, orbits_id, galaxy_id, moons)
VALUES
    ('Earth', 1.00, 1, 1, '{The Moon}'),
    ('Mars', 1.88, 1, 1, '{"Phobos", "Deimos"}'),
    ('Venus', 0.62, 1, 1, '{}'),
    ('Neptune', 164.8, 1, 1, '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}'),
    ('Proxima Centauri b', 0.03, 2, 1, '{}'),
    ('Gliese 876 b', 0.23, 3, 1, '{}');

INSERT INTO orbits
    (star)
VALUES
    ('The Sun'),
    ('Proxima Centauri'),
    ('Gliese 876');

INSERT INTO galaxies
    (galaxy)
VALUES
    ('Milky Way');

ALTER TABLE "planets" ADD CONSTRAINT "fk_planets_orbits_id" FOREIGN KEY("orbits_id")
REFERENCES "orbits" ("id");

ALTER TABLE "planets" ADD CONSTRAINT "fk_planets_galaxy_id" FOREIGN KEY("galaxy_id")
REFERENCES "galaxies" ("id");

