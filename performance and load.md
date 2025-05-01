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
