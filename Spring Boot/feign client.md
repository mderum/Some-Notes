1.Declarative Rest Client 
-uses annotations for implementation rather than complete code. 
-auto configs
-service to service call splification 
-pluggable features like Error decoders , request interperters 


2.To start add the dep 
-spring cloud starter openfiegn and spring cloud deps 
- on main class add @EnableFeignClient


-- start by creating a interface for your service call 
  
  @FeignClient(name = "user-service" -> if you are using any SD user name of that service here direclty and spring will resolve the url
          url="localhost:8080/" -> if not using SD put compelete location of service with port here ,along with with application context path 
          configuration = MyCustomConfig.class  -> if using java based configs 
  P I DinerService{
    @GetMapping("getResturant/{id}")
    Resturant getResturantById( @PathVariable("id") String id );

   @PostMapping("submitOrder")
   ResponseDTO  submitOrder( @RequestBody OrderDetails );



-In your service Class autowire or create instance of your feign client interface
- use this instance to call APIs


3. Configuration

feign:
    client:
      config:
       default:  -> here put deafult( for using global configs in all clients or give name of your client interface (name= "dinerService" to config that service only
        connectTimeout:
        readTimeout: 
        loggerLevel: NONE BASIC HEADERS FULL  -> more config are needed for logging beside these 


logging:
  level:
    feign: DEBUG  -> general feign logging
    feign.client: DEBUG  -> related to feign client req res
    feign.Logger: DEBUG  -> some spring-cloud version logs through this, backward compatility
    com.dinerService: DEBUG     -> logging related to your specific package
-java classes can also be used for a more fine control over configs and returning Logger.Level and Request.Options from the config class using @beans



4. Error handling / Exceptions

- feign throws FeignException

-Custom error decorder implements ErrorDecorder

   now based on your status of Response you handle handle error here: 
   -  @Override decode method ( String methodKey (-> interface name ,method name etc uid ) , Response ( -> headers body status etc)
   -   if response.status() == 404 return some Exception
   -   finally if nothing matches  new Default().decode(key,response);

  
         
