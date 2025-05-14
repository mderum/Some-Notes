***DEP***

{
      
         <properties>
      		<spring-cloud.version>2023.0.5</spring-cloud.version>
      	</properties>

 
      <dependency>
      			<groupId>org.springframework.cloud</groupId>
      			<artifactId>spring-cloud-starter</artifactId>  It sets up a base foundation, for other cloud features , provides contezt , a meta starter
      		</dependency>
      		<dependency>
      			<groupId>org.springframework.cloud</groupId>
      			<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>  eureka server implementation
      		</dependency>

  }


  ----

  ***App props***

  {
      
      spring.application.name=serviceRegistry
       
      eureka.instance.hostname=localhost
      #do not self register with sever 
      eureka.client.register-with-eureka=false
      #not a client no need to fetch registry 
      eureka.client.fetch-registry=false
      server.port=8761
  
  }



----

  ***Bootstraper Class***

  {
      
    @SpringBootApplication
    @EnableEurekaServer  // for spring V 3X use @EnableDiscoveryClient
    public class ServiceRegistryApplication {
  
  }
