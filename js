 $('input[name="seniorCitizen"]:checked').val();
 
 
 
 to parse the data in session and extract prop
 let fingureData =  JSON.parse(sessionStorage.getItem("fingureData"))["biometricKYCData"];
	biometricKYCData["uId"] = fingureData["uId"];  


set in session 
	sessionStorage.setItem("bio_kyc_payload", JSON.stringify(ekyc));


fetch('https://api.ipify.org/').then(
  r => r.text()
).then(console.log);


disable fields 
	$("#amountDeposit_accdetails").prop("disabled", true);
	
