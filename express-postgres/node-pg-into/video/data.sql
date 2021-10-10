DROP DATABASE IF EXISTS usersdb;

CREATE DATABASE usersdb;

\c usersdb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS messages_tags;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL
);

CREATE TABLE messages
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users,
  msg TEXT NOT NULL
);

CREATE TABLE tags
(
  code TEXT PRIMARY KEY,
  tag TEXT UNIQUE
);

CREATE TABLE messages_tags
(
  message_id INTEGER NOT NULL REFERENCES messages,
  tag_code TEXT NOT NULL REFERENCES tags,
  PRIMARY KEY(message_id, tag_code)
);

INSERT INTO users
  (name, type)
VALUES
  ('Juanita', 'admin');

INSERT INTO users
  (name, type)
VALUES
  ('Jenny', 'staff');

INSERT INTO users
  (name, type)
VALUES
  ('Jeff', 'user');

INSERT INTO users
  (name, type)
VALUES
  ('Jasmine', 'user');

INSERT INTO users
  (name, type)
VALUES
  ('James', 'staff');

INSERT INTO users
  (name, type)
VALUES
  ('Jaimee', 'admin');

INSERT INTO messages
(user_id, msg)
VALUES
(1, 'Help me with my coding interview!'),
(1, 'Common JS Mistakes'),
(2, 'My new flask+react project');

INSERT INTO tags
VALUES
('py', 'Python'),
('js', 'JavaScript');

INSERT INTO messages_tags
VALUES
(1, 'py'),
(1, 'js'),
(2, 'js'),
(3, 'js'),
(3, 'py');