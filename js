 $('input[name="seniorCitizen"]:checked').val();
 
 
 
 to parse the data in session and extract prop
 let fingureData =  JSON.parse(sessionStorage.getItem("fingureData"))["biometricKYCData"];
	biometricKYCData["uId"] = fingureData["uId"];  


set in session 
	sessionStorage.setItem("bio_kyc_payload", JSON.stringify(ekyc));


fetch('https://api.ipify.org/').then(
  r => r.text()
).then(console.log);




var inputField = document.querySelector('#numbers-only');

inputField.onkeydown = function(event) {
  // Only allow if the e.key value is a number or if it's 'Backspace'
  if(isNaN(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
};





//age 

	$("#nomineeDob").change(function() {
		console.log('value selected' , $("#nomineeDob").val()  )
		 var dobString = $("#nomineeDob").val();
		     var dateOfBirth = new Date(dobString.split('/').reverse().join('/'));
			         var today = new Date();

			 
			 					console.log('dateOfBirth' , dateOfBirth  )
			 					
        var age =today.getFullYear() - dateOfBirth.getFullYear();

            if (
										

            today.getMonth() < dateOfBirth.getMonth() ||
            (today.getMonth() === dateOfBirth.getMonth() && today.getDate() < dateOfBirth.getDate())
        ) {	console.log('occured this year'  )
            age--;
        }
								console.log('age' , age  )

			var isMinor =  age < 18;
					console.log('isMinor' , isMinor  )
					
					$("#isNomineeMinor").prop("checked", isMinor);
		   			$("#isNomineeMinor").prop("disabled", true);

   
	});
    



//age and dob 



disable fields 
	$("#amountDeposit_accdetails").prop("disabled", true);
	
	
	
	<c:set value="<%= System.currentTimeMillis() %>" var="currentTime" />
	
	<script src="<%=path%>/jQuery/aeps.js?t=${currentTime}"></script>
	
	
	
	
// trim input length 
oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
	
<input type="number" id="confirmaccountNumber" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
							onpaste="return false;" class="form-control"
							aria-describedby="passwordHelpInline"
							placeholder="Re-enter Account Number" maxlength="15">	
	







date picker ranges 
$("#datepicker").datepicker({
autoclose: true,
todayHighlight: true,
format: 'dd-mm-yyyy',
endDate: '+0d',
autoclose: true,
startDate: '01-01-1920'
}).datepicker('update', new Date());




// alpha only fields 
class =alphabetic-input
     $('.alphabetic-input').on('input', function() {
        // Get the current input value
        var inputValue = $(this).val();

        // Use a regular expression to allow only alphabetic input
        var alphabeticInput = inputValue.replace(/[^a-zA-Z]/g, '');

        // Update the input field with the sanitized value
        $(this).val(alphabeticInput);
      });	
	
	////////////
