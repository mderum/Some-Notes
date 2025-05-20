Data types 

    TINYINT 1B -> -128 to 127 ,usefull for flag 
    INT , BIGINT ,
    DECIMAL(PRECISION or total number of digits , scale or numbers after decimal)
    FLOAT , DOUBLE 

    CHAR() ,VARCHAR(50) , TEXT , MEDIUMTEXT ,LONGTEXT, ENUM ,SET 
    DATE , DATETIME, TIME, TIMESTAMP ,YEAR

---

table creation 

    create table crypto(
    name varchar(50) not null, 
    price decimal(10,2) not null, 
    id bigint primary key auto_increment
    );

---


Foreign key 

    ALTER TABLE incubator
    ADD CONSTRAINT fk_crypto_id  # name of constraint 
    FOREIGN KEY (crypto_id)  # child  a column in your child table 
    REFERENCES crypto(id)  # referenced table is parent table
    ON DELETE CASCADE;

---

desc table # how table schema 

---

alter table incubator add column crypto_id  bigint;

---

show tables; // display all tables for a selected DB 

---

insert into crypto(name,price) values ('ETH',6530.33);  // insert values 

---

like 
%any number of chars left B % any number of chars right 
_B_  one left of B and one right of B  total 3 chars.
_B%  one left of B then any number of char in right.

select * from crypto where price between 5.33 and 515.33;

select name as incubName from  incubator where name like '%B%';


----

having -> filter results produced by group by clause 

SELECT GROUP_CONCAT(name) AS names, price AS cryptoGroup
FROM crypto
GROUP BY price having price>61;


----

