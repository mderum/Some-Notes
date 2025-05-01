**For a high concurrency systems**

> Db shards -> separating DB based on user id , create X number of shards with similar configs
> Dubbo (framework) -> divide systems in to several sub sys
> cache -> usually high read low writes , redis etc
> MQ  > cant totally depend on caching so MQ , consume and then write according to system speed
> Split DB  -> sub sub level

**For a high transacting systems**
>minimize txn scope
>use Transactions when ever possible
>use timeout on txns
>lock ordering > optimistic (prevents conflict between 2 )  pessimistic( blocks others from modifying )
>Idempotency > each txn should be unique 
Resource locking > although usefull but might not be the best selection in some cases.  (Redisson, Zookeeper, or Consul)

**For load management**
Horizontal scaling -> adding more machine or nodes 
Vertical scaling -> upgrading current system with more powerfull resources 

Scale  using Kubernates or Docker
Load balancing and caching 
@Aysnc to offload non critical processes 
Rate Limiting -> clicking multiple times in frontend 
@tranasctional for failures 

**common problems**
>cusomers comes and ask for txn report for last 1 year, system provide last 3 months and for remaining data wait X hours.
( inablity of data provision, right structure and schema missing ) 
>old proccess in bank uses *batch* to process the data. ? time taking ? fixed interval ? queued
> legacy system throughputs ( banking , exchange and other products each having their own throuputs and legacy constraints ) 

**Design goals**
-Consistent Xp ( analytics) across all modules 
-Structure Data then process with low lat
-Support for large data 
-stateless machine ( resiliant and active ) 
- resilient + elasticity
- Autonomous ( self failue recovery )
- now to enchane the User XP for retrieval of data put the data (some of it) in a data grid or something  in engagement layer according to usage pattern
  like 80%  customer trying to access last 6 month or 8 months. Rest all in DB below the data grid

  Real time processing
  > Stream of data  > event stream > Listeners > validate and transform legacy data > put in data grid >  Aysn data from grid to backend DB (write behind feature of GEODE (Horizontal scale) or any other frameW)
  
  ![image](https://github.com/user-attachments/assets/bd6db368-0762-4064-a386-f57d144aca32)

> retrieval -> partitioned storage using account number of data values or index
> Write behind
> colocation -> account related data and txn to that account on same node of data Grid
> lock laws  if data is being written on one node lock the secondary node  and write same changes
> replication over region Asyc



**Distributes Transactions** 
A *atomic ->  all the txn bundled either fails or succeeds* C *consistance* I *Isolated* D *durable* 


  
