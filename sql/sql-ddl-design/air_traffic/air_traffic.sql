DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE "passengers" (
    "id" serial   NOT NULL,
    "first_name" text   NOT NULL,
    "last_name" text   NOT NULL,
    CONSTRAINT "pk_passengers" PRIMARY KEY (
        "id"
     )
);

INSERT INTO passengers
    (first_name, last_name)
VALUES
    ('Jennifer', 'Finch'),--1
    ('Thadeus', 'Gathercoal'),--2
    ('Sonja', 'Pauley'),--3
    ('Waneta', 'Skeleton'),--4
    ('Berkie', 'Wycliff'),--5
    ('Alvin', 'Leathes'),--6
    ('Cory', 'Squibbes');--7

CREATE TABLE "tickets" (
    "id" serial   NOT NULL,
    "passenger_id" int   NOT NULL,
    "seat" text   NOT NULL,
    "departure" TIMESTAMP   NOT NULL,
    "arrival" TIMESTAMP   NOT NULL,
    "airline_id" int   NOT NULL,
    "from_id" int   NOT NULL,
    "to_id" int   NOT NULL,
    CONSTRAINT "pk_tickets" PRIMARY KEY (
        "id"
     )
);

INSERT INTO tickets
    (passenger_id, seat, departure, arrival, airline_id, from_id, to_id)
VALUES
    (1, '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 2),--1
    (2, '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 3, 4),--2
    (3, '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 5, 6),--3
    (1, '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 2, 7),--4
    (4, '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 8, 9),--5
    (2, '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 10, 11),--6
    (5, '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 1, 12, 13),--7
    (6, '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 6, 14, 15),--8
    (5, '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 6, 13, 16),--9
    (7, '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 7, 17, 18);--10

CREATE TABLE "airlines" (
    "id" serial   NOT NULL,
    "airline" text   NOT NULL,
    CONSTRAINT "pk_airlines" PRIMARY KEY (
        "id"
     )
);

INSERT INTO airlines
    (airline)
VALUES
    ('United'),--1
    ('British Airways'),--2
    ('Delta'),--3
    ('TUI Fly Belgium'),--4
    ('Air China'),--5
    ('American Airlines'),--6
    ('Avianca Brasil');--7

CREATE TABLE "locations" (
    "id" serial   NOT NULL,
    "city_name" text   NOT NULL,
    "country_id" int   NOT NULL,
    CONSTRAINT "pk_locations" PRIMARY KEY (
        "id"
     )
);

INSERT INTO locations
    (city_name, country_id)
VALUES
    ('Washington DC', 1),--1
    ('Seattle', 1),--2
    ('Tokyo', 2),--3
    ('London', 3),--4
    ('Las Angeles', 1),--5
    ('Las Vegas', 1),--6
    ('Mexico City', 4),--7
    ('Paris', 5),--8
    ('Casablanca', 6),--9
    ('Dubai', 7),--10
    ('Beijing', 8),--11
    ('New York', 1),--12
    ('Charlotte', 1),--13
    ('Cedar Rapids', 1),--14
    ('Chicago', 1),--15
    ('New Orleans', 1),--16
    ('Sao Paolo', 9),--17
    ('Santiago', 10);--18

CREATE TABLE "countries" (
    "id" serial   NOT NULL,
    "country_name" text   NOT NULL,
    CONSTRAINT "pk_countries" PRIMARY KEY (
        "id"
     )
);

INSERT INTO countries
    (country_name)
VALUES
    ('United States'),--1
    ('Japan'),--2
    ('United Kingdom'),--3
    ('Mexico'),--4
    ('France'),--5
    ('Morocco'),--6
    ('UAE'),--7
    ('China'),--8
    ('Brazil'),--9
    ('Chile');--10

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_passenger_id" FOREIGN KEY("passenger_id")
REFERENCES "passengers" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_airline_id" FOREIGN KEY("airline_id")
REFERENCES "airlines" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_from_id" FOREIGN KEY("from_id")
REFERENCES "locations" ("id");

ALTER TABLE "tickets" ADD CONSTRAINT "fk_tickets_to_id" FOREIGN KEY("to_id")
REFERENCES "locations" ("id");

ALTER TABLE "locations" ADD CONSTRAINT "fk_locations_country_id" FOREIGN KEY("country_id")
REFERENCES "countries" ("id");

