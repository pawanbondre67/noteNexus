
create table users (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    status varchar(20) not null,
    isDeletable varchar(20),
    UNIQUE(email)
);

insert into users (name, email, password, status, isDeletable) values ('pawan', 'pawanbondre19@gmail.com', 'admin', 'true', 'false');


create table category (
id int primary key  auto_increment,
name varchar(100) not null 
);


create table article(
id int primary key  auto_increment,
title varchar(100) not null,
content longtext not null,
categoryId int not null,
published_date date ,
status varchar(20)

);