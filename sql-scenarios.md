You have a large table with millions of rows. You need to add a new column with a DEFAULT value. 
What are the performance implications, and how might MySQL handle this (especially older vs. newer versions)?


old V >

      entire table rewritten > read modify > write back > can cause locking 
      > solutions > add new will column with null > update with default in batches> finally alter column with deafult value
                  > use a thrird party tools > for creating shadow table and copying in chunks like percona toolkit

new V 8.0.12+

        newer versions can handle using instant ddl, deafult values will be applied on read/update only 
        no table rewrites , fast 

how it changes ? 

      -> updates the metadata > 
              >on read checks if this row has new column value updated > if not return default 
              > row is updated value is persisted on disk 


----

char vs varchar 

    >char is for fixed length , var for variable length data
    > frequent updates on varchar may give overhead on performance , framgmentation problem  ( limit max size , appropriate data  type for large text , ROW_FORMAT= DYNAMIC, COMPRESSED,
    >separate large data getting frequent updates in new table , OPTIMIZE TABLE XYZ;)


----

primary key ? why needed what is not present 

>identifies rows uniquely , used in joins , when by DB in backend as clustered index

> if not present > it will looks for unique NOT NULL key and use it in clustered index,  if not present it will create a 6 byte hidden key for internal purpose
      > not having a primary can be performace implications while quering


-----





