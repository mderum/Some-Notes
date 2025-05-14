***DEP***

{

            #needed for both
         <properties>
      		<spring-cloud.version>2023.0.5</spring-cloud.version>
      	</properties>


                   #needed for server only 
                  <dependency>  
      			<groupId>org.springframework.cloud</groupId>  
      			<artifactId>spring-cloud-starter</artifactId>  It sets up a base foundation, for other cloud features , provides contezt , a meta starter
      		</dependency>
      		<dependency>
      			<groupId>org.springframework.cloud</groupId>
      			<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>  eureka server implementation
      		</dependency>

                   #needed for client only 
                  <dependency> 
                  			<groupId>org.springframework.cloud</groupId>
                  			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
                  		</dependency>


                   #needed for both
                    	<dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>
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


	#service
  	spring.application.name=UserService
	server.port=8080
 	#register using ip address not hostmane
	eureka.instance.prefer-ip-address=true
 	#fetch registry periodically 
	eureka.client.fetch-registry=true
 	#register self with the eureka server
	eureka.client.register-with-eureka=true
 	# location of server
	eureka.client.service-url.defaultZone=http://localhost:8761/eureka
  }



----

  ***Bootstraper Class***

  {
      
    @SpringBootApplication
    @EnableEurekaServer  
    @EnableDiscoveryClient   // for spring V 3X use @EnableDiscoveryClient
    public class ServiceRegistryApplication {
  
  }
