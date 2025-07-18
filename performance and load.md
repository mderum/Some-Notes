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



**Distributed Transactions** 
A *atomic ->  all the txn bundled either fails or succeeds* C *consistance* I *Isolated* D *durable* 



-----------------------------------------------------------------------------

***Issues and solutions***


**1. optimize slow DB queries?** 

>print sql queries for debugging
spring.jpa.show-sql=true
          .properties.hibernate.format_sql=true  (pretty-printing)

>Log actual parameter values
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE


>APM tools New Relic Datadog APM Elastic APM
    <artifactId>spring-boot-starter-actuator</artifactId>
    <artifactId>micrometer-registry-prometheus</artifactId>
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.prometheus.enabled=true
management.endpoints.web.base-path=/actuator

monitor , trace , detection , tracking, visualize 

>Query level
-add index for where and Join columns 
-select only needed columns not *
- Use optimised query for selects ( N+1 problem for parent 1 Q for related childs N Q )
  Here use JPQL *JOIN FETCH* (fetches linked entity with the query, can get nested using multiple joins)

  @Query("""
    SELECT u FROM User u
    JOIN FETCH u.orders o
    JOIN FETCH o.product
    JOIN FETCH u.profile
    WHERE u.id = :id
""")
User findUserWithOrdersAndProductsAndProfile(@Param("id") Long id);

-Use @EntityGraph
  @EntityGraph(attributePaths = {"orders", "orders.product", "profile"}) 
  fetches nested records like join fetch

>Paginations
-offest pargination -> slow , inconsistent if data changes in between,
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 1000;

-keyset pagination 
SELECT * FROM users WHERE id > :lastSeenId ORDER BY id LIMIT 10;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.id > :lastId ORDER BY u.id ASC")
    List<User> findNextPage(@Param("lastId") Long lastId, Pageable pageable);
}

> filter
use date ranges , paginations , conditions, Stream , @Entity { @BatchSize(size = 10) }  Batching is used to load the same linked entity for a number of parent entities in single DB call helps reduce N number of calls example 3 user with orders it will say select * from order where user in 1 2 3  ,split data process

>Proper joins
Inner -> related entry must be present
Left -> relation is optional

---
***3. prevent resource exhaustion** 
 
DB connection or thread pool exhaustion
 
3.1 Database Connection Pooling  

?why should i do pooling ?  making a connection is costly( network latency , auths etc). Resusing same can reduce latency, this is not observable or measurable in low end system, but when the 
concurrency increases, a significant lag can be seen. Avoid overload on DB, dont give it so much that it couldnt handle.

Hikari CP
{

      spring.datasource.hikari.maximum-pool-size=20  maximum avalilable in service  at any point threshold limit
      spring.datasource.hikari.minimum-idle=5   minimum number of idle to be present at any point
      spring.datasource.hikari.idle-timeout=30000  after this time eligible for removal 
      spring.datasource.hikari.max-lifetime=600000 approx lifetime  when  not in use

      these hikari settings doest give a dynamic approch based on load, everything is manual. 

}  


Hikari CP java
{

          @Bean
          public DataSource dataSource() {
              HikariDataSource dataSource = new HikariDataSource();
              dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/yourdb");
              dataSource.setUsername("user");
              dataSource.setPassword("password");
              dataSource.setMaximumPoolSize(20); // Adjust as needed ,can add minimum idle here too
              return dataSource;
          }
}

---
3.2 Thread Pool Management

{

            spring.task.execution.pool.core-size=10   idle minimum can expand upto 50
            spring.task.execution.pool.max-size=50    can expand upto max 50
            spring.task.execution.pool.queue-capacity=100  number of tasks that can be queued after that rejected
}

@Bean
public Executor taskExecutor() {

                ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
                executor.setCorePoolSize(10);
                executor.setMaxPoolSize(50);
                executor.setQueueCapacity(100);
                executor.setThreadNamePrefix("async-task-");
                executor.initialize();
                return executor;
}


Override for rejection policy and lagging
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean(name = "applicationTaskExecutor")
    public TaskExecutor taskExecutor(TaskExecutorBuilder builder) {
        return builder
                .rejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy()  //call your custom method here**)
                .build();
    }
}



@Service
public class AsyncService {

    @Async("applicationTaskExecutor")  //rejection policy here 
    public void processTask(int taskId) {
        System.out.println("Task " + taskId + " running on thread: " + Thread.currentThread().getName());
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}


3.3 Rate Limiting with Bucket4j (Per IP or Per User)  bucket4j-core  (complex custom logic )  bucket4j-spring-boot-starter ( simple config )

{

    spring:
      bucket4j:
        enabled: true  # Enable Bucket4j for rate limiting
        limits:
          - name: apiRateLimit  # Define a unique name for the rate limit configuration
            capacity: 1000       # The maximum number of tokens (or requests) allowed in the bucket at any time.
            refillPeriod: 1      # Time period (in seconds) after which the bucket is refilled with tokens.
            refillTokens: 1000   # Number of tokens (requests) to be refilled every time period.
            exceededMessage=Rate limit exceeded. Please try again later.

  @GetMapping("/api/test")
    @RateLimit(name = "apiRateLimit")  // Use the configured rate limit name
    public String testRateLimit() {
        return "Request successful!";
    }
}



---

3.4 Caching at various levels 
>Im memory cache(simple cache)
>Ehcache local disk+ mem with TTL
>caffine cache  in mem HIgh perf
>redis  distributed large/multi instance apps


Patters 
>Cache aside (lazy loading) -> check cache first if missing > load > put in cache | for a get Call

>Read Through  check cache first if missing > read from DB automatically. Required 3rd party cache  like Redis and Ehcache  with read-through support

>write through  on update data is written to both DB and cache ( happens automaticaly in third party cache like redis 

>Write BEhind  write to cache > update in DB in batches (Aysnc) . A persistance is needed like Redis stream ,  grid like GEODE have write behind feature
 consistency is not guarenteed, errors may come

>Cache invalidation

>Cache warming -> preload frequently used data

>Cache BAtching / bulk caching ->  bulk caching in one go

>Cache stampede prevention ->  for same data their may be Mx calls for DB @Cacheable(sync=true) to prevent

>TTL expiry  set to evict globally

>Null caching avoid hits for null results

>cache coherence    -> keeping consistant with underlying DB , i made some changes manullay in DB , now cache becomes inconsistence.
What we can do? update/evict chache on DB changes in API endpoints , use distributed cache systems like redis can provide message BUS, tools like debezium + kafka  to listen DB changes events and update the cache accordingly,


**cache algo**

>LRU least recently used removed first

>LFU least access frequency removed

> FIFO

>MRU

>ARC (Adaptive Replacement Cache) Balances between recency and frequency better than LRU/LFU.

>Random

Caffeine’s W-TinyLFU performs better in most application 


>Simple cache  whithin the service not shared with other service 
{

    @SpringBootApplication
    @EnableCaching
    spring.cache.type=simple  

    @Cacheable(value = "orders", key = "#customerId")  // put this key orderid inside the cache named orders  , can be used at class level also 
    public Order getOrderByCustomerId(Long customerId) {
    return orderRepository.findByCustomerId(customerId);
    }
    }
    
    @CacheEvict(value = "users", key = "#userId")  // remove for given keyid 
    @CachePut(value = "productCache", key = "#product.id")  //update the given key in cache 
    @CacheConfig(cacheNames = "productCache") on class define a cahce for all method common cache to use 
  
    @Caching(   multiple @ together 
    cacheable = @Cacheable(value = "productCache", key = "#productId"),
    evict = @CacheEvict(value = "productCache", key = "#productId")
      )
      
      @Cacheable(value = "productCache", key = "#productId", unless = "#result.price < 100") here result is the return type that is product
    public Product getProductById(Long productId) {
        return productRepository.findById(productId);
    }




>Caching with Redis (Distributed Caching)   shared with services

    {

    <artifactId>spring-boot-starter-data-redis</artifactId>
    <artifactId>spring-boot-starter-cache</artifactId>

    > {
      
      spring.cache.type=redis   // Use Redis for caching
      spring.redis.host=localhost    // Redis server address 
      spring.redis.port=6379        // Redis server port
      spring.redis.timeout=2000     // Timeout for Redis connection in milliseconds
      spring.cache.redis.time-to-live=60000  // Cache TTL ( time to live ) for 1 minute reddis keeps the expiry time with key_Expiry to check 
      spring.redis.password=       # Optional: Redis password (if applicable)

    spring.redis.pool.max-active=10        # Maximum number of active Redis connections
    spring.redis.pool.max-idle=5           # Maximum number of idle Redis connections
    spring.redis.pool.min-idle=2           # Minimum number of idle Redis connections
    spring.redis.pool.max-wait=2000        # Maximum wait time for a Redis connection (milliseconds)


    }

    {

        @Cacheable(value = "products", key = "#productId")  // Cache the product by productId in Redis
 
    }

    }


---

3.5 Circuit breakers 

>resilience4j-spring-boot2
{

    resilience4j.circuitbreaker:
      configs:
        default: # Default configuration applied to all circuit breakers unless overridden
          registerHealthIndicator: true # Expose Circuit Breaker health status via Spring Boot Actuator
          slidingWindowType: COUNT_BASED # How to measure the failure rate: COUNT_BASED or TIME_BASED
                                          # COUNT_BASED: Uses a fixed number of last calls
                                          # TIME_BASED: Uses calls within a sliding time window
          slidingWindowSize: 10 # Number of calls (for COUNT_BASED) or time window duration in seconds (for TIME_BASED)
                                # This determines the size of the window used to calculate the failure rate
          minimumNumberOfCalls: 5 # Minimum number of calls needed in the sliding window to evaluate the failure rate
                                  # The circuit breaker will not transition from CLOSED to OPEN until this many calls have been made
          failureRateThreshold: 50 # Percentage threshold (0-100) for the failure rate that triggers the transition to OPEN
                                   # If failure rate in the sliding window >= this, trip the circuit
          waitDurationInOpenState: 60s # Duration (e.g., 60s, 1m) the circuit breaker stays in the OPEN state before transitioning to HALF_OPEN
                                       # Calls during this period are fast-failed
          permittedNumberOfCallsInHalfOpenState: 3 # Number of calls allowed in the HALF_OPEN state to test if the service has recovered
                                                   # After this many calls, the circuit transitions based on their success/failure
          automaticTransitionFromOpenToHalfOpenEnabled: true # Whether to automatically transition from OPEN to HALF_OPEN after waitDurationInOpenState expires
                                                            # If false, the first call after the waitDuration triggers the transition
          recordExceptions: # List of exceptions that should be considered failures and increase the failure rate
            - java.lang.RuntimeException
            - java.util.concurrent.TimeoutException # Often useful if your API client throws this on timeout
          ignoreExceptions: # List of exceptions that should be ignored and not count towards the failure rate
            - java.lang.IllegalArgumentException # Example: A client-side validation error shouldn't trip the breaker
          eventConsumerBufferSize: 100 # Size of the buffer to store circuit breaker events (optional but good for monitoring)
    
      instances:
        myExternalService: # Specific configuration for a circuit breaker named 'myExternalService'
          baseConfig: default # Inherit properties from the 'default' config first
          slidingWindowSize: 20 # Override default: Use a larger window size for this specific service
          failureRateThreshold: 60 # Override default: Allow a slightly higher failure rate before tripping
          waitDurationInOpenState: 30s # Override default: Stay open for a shorter period


}

@Service
 @CircuitBreaker(name = "myCircuitBreaker"   name you have given in prop , fallbackMethod = "fallbackResponse")

public String fallbackResponse(Throwable t)

dont wrap your method in try catch 


3.6 auto scailing and monitoring 
3.7 load balancing 


DB policy check
Consider we have different sources in a payload ( type a and b more can come in future) how to handle the code in Java+ spring to run or check policies in db


