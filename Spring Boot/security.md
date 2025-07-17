1. Basic security
    add spring-boot-starter-security

spring:
     security:
        user: 
          name: DinerCorp
          password: pass@123

    

2. Using  defines roles in spring
    > @EnableWebSecurity >v2.7 --registers security filter chain with context > authenticates http request
    > create a  @Congifuration class  @Bean returning SecurityFilterChain accepts (  HttpSecurity http )
         > htttp.authoriseHttpRequest(  request ->  request.
              requestMatchers(  "/urlPattern/**" ).hasRole( "ROLE_TYPE" )

     ) .anyRequest().authenticated() ) .httpBasic();

    return http.build();



   
