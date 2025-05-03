***Scale horizontally***

Stateless service?

> doesnt store any session or data (client context) , requests are independent and self-contained( isolated) , NO HTTP or in mem sesssions
 Pass all required state in requests , store state in external media , repeated request does not cause error or duplication.


Containerization and deployment (AWS)

> Launch a EC2 ins. (allow port 22 SSH)  > get Keypair > using keypair ssh into EC2

>get jdk , docker, git using bash > install cli and elctl and kube ctl(for kubernates) > clone your git service | create a docker file in same  > build  service and docker image

> create a ECR >authenticate docker and push image to ECR  > create EKS (kubernates)

>  create service and deployment yml on EC2  > apply yaml > get public ip of LB

---

>EC2 simple > launch a EC2 > get key > SSH into EC2 using key and public ip > upload jar  (filezilla/putty) > run jar using SSH > add security group for inbound tarrif from specific IP

---
>EC2 + S3 >   Create a EC2 and S3 bucket > upload jar > get presingned URL > SSH into EC2 wget with url > install java > run > check


---

>EKS ECR with docker > build jar > create docker image >  create ECR repo > login CLI > build if not done > tag > push  > now create EKC cluster > connect to EKS update kube config >
 create service ( kind=service  , image = uri of ECR we just uploaded)   and deployment yml ( kind = deployment ) > apply in ctl  > get svc > use url to access


---

>Lambda AWS -> serverless compute  , manages scailing , pay per the time used , build jar (should have aws-spring-boot arch type)
   > create a new function > runtime selection > done >  edit runtime settings  provide fully qualified name package.class::method in handler >   test and check  > now goto api gateway >
   > create new resouce -> put path ( copy from the yml generated in project ) {proxy+} > define method > lambda proxy >  choose yours > create > deploy > here invoke url is the ROOT


> RDS >   create  >select DB +version > get endpoint > use in your yml or env

>EBS  (PaaS) create new > select platform > DB > configure >  create app env > deploy 
