CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(255),
  region   VARCHAR(255),
  role     VARCHAR(20)
);

CREATE TABLE sessions (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(30),
  time        TIMESTAMP,
  cohort_id   INT REFERENCES cohorts(id),
  meeting_url VARCHAR(2048)
);

CREATE TABLE cohorts (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(30),
  region   VARCHAR(30)
);

CREATE TABLE attendence (
  id           SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(id),
  session_id   INT REFERENCES sessions(id),
  clockin_time TIMESTAMP,
  notes        VARCHAR(1024)
);