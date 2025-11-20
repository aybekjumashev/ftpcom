-- schema.sql

-- 1. Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Таблица тестов
CREATE TABLE tests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT NOT NULL UNIQUE
);

-- 3. Таблица вопросов
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    text TEXT NOT NULL
);

-- 4. Таблица ответов
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

-- 5. Таблица прогресса
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    test_id INT NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (user_id, test_id)
);


-- 1. Заполняем таблицу tests (уровни тестов)
INSERT INTO tests (id, name, level) VALUES
(1, 'Level 1 Test', 1),
(2, 'Level 2 Test', 2),
(3, 'Level 3 Test', 3),
(4, 'Level 4 Test', 4);

-- 2. Заполняем таблицу questions (вопросы для каждого уровня)
INSERT INTO questions (id, test_id, text) VALUES
(1, 1, 'What is 2 + 2?'),
(2, 1, 'What is the capital of France?'),
(3, 2, 'What is 5 * 6?'),
(4, 2, 'Who wrote "1984"?'),
(5, 3, 'What is the square root of 81?'),
(6, 3, 'What is the chemical symbol for water?'),
(7, 4, 'What is the speed of light in m/s?'),
(8, 4, 'Who developed the theory of relativity?');

-- 3. Заполняем таблицу answers (ответы для каждого вопроса)
INSERT INTO answers (id, question_id, text, is_correct) VALUES
(1, 1, '4', TRUE),
(2, 1, '5', FALSE),
(3, 2, 'Paris', TRUE),
(4, 2, 'London', FALSE),
(5, 3, '30', TRUE),
(6, 3, '25', FALSE),
(7, 4, 'George Orwell', TRUE),
(8, 4, 'J.K. Rowling', FALSE),
(9, 5, '9', TRUE),
(10, 5, '8', FALSE),
(11, 6, 'H2O', TRUE),
(12, 6, 'O2', FALSE),
(13, 7, '299,792,458', TRUE),
(14, 7, '150,000,000', FALSE),
(15, 8, 'Albert Einstein', TRUE),
(16, 8, 'Isaac Newton', FALSE);