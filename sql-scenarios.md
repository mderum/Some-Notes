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
