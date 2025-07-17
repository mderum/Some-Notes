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


3. create a @Bean of UserDetailsService() {  -> user will not automatically
   logout once logged in , data needs to be deleted from session or through spring http request 

    UserDetails = User.withUserName("kk").
       password( passwordEncoder().encode("1234") )
       .roles("USER").build();

  return new InMemoryUserDetailsManager(kk,xyz);
   }

   
