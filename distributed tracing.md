Spring cloud sleuth and zipkin 

add dep in pom and add bom  spring-start-cloud-

add config in application prop ( server url for zipkin ) 

---

open telem + jaegar

start jaeger server + OTPL ( protocol for sendig trace and data to jaeger ) 
add dep in spring pom
run open tel .jar in server 


---

in third party calls or in case of noices 
lower the sampling / add trace id manually  / use async exporters / skip noices / 
