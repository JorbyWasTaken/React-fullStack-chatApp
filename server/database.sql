CREATE DATABASE testapi;

CREATE TABLE info(
    id SERIAL PRIMARY KEY,
    name varchar(50)
);


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);
CREATE DATABASE authtodolists;

CREATE TABLE users(
    user_id SERIAL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);
old
CREATE TABLE todos (
    todo_id SERIAL,
    user_id SERIAL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
old
CREATE TABLE groups(
    group_id SERIAL,
    user_id SERIAL,
    group_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE GroupsAndMessages(
    group_id SERIAL,
    user_id SERIAL,
    group_name VARCHAR(255) NOT NULL,
    members VARCHAR(255),
    group_description VARCHAR(255),
    group_messages VARCHAR(255),
    PRIMARY KEY (group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE GroupsAndData(
    group_id SERIAL,
    user_id SERIAL,
    group_name VARCHAR(255) NOT NULL,
    members VARCHAR(255),
    group_description VARCHAR(255),
    PRIMARY KEY (group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE profiledata(
    message_id SERIAL,
    group_id SERIAL,
    user_id SERIAL,
    group_messages VARCHAR(255),
    PRIMARY KEY (message_id),
    FOREIGN KEY (group_id) REFERENCES GroupsAndData(group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE userprofile(

)

CREATE TABLE comments (
    comment_id SERIAL,
    comment_message VARCHAR(255),
    user_id SERIAL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE joinedgroups(
    join_id SERIAL,
    group_id SERIAL NOT NULL,
    member_id SERIAL NOT NULL,
    FOREIGN KEY (member_id) REFERENCES users(user_id),
    FOREIGN KEY (group_id) REFERENCES groupsanddata(group_id)
);

CREATE TABLE wall(
    wall_id SERIAL,
    user_id1 SERIAL,
    user_id2 SERIAL,
    wall_comment VARCHAR(255),
    FOREIGN KEY (user_id1) REFERENCES users(user_id),
    FOREIGN KEY (user_id2) REFERENCES users(user_id)
);

CREATE TABLE friends(
    id SERIAL,
    user_id1 SERIAL,
    user_id2 SERIAL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id1) REFERENCES users(user_id),
    FOREIGN KEY (user_id2) REFERENCES users(user_id)
)
CREATE TABLE publicprofile(
    profile_id SERIAL,
    user_id1 = SERIAL,
    user_id2 = SERIAL,
    bio VARCHAR(255),
    wall_comment VARCHAR(255),
    PRIMARY KEY (profile_id),
    FOREIGN KEY (user_id1) REFERENCES users(user_id)
    FOREIGN KEY (user_id2) REFERENCES users(user_id)
);

CREATE TABLE posts (
    post_id SERIAL,
    post_title VARCHAR(255),
    post_description VARCHAR(255),
    user_id SERIAL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments (
    comment_id SERIAL,
    user_id SERIAL,
    comment_message VARCHAR(255),
    post_id SERIAL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
); 

