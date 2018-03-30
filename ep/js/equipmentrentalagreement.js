		

function addContract() {
	//alert(addContract);
	
	var formData = new FormData();
	
	formData.append('erc_firstName', $("#erc_firstName").val());
	formData.append('erc_initial', $("#erc_initial").val());
	formData.append('erc_lastName', $("#erc_lastName").val());
	formData.append('erc_cellPhone', $("#erc_cellPhone").val());
	formData.append('erc_street', $("#erc_street").val());
	formData.append('erc_city', $("#erc_city").val());
	formData.append('erc_state', $("#erc_state").val());
	formData.append('erc_zip', $("#erc_zip").val());
	formData.append('erc_weight', $("#erc_weight").val());
	formData.append('erc_height', $("#erc_height").val());
	formData.append('erc_age', $("#erc_age").val());
	formData.append('erc_emailAddress', $("#erc_emailAddress").val());
	formData.append('erc_skierType', $("#erc_skierType").val());
	formData.append('erc_snowboardStance', $("#erc_snowboardStance").val());
	
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var resp = xmlhttp.responseText; // return values go here
			
			//alert("respone from addContract.php " + resp);
						
			if(parseInt(resp) > 0){
				alert('Contract Submitted - add additional notes here for the customer if desired');
			} else {
				alert(resp);
			}
		} //end if
	} // end  function

	xmlhttp.open("POST","addContract.php", true);									
	xmlhttp.send(formData);
		
}

function closeContractModal() {
	resetAddContractForm();
}

function resetAddContractForm() {
	
 	$('#addContractForm').trigger("reset");

		// reset the validation
		var form_data = $("#addContractForm").serializeArray();
		for (var input in form_data){
			
			// gets the element in the form
			var element = $("#erc_" + form_data[input]['name']);
		
		// gets the span for each element
		var error_element = $("span", element.parent());
			
		// reset the validation classes
		error_element.removeClass("error_show").addClass("error");
		element.removeClass("invalid").removeClass("valid")
		} // end for
		
		$("#erc_snowboardStance").removeClass("valid").removeClass("invalid");
		$("#erc_skierType").removeClass("valid").removeClass("invalid");


	$('#addContractModal').modal('hide');
}



$(document).ready(function() {
	
	
			$("#erc_skierType").prop("disabled", true);
			$("#erc_snowboardStance").prop("disabled", true);
			
			
			$("input[name='skierOrSnowboarder']").on("change", function () {
										    										    
									if ($("#erc_skierRadio").is(":checked")) {
								        $("#erc_skierType").prop("disabled", false);
											$("#erc_snowboardStance").removeClass("valid").removeClass("invalid");
								    }
								    else {
								        $("#erc_skierType").prop("disabled", true);
								        $("#erc_skierType").val(".");
								    }										    
								    
									if ($("#erc_showboardRadio").is(":checked")) {
								        $("#erc_snowboardStance").prop("disabled", false);
								        	$("#erc_skierType").removeClass("valid").removeClass("invalid")
								    }
								    else {
								        $("#erc_snowboardStance").prop("disabled", true);
								        $("#erc_snowboardStance").val(".");
								    }										    
								    
								}); 

			

			
	
			// on close of the erc modal
			$('#addContractModal').on('hidden.bs.modal', function () {
			 	// reset the form
			 	//alert("test");
			 	$('#addContractForm').trigger("reset");
			
			 		// reset the validation
			 		var form_data = $("#addContractForm").serializeArray();
			 		for (var input in form_data){
			 			
			 			// gets the element in the form
			 			var element = $("#erc_" + form_data[input]['name']);
						
						// gets the span for each element
						var error_element = $("span", element.parent());
							
						// reset the validation classes
						error_element.removeClass("error_show").addClass("error");
						element.removeClass("invalid").removeClass("valid")
			 		} // end for
			 	
			});
			
	
		/* Real-time Validation  */
			/* Name can't be blank  */
			$('#erc_lastName').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_firstName').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_cellPhone').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_street').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_city').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_state').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_zip').on('input', function() {
				var valid = true;
				var input=$(this);
				var is_name=input.val();
				if(is_name)	{
					valid=true;
			
					if(isNaN(is_name)) {
						valid = false;
					} else {
						if(is_name.toString().length != 5) {
							valid = false;
						} else {
							valid = true;
						}
					}
				} else {
					valid=false;
				}
				
				if(valid) {
					input.removeClass("invalid").addClass("valid");	
				} else {
					input.removeClass("valid").addClass("invalid");
				}
				
				
			});
			
			$('#erc_weight').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_height').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			$('#erc_age').on('input', function() {
				var input=$(this);
				var is_name=input.val();
				if(is_name){input.removeClass("invalid").addClass("valid");}
				else{input.removeClass("valid").addClass("invalid");}
			});
			
			
			/* After Form Submitted Validation */
		$("#contractSubmit input#submitContractButton").click(function(event){
			var form_data = $("#addContractForm").serializeArray();
			console.log(form_data);
			var error_free = true;
			
			// for the fields that we do not want to validate - add here to enfource they are not validated
			$("#erc_initial").removeClass("invalid").addClass("valid")
			$("#erc_emailAddress").removeClass("invalid").addClass("valid")
			$("#erc_skierRadio").removeClass("invalid").addClass("valid")
			$("#erc_skierType").removeClass("invalid").addClass("valid")
			$("#erc_snowboardStance").removeClass("invalid").addClass("valid")
			$("#erc_showboardRadio").removeClass("invalid").addClass("valid")
			$("#skierOrSnowboarder").removeClass("invalid").addClass("valid")

			for (var input in form_data){
				var element = $("#erc_" + form_data[input]['name']);
 				var valid = element.hasClass("valid");
				
				var error_element = $("span", element.parent());
				
				if (!valid && ($(element).attr('id'))) {
					error_element.removeClass("error").addClass("error_show"); 
					element.removeClass("valid").addClass("invalid");							
					error_free=false;
					//alert(error_element);
				}
				else {
					error_element.removeClass("error_show").addClass("error");
					element.removeClass("invalid").addClass("valid")
				}
			}
			
			if(!$("input:radio[name='skierOrSnowboarder']").is(":checked")) {
				alert("sdfsdffsds");
									
				$("#erc_snowboardStance").removeClass("valid").addClass("invalid");
				$("#erc_skierType").removeClass("valid").addClass("invalid");
				error_free=false;
			} else {
				
				if($("#erc_skierRadio").is(":checked")) {
					
					$("#erc_snowboardStance").removeClass("valid").removeClass("invalid")
					
					if($("#erc_skierType").val() != ".") {
					// no error
						$("#erc_skierType").removeClass("invalid").addClass("valid")
					} else {
						$("#erc_skierType").removeClass("valid").addClass("invalid")
						error_free=false;
					}
				}
				
				if($("#erc_showboardRadio").is(":checked")) {
					
					$("#erc_skierType").removeClass("valid").removeClass("invalid")
					
					if($("#erc_snowboardStance").val() != ".") {
					// no error
						$("#erc_snowboardStance").removeClass("invalid").addClass("valid")
					} else {
						$("#erc_snowboardStance").removeClass("valid").addClass("invalid")
						error_free=false;
					}
				}
					
			}
			
			if (!error_free){
				//event.preventDefault(); 
				alert(' errors: Form will NOT be submitted');
			}else{
				//alert('No errors: Form will be submitted');
				addContract();
				closeContractModal();				
			}
		});
});
