Data types 

    TINYINT 1B -> -128 to 127 ,usefull for flag 
    INT , BIGINT ,
    DECIMAL(PRECISION or total number of digits , scale or numbers after decimal)
    FLOAT , DOUBLE 

    CHAR() ,VARCHAR(50) , TEXT , MEDIUMTEXT ,LONGTEXT, ENUM ,SET 
    DATE , DATETIME, TIME, TIMESTAMP ,YEAR

table creation 

    create table crypto(
    name varchar(50) not null, 
    price decimal(10,2) not null, 
    id bigint primary key auto_increment
    );



truncate vs delete -> 

      dealloactes pages |  fires delete triggers 
      resets the counters| this does not 
      cannot use where | can use where 
      faster | nope 



      

show tables; // display all tables for a selected DB 

insert into crypto(name,price) values ('ETH',6530.33);  // insert values 



char vs varchar 

    >char is for fixed length , var for variable length data
    > frequent updates on varchar may give overhead on performance , framgmentation problem  ( limit max size , appropriate data  type for large text , ROW_FORMAT= DYNAMIC, COMPRESSED,
    >separate large data getting frequent updates in new table , OPTIMIZE TABLE XYZ;)



