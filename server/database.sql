-- Database: weekend-to-do-app

-- Table setup
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR (150) NOT NULL,
    complete_not_complete VARCHAR (1) NOT NULL
);

INSERT INTO tasks (task_name, complete_not_complete)
VALUES ('get groceries','N');

INSERT INTO tasks (task_name, complete_not_complete)
VALUES ('vacuum floors','N');

INSERT INTO tasks (task_name, complete_not_complete)
VALUES ('get groceries','N');

INSERT INTO tasks (task_name, complete_not_complete)
VALUES ('clean up clutter around the house','N');

SELECT * FROM tasks;