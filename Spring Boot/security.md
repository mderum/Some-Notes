1. Basic security
    add spring-boot-starter-security

spring:
     
     security: 
        user: 
          name: DinerCorp
          password: pass@123

    

2. Using  defines roles in spring


        > @EnableWebSecurity >v2.7 --registers security filter chain with context or turns on the web SEC support
           without it spring will apply default rules.
        
        > create a  @Congifuration class  @Bean returning SecurityFilterChain accepts (  HttpSecurity http )
                http.authorizeHttpRequests(
                        authorize
                                -> authorize
                                .requestMatchers("/ping/**").hasRole("ADMIN")
                                .requestMatchers("/user/**").hasRole("USER","ADMIN")
                                .requestMatchers("/public/**").permitAll()  ->> permits all , without login 
                                .anyRequest()
                                .authenticated())
                        .httpBasic(Customizer.withDefaults())  --> without this popup of login wont come 
                        .csrf(AbstractHttpConfigurer::disable); 
        
                return http.build();


4. create a @Bean of UserDetailsService() {

             -> user will not automatically
           logout once logged in , data needs to be deleted from session or through spring http request 

            UserDetails = User.withUserName("kk").
               password( passwordEncoder().encode("1234") )  -> encoding is must with spring 5
               .roles("USER").build();
        
          return new InMemoryUserDetailsManager(kk,xyz);
   }




---impl sample 




@Configuration
@EnableWebSecurity
public class SecConfigs {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                authorize
                        -> authorize
                        .requestMatchers("/ping/**").hasRole("ADMIN")
                        .requestMatchers("/user/**").hasRole("USER")
                        .requestMatchers("/public/**").permitAll() // public access
                        .anyRequest()
                        .authenticated())
                .httpBasic(Customizer.withDefaults()) // ✅ new way
                .csrf(AbstractHttpConfigurer::disable); // optional, for APIs

        return http.build();
    }

    @Bean
    public UserDetailsService userDefinations() {

        UserDetails kk = User.withUsername("kk")
                .password(passwordEncoder().encode("1234"))
                .roles("USER").build();


        UserDetails adi = User.withUsername("adi")
                .password(passwordEncoder().encode("1234"))
                .roles("ADMIN").build();

        return new InMemoryUserDetailsManager(kk, adi);


    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}
