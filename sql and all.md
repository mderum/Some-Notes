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







 

create table crypto(
name varchar(50) not null, 
price decimal(10,2) not null, 
id bigint primary key auto_increment
);


show tables;

insert into crypto(name,price) values ('ETH',6530.33);
insert into crypto(name,price) values ('BTC',156530.33);
insert into crypto(name,price) values ('XRP',3.33);


select * from crypto;



create table incubator(
name varchar(50) not null , 
token_incubated varchar(50), 
id bigint primary key auto_increment
);

show tables; 


insert into incubator(name,token_incubated) values ('Binance','ETH');
insert into incubator(name) values ('DRIA');
 
  
 
 alter table incubator add column crypto_id  bigint;
 
  
update incubator set crypto_id=1  where id =1;

alter table incubator add constraint foreign key (crypto_id) references crypto(id) on delete cascade;
  select * from incubator;
  
  
-- delete from crypto where id=1;

  select * from incubator;
select * from crypto;

desc crypto;
desc table incubator;



select * from incubator where  crypto_id is not null;


select name as incubName from  incubator where name like '%B%';

insert into crypto(name,price) values ('SUI',5.33);
insert into crypto(name,price) values ('TRX',1.33);
insert into crypto(name,price) values ('ZEC',513.33);
insert into crypto(name,price) values ('DRIA',513.33);
insert into crypto(name,price) values ('INK',61.33);
insert into crypto(name,price) values ('SON',61.33);
insert into crypto(name,price) values ('INK',31.33);

select * from crypto;


select * from crypto where price between 5.33 and 515.33;



select name from crypto where name like '_R__';


select price  from crypto where name in ('eth');


select name as SUI from crypto where name ='SUI' and price =5.33;


select name as SUINOTEQ from crypto where name ='SUI' and price != 5.44;

select name as SUINOT from crypto where name ='SUI' and  NOT price = 5.44;


select * from crypto;
select * from incubator;


select * from crypto cy inner join incubator ib on cy.id=ib.crypto_id;
select * from crypto cy left join incubator ib on cy.id=ib.crypto_id;

select * from crypto cy right join incubator ib on cy.id=ib.crypto_id;


SELECT GROUP_CONCAT(name) AS names, price AS cryptoGroup
FROM crypto
GROUP BY price;


select name , count(price) from crypto group by name;


SELECT @@sql_mode;


SELECT GROUP_CONCAT(name) AS names, price AS cryptoGroup
FROM crypto
GROUP BY price having price>61 order by names;

SELECT GROUP_CONCAT(name) AS names, price AS cryptoGroup
FROM crypto
GROUP BY price having price>61 order by names desc ;


select * from crypto;


select max(price) from crypto;

select max(price) as secondMax from crypto where price 
< (select max(price) from crypto);

select price from crypto order by price ;
select price from crypto where id>5 order by price;
select price as offseter from crypto where id>5 order by price  limit 3 offset 2;


select distinct price from crypto;


insert ignore into crypto(name,price,id) values('XRM',259.33,11);

select * from crypto;


insert ignore into crypto(name,price,id) values('ZRX',1.33,11);
select * from crypto;

update crypto set price=5520.00,name='Etherium'  where name ='ETH';
select * from crypto;

select * from crypto limit 2,4; 



