DROP DATABASE IF EXISTS soccer;

CREATE DATABASE soccer;

\c soccer

CREATE TABLE "teams" (
    "id" serial   NOT NULL,
    "team_name" text   NOT NULL,
    CONSTRAINT "pk_teams" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "goals" (
    "id" serial   NOT NULL,
    "player_id" int   NOT NULL,
    "match_id" int   NOT NULL,
    CONSTRAINT "pk_goals" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "players" (
    "id" serial   NOT NULL,
    "player_name" text   NOT NULL,
    "team_id" int   NOT NULL,
    CONSTRAINT "pk_players" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "referees" (
    "id" serial   NOT NULL,
    "ref_name" text   NOT NULL,
    CONSTRAINT "pk_referees" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "matches" (
    "id" serial   NOT NULL,
    "team1_id" int   NOT NULL,
    "team2_id" int   NOT NULL,
    "season_id" int   NOT NULL,
    "ref_id" int   NOT NULL,
    CONSTRAINT "pk_matches" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "seasons" (
    "id" serial   NOT NULL,
    "start" date   NOT NULL,
    "end_date" date   NOT NULL, --changed name due to reserved keyword, so is different col name to .svg
    CONSTRAINT "pk_seasons" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "rankings" (
    "id" serial   NOT NULL,
    "team_id" int   NOT NULL,
    "match_id" int   NOT NULL,
    "result" text   NOT NULL,
    CONSTRAINT "pk_rankings" PRIMARY KEY (
        "id"
     )
);

INSERT INTO teams
    (team_name)
VALUES
    ('Black Knights'),
    ('Wildcats');

INSERT INTO goals
    (player_id, match_id)
VALUES
    (1, 1),
    (2, 1),
    (1, 1);

INSERT INTO players
    (player_name, team_id)
VALUES
    ('Bobbie Beezler', 1),
    ('Juan Vega', 1),
    ('Ryan Setter', 2),
    ('Mike Vu', 2);

INSERT INTO referees
    (ref_name)
VALUES
    ('Charles Magdo');

INSERT INTO matches
    (team1_id, team2_id, season_id, ref_id)
VALUES
    (1,2,1,1);

INSERT INTO seasons
    (start, end_date)
VALUES
    ('2021-06-20', '2021-10-12');

INSERT INTO rankings
    (team_id, match_id, result)
VALUES
    (1,1,'win'),
    (2,1,'lose');

ALTER TABLE "goals" ADD CONSTRAINT "fk_goals_player_id" FOREIGN KEY("player_id")
REFERENCES "players" ("id");

ALTER TABLE "goals" ADD CONSTRAINT "fk_goals_match_id" FOREIGN KEY("match_id")
REFERENCES "matches" ("id");

ALTER TABLE "players" ADD CONSTRAINT "fk_players_team_id" FOREIGN KEY("team_id")
REFERENCES "teams" ("id");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_team1_id" FOREIGN KEY("team1_id")
REFERENCES "teams" ("id");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_team2_id" FOREIGN KEY("team2_id")
REFERENCES "teams" ("id");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_season_id" FOREIGN KEY("season_id")
REFERENCES "seasons" ("id");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_ref_id" FOREIGN KEY("ref_id")
REFERENCES "referees" ("id");

ALTER TABLE "rankings" ADD CONSTRAINT "fk_rankings_team_id" FOREIGN KEY("team_id")
REFERENCES "teams" ("id");

ALTER TABLE "rankings" ADD CONSTRAINT "fk_rankings_match_id" FOREIGN KEY("match_id")
REFERENCES "matches" ("id");

