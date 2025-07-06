1.Declarative Rest Client 
- uses annotations for implementation rather than complete code. 
- auto configs
- service to service call splification 
- pluggable features like Error decoders , request interperters 




2.To start add the dep 
- spring cloud starter openfiegn and spring cloud deps 
- on main class add @EnableFeignClient


-- start by creating a interface for your service call 
  
  @FeignClient(name = "user-service" -> if you are using any SD user name of that service here direclty and spring will resolve the url
      url="localhost:8080/" -> if not using SD put compelete location of service with port here ,along with with application context path 
      configuration = MyCustomConfig.class  -> if using java based configs 
      
  fallback= DinerFallback.class  -> for 4j and fallback configs 
 )
  
  P I DinerService{
    @GetMapping("getResturant/{id}")
    Resturant getResturantById( @PathVariable("id") String id );

   @PostMapping("submitOrder")
   ResponseDTO  submitOrder( @RequestBody OrderDetails );


   @PostMapping( consumes= MediaType.MULTIPART_FORM_DATA_VALUE )
   uploadFile( @RequestPart("file") MultipartFile f

   - needs feign-form-spring dep >  @Bean return Encoder


- In your service Class autowire or create instance of your feign client interface
-  use this instance to call APIs




3. Configuration

- feign:
    - client:
      - config:
         - default:  -> here put deafult( for using global configs in all clients or give name of your client interface (name= "dinerService" to config that service only
            - connectTimeout:
            - readTimeout: 
            - loggerLevel: NONE BASIC HEADERS FULL  -> more config are needed for logging beside these 


- logging:
 - level:
    - feign: DEBUG  -> general feign logging
    - feign.client: DEBUG  -> related to feign client req res
    - feign.Logger: DEBUG  -> some spring-cloud version logs through this, backward compatility
    - com.dinerService: DEBUG     -> logging related to your specific package
  
      
- java classes can also be used for a more fine control over configs and returning Logger.Level and Request.Options from the config class using @beans





4. Error handling / Exceptions

- feign throws FeignException

-Custom error decorder implements ErrorDecorder

   now based on your status of Response you handle handle error here: 
   -  @Override decode method ( String methodKey (-> interface name ,method name etc uid ) , Response ( -> headers body status etc)
   -   if response.status() == 404 return some Exception
   -   finally if nothing matches  new Default().decode(key,response);

  - now add this in your Customconfig java class
    @Bean
    ErrorDecoder errorDEc(){   return new CustomErrorDec -> your class name just implemented above }





5. similarly request interceptors can be implemented for modifying incoming requests

- implements RequestInceptor @override apply(RequestTemplate ) .header("key", value);
- RequestTemplate..feignTarger() -> get details of current client in call




6. Retry
- feign retries for specific status codes by default like 5xx , connection timeouts
- feign.cleint.config.serViceName.retryer= feign.Retryer.Default

- to disable add a @bean in config  return Retryer.NEVER_RETRY
- similarly for custom retry logics return  Retryer.Default( period, max , times )



7. Load balancing
- spring cloud starter load balancer or any other balancer used
- feign will do lookup with SD choose instance



8.fallback and resilience 
- using 4j 
- create a fallback componenet implementing your feignService {
      @Override your get/post method in this
          and return some fallback or error response

- put this on client using fallback = CustomFallbackForDinerService.class
- add spring.cloud.circuitbreaker.resilience4j.enable=true -> integration will spring cloud CB abstraction
         
