
@SpringBootTest
@ActiveProfiles("test") -> for loading application props  application-test.properties
@MockBean( { DINER_SREVICE.class , XYZ.class } ) 

class  DINER_TEST_SERVICE {

@Test 
void contextLoads(){  ->> confirms if the context load is done without any errors , helps in coverage 

}



---


Other Test classes 


1.
  --@Mock your beans
  
  --@InjectMocks   ->> injects the @Mock components in this component like inject a @Mock repo into a DinserService
  
  --@Autowire for components like objectmapper etc

  --declare the final var for data setup

  --@BeforeEach
  void setup(){ ->> init your beans and any other thirdpty beans


2. Test methods
   --@Test
   --@DisplayName(" Name of the test methods " )
   --when( something.something() ).thenReturn( response )  OR .thenThrow( new Exception() )
   --anyString() -> accept any string as input
   --any() OR  any( DinerService.clas )  ->  any data of this type




3. calling the Api endpoints
   
   --mockMvc.perform(  get( URL ).param( "key",value) .header( key,value )  ).

   -- perform POST ->   .content( should use objectMapper.asValueAsString( DinerDto) )

   --after the above call it will return a status and response  .andExpect( status().isOk()/badRequest/gateway etc )
        .addExpect( check here if data in resposne exist jsonPath( $.data).exist()  )
         Json path $. root folowed by properties like $.dinerName $.error.message  ).value(" e1" ) ->matches with this value 




  --verify( mockedDinerSerive , time( number of times the is being called 1 or 2 or 3 etc ) ).getDinerDetails(requestData) 






4. if not using mockito runner 5
    put MockitoAnnotation.openMocks( this )   ->> init the mocks or injectmocks , use this in @BeforeEach

   


5. Asserts
-- assertThat( data ) .isNotNull()  .isEqualTo( value )


----


6. mocking application properties if not loading
      Field feesField = BuyTransactionalService.class.getDeclaredField("dinerCharges");
        feesField.setAccessible(true);
        feesField.set(buyTransactionalService, 0.02);
