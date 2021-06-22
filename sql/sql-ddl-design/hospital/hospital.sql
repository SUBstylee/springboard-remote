DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;

\c hospital

CREATE TABLE "doctors" (
    "id" serial   NOT NULL,
    "doctor_name" text   NOT NULL,
    CONSTRAINT "pk_doctors" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "patients" (
    "id" serial   NOT NULL,
    "patient_name" text   NOT NULL,
    CONSTRAINT "pk_patients" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "diseases" (
    "id" serial   NOT NULL,
    "disease_name" text   NOT NULL,
    "symptoms" text   NOT NULL,
    CONSTRAINT "pk_diseases" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "visits" (
    "id" serial   NOT NULL,
    "doctor_id" int   NOT NULL,
    "patient_id" int   NOT NULL,
    "date" DATE   NOT NULL,
    "amount_owed" money   NOT NULL,
    CONSTRAINT "pk_visits" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "diagnoses" (
    "id" serial   NOT NULL,
    "visit_id" int   NOT NULL,
    "disease_id" int   NOT NULL,
    "additional" text   NOT NULL,
    CONSTRAINT "pk_diagnoses" PRIMARY KEY (
        "id"
     )
);

INSERT INTO doctors
    (doctor_name)
VALUES
    ('Dr.Grainne Slime'),
    ('Dr.Marvin Hurt'),
    ('Dr.Missy Blunder'),
    ('Dr.Cat Corruption'),
    ('Dr.Brandy Bobbing'),
    ('Dr.Isabelle Dynamite'),
    ('Dr.Zoe Flogg');

INSERT INTO patients
    (patient_name)
VALUES
    ('Huggy Gooberdapple'),
    ('Snoobs Woolysocks'),
    ('Scratchensniff Cocktoasten'),
    ('Snorki Woolysocks'),
    ('Chesterfield MBembo'),
    ('Snorki Hootkins'),
    ('Pushmeet Overturf');

INSERT INTO diseases
    (disease_name, symptoms)
VALUES
    ('Boggled Mind', 'A severe boggling of the mind. Often caused by exposure to new, sometimes paradigm-altering information.'),
    ('Floppy Discs', 'A spinal discombobulation that leaves the sufferer with very limited memory.'),
    ('Lazy Bones', 'Skeletal fatigue caused by a lack of calcium in the diet.'),
    ('Litter Bug', 'A bacterial infection that causes the sufferer to discard items at random.'),
    ('Pipe Organs', 'The internal organs are arranged in such a way that they create dramatic music when the sufferer walks.'),
    ('Premature Mummification', 'The afflicted have been wrapped for the afterlife by their families, but were only taking a nap.'),
    ('Fractured Timeline', 'The sufferer has dislodged themselves from their origin and their fate.');

INSERT INTO visits
    (doctor_id, patient_id, date, amount_owed)
VALUES
    ('1','3','2021-06-01','15000'),
    ('1','2','2021-06-01','12500'),
    ('2','2','2021-06-01','16258'),
    ('3','1','2021-06-01','10725'),
    ('4','6','2021-06-01','14207'),
    ('1','6','2021-06-01','62500'),
    ('7','3','2021-06-01','42150');

INSERT INTO diagnoses
    (visit_id, disease_id, additional)
VALUES
    ('1','7','was not really paying attention, as patient had a piece of broccoli in teeth'),
    ('2','6','patient talks too much!'),
    ('3','5','may have mixed up patient records with someone who is deceased'),
    ('4','4','patient sent to pharmacy in bad part of town'),
    ('5','3','why does everyone come to me when they are sick?'),
    ('6','2','when in doubt, over-medicate patient'),
    ('7','1','think he might be faking, reflected in bill');

ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_doctor_id" FOREIGN KEY("doctor_id")
REFERENCES "doctors" ("id");

ALTER TABLE "visits" ADD CONSTRAINT "fk_visits_patient_id" FOREIGN KEY("patient_id")
REFERENCES "patients" ("id");

ALTER TABLE "diagnoses" ADD CONSTRAINT "fk_diagnoses_visit_id" FOREIGN KEY("visit_id")
REFERENCES "visits" ("id");

ALTER TABLE "diagnoses" ADD CONSTRAINT "fk_diagnoses_disease_id" FOREIGN KEY("disease_id")
REFERENCES "diseases" ("id");

