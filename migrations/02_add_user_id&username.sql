ALTER TABLE users 
    ADD COLUMN github_user_id INT,
    ADD COLUMN github_username VARCHAR(30),
    ADD COLUMN cohort_name VARCHAR(30) REFERENCES cohorts(name);