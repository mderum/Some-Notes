Dep 

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webflux</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-gateway-mvc</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
		</dependency>




prop 

    
    spring:
      application:
        name: gateway
    
      cloud:
       gateway: 
           routes:
            - id: USERSERVICE
              uri: lb://USERSERVICE
              predicates:
                  -Path: /**
                  
            - id: PRICESERVICE
              uri: lb://PRICESERVICE
              predicates:
                  -Path: /**
      
                        
    server:
        port: 9090
    
    eureka:
      client:
        register-with-eureka: true 
        service-url:
           defaultZone: http://localhost:8761/eureka
        fetch-registry: true
      instance:
        prefer-ip-address: true
 
