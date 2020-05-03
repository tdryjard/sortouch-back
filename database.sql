DROP DATABASE IF EXISTS navebe;

CREATE DATABASE navebe;

USE navebe;

CREATE TABLE question (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    content VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    model_id INT NOT NULL
);

CREATE TABLE relation_response_container_question (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    container_id INT NULL,
    response_id INT NULL,
    user_id INT NOT NULL,
    model_id INT NOT NULL
);

CREATE TABLE response (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    content VARCHAR(255),
    user_id INT NOT NULL,
    model_id INT NOT NULL
);

CREATE TABLE category (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NULL,
    user_id INT NOT NULL,
    model_id INT NOT NULL
);

CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(35) NOT NULL
);

CREATE TABLE container (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    content_type VARCHAR(255),
    ordering INT NOT NULL,
    response_id INT,
    user_id INT NOT NULL,
    model_id INT NOT NULL
);

CREATE TABLE relation_container (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    container_id INT,
    question_id INT,
    response_id INT,
    category_id INT,
    onChange INT,
    user_id INT NOT NULL,
    model_id INT NOT NULL
);

CREATE TABLE model (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    user_id INT NOT NULL
);

CREATE TABLE mail (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    phone VARCHAR(20),
    email VARCHAR(150),
    message VARCHAR(400),
    category_id INT,
    user_id INT,
    model_id INT,
    view INT,
    color VARCHAR(100)
);

ALTER TABLE mail
    ADD CONSTRAINT fk_mail__category_id FOREIGN KEY (category_id) REFERENCES category(id),
    ADD CONSTRAINT fk_mail__user_id FOREIGN KEY (user_id) REFERENCES user(id),
    ADD CONSTRAINT fk_mail__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE question
    ADD CONSTRAINT fk_question__user_id FOREIGN KEY (user_id) REFERENCES user(id),
    ADD CONSTRAINT fk_question__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE relation_response_container_question
    ADD CONSTRAINT fk_relation_question_response__response_id FOREIGN KEY (response_id) REFERENCES response(id),
    ADD CONSTRAINT fk_relation_question_response__container_id FOREIGN KEY (container_id) REFERENCES container(id),
    ADD CONSTRAINT fk_relation_question_response__user_id FOREIGN KEY (user_id) REFERENCES user(id),
    ADD CONSTRAINT fk_relation_question_response__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE response
    ADD CONSTRAINT fk_response__user_id FOREIGN KEY (user_id) REFERENCES user(id),
    ADD CONSTRAINT fk_response__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE category
    ADD CONSTRAINT fk_category__user_id FOREIGN KEY (user_id) REFERENCES user(id),
    ADD CONSTRAINT fk_category__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE container
    ADD CONSTRAINT fk_container__response_id FOREIGN KEY (response_id) REFERENCES response(id),
    ADD CONSTRAINT fk_container__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE relation_container
    ADD CONSTRAINT fk_relation_container__container_id FOREIGN KEY (container_id) REFERENCES container(id),
    ADD CONSTRAINT fk_relation_container__question_id FOREIGN KEY (question_id) REFERENCES question(id),
    ADD CONSTRAINT fk_relation_container__response_id FOREIGN KEY (response_id) REFERENCES response(id),
    ADD CONSTRAINT fk_relation_container__category_id FOREIGN KEY (category_id) REFERENCES category(id),
    ADD CONSTRAINT fk_relation_container__user_id FOREIGN KEY (user_id) REFERENCES user(id),
    ADD CONSTRAINT fk_relation_container__model_id FOREIGN KEY (model_id) REFERENCES model(id);

ALTER TABLE model
    ADD CONSTRAINT fk_model__user_id FOREIGN KEY (user_id) REFERENCES user(id);
