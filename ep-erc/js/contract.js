var currentContract = null;
cachedContracts = null;
var	contractDataTable = null;


$(document).ready(function() {
	
	
	$("#contractsToggleShowClosedContracts").change(function() {
	    if(this.checked) {
		    $('#system_showClosedContracts').prop('checked', true);
		    $("#systemSubmitButton").trigger("click");
			getSystem(1);
			getContracts();
	        //getCOntracts
	    } else {
		    $('#system_showClosedContracts').prop('checked', false);
		    $("#systemSubmitButton").trigger("click");
			getSystem(1);
			getContracts();
	    }
	});


	$('#printContractButton').click(function() {
		
		populateContractPrintForm(currentContract[0]);
		
	   //num = $(this).attr("data-id");
	   w = window.open();
	   w.document.write(
	                   $("#print-header").html() +
	                   $("#ercForm_mainPrintDIV").html()
	                   );
	   // w.document.getElementById("ercForm_lastName").value = "test";
	   w.document.close();
	   w.focus();
	   w.print(); //Don't do this otherwise chrome won't work. Look at the onload on the body of the newly created window.
	   w.close(); // Don't do this otherwise chrome won't work
	});
	
	$("#contractsPrintSelected").click(function(){
		printContracts("selected");
	});
	
	$("#contractsPrintAll").click(function(){
		if(confirm("Are you sure you want to print all Contracts currently in the list"))
		printContracts("all");
	});

});

function printContracts(s) {
	
	var output = "";
	var count = 0;
	
	if(s == "all") {
		count = 0;
		
		for(var j = 0; j < cachedContracts.length; j++) {
			
				populateContractPrintForm(cachedContracts[j]);
				if(count != 0) output += "<div style='page-break-after: always;'></div>"
				output += $("#ercForm_mainPrintDIV").html()
				count++; // count help keep the extra page from printing
		}
	} else {
		// print selected
		
			tableRows = contractDataTable.fnGetNodes();
			
			//loop through each of the table rows
			count = 0;
			for(var i=0; i<tableRows.length; i++) {
				// alert(tableRows[i].getElementsByTagName("input")[0].checked);
				//alert(tableRows[i].getElementsByTagName("input")[0].id);
				
				if(tableRows[i].getElementsByTagName("input")[0].checked) {
					for(var j = 0; j < cachedContracts.length; j++) {
						
						if(cachedContracts[j].ID == tableRows[i].getElementsByTagName("input")[0].id) {
							populateContractPrintForm(cachedContracts[j]);
							if(count != 0) 
								output += "<div style='page-break-after: always;'></div>"
							output += $("#ercForm_mainPrintDIV").html()
							count++; // count help keep the extra page from printing
						}
					}
				}
			} // end for
			
	} // end if else 

	w = window.open();
    w.document.write(
                   $("#print-header").html() +
                   output
                   );
    // w.document.getElementById("ercForm_lastName").value = "test";
    w.document.close();
    w.focus();
    w.print(); //Don't do this otherwise chrome won't work. Look at the onload on the body of the newly created window.
    //w.close(); // Don't do this otherwise chrome won't work


    if(confirm("Close contracts just printed?")){

			tableRows = contractDataTable.fnGetNodes();
			
			for(var i=0; i<tableRows.length; i++) {
				if(tableRows[i].getElementsByTagName("input")[0].checked) {
					updateContractCompleteDate(tableRows[i].getElementsByTagName("input")[0].id, "update");
				}
			}	    
			getContracts();
    }
}


function populateContractPrintForm(aContract) {
	
	if(!aContract) {
		alert("Please select a contract!");
	} else {
		
		
		
		$("#ercForm_name").html(aContract.lastName + ", " + aContract.firstName + " " + aContract.Initial);
		
		
		$("#ercForm_cellphone").html(aContract.cellPhone);
		$("#ercForm_street").html(aContract.street);
		$("#ercForm_cityStateZip").html(aContract.city + ", " + aContract.state + " " +aContract.zip);

		$("#ercForm_height").html(formatHeight(aContract.height));
		
		
		$("#ercForm_weight").html(formatWeight(aContract.weight));
		$("#ercForm_age").html(aContract.age);
		$("#ercForm_emailAddress").html(aContract.emailAddress);
		
		if(aContract.skierType)
			$("#ercForm_skierType").html(aContract.skierType);
			
		if(aContract.snowboardStance)
			$("#ercForm_snowboardStance").html(aContract.snowboardStance);
		
	}
	
}




function showContracts(contracts) {
	contractDataTable = $('#contractsTable').dataTable(); // assign to the global variable to use to add batches

	contractDataTable.fnClearTable();
		
	for(var i = 0; i < contracts.length; i++) {
		// add the row to the data table
		var newRow = contractDataTable.fnAddData([
							"<input type='checkbox' class='erc_printCheckBox' id='" + contracts[i].ID + "'>", 
							contracts[i].lastName, 
							contracts[i].firstName, 
							contracts[i].emailAddress,  
							contracts[i].cellPhone,  
							contracts[i].closeDate ]);
							
		var row = contractDataTable.fnGetNodes(newRow); // get the row added
		$(row).attr('id', contracts[i].ID); // add the id from the database as the id of the tr
		
	} // end for
	
	$("#contractsTitle").html("contracts (" + contracts.length + ")")	
	
	// this neds to be after the dataTable command
	// this captures the clict event when a row is clicked
	$('#contractsTable tbody').on('click', 'tr', function () {
        getSingleContractData( this.id ); // the id is set with the tr from the database id
        
    } );

	if($("#contractsTable_filter label").text() == "Search:") {
		$("#contractsTable_filter label").prepend("<a href='javascript:clearContractDataTableFilter()'>Clear </a>");
	}
}

function clearContractDataTableFilter() {
	$("#contractsTable_filter input").val("");	
	contractDataTable.fnFilter("");
}


function editContract() {
	// to edit the patient - we reuse the add patient model
	// just need to make sure we reset any labels etc. to manage between
	// add and edit
	$("#addContractModalLabel").html("Edit Contract"); // change the label on the modal for edit from add
	$("#submitContractButton").prop("value", "Edit Contract");
	
	$("#contract_name").val(currentContract[0].contractName).removeClass("invalid").addClass("valid");
	// set the value and the class to valid for validation
	$("#contract_Contract").val(currentContract[0].contract);
	$("#contract_userCombo").val(currentContract[0].assignedUserID);
	$("#contract_openDate").val(currentContract[0].openDate);
	$("#contract_closeDate").val(currentContract[0].closeDate);
	$("#contract_status").val(currentContract[0].status);
	
	
	$("#erc_firstName").val(currentContract[0].firstName);
	$("#erc_initial").val(currentContract[0].Initial);
	$("#erc_lastName").val(currentContract[0].lastName);
	$("#erc_cellPhone").val(currentContract[0].cellPhone);
	$("#erc_street").val(currentContract[0].street);
	$("#erc_city").val(currentContract[0].city);
	$("#erc_state").val(currentContract[0].state);
	$("#erc_zip").val(currentContract[0].zip);
	$("#erc_weight").val(currentContract[0].weight);
	$("#erc_height").val(currentContract[0].height);
	$("#erc_age").val(currentContract[0].age);
	$("#erc_emailAddress").val(currentContract[0].emailAddress);
	$("#erc_skierType").val(currentContract[0].skierType);
	$("#erc_snowboardStance").val(currentContract[0].snowboardStance);
	
	var form_data = $("#addContractForm").serializeArray();
		for (var input in form_data){
			
			// gets the element in the form
			var element = $("#erc_" + form_data[input]['name']);
		
			// gets the span for each element
			var error_element = $("span", element.parent());
				
			// reset the validation classes
			error_element.removeClass("error_show").addClass("error");
			element.removeClass("invalid").addClass("valid")
			//error_element.removeClass("error").addClass("error_show");
			//element.removeClass("valid").removeClass("invalid")
		} // end for

	
	
	$("#contractsModal").modal('show');
}




function getSingleContractData(contractID) {
	if(contractID != 0) {
		getSingleContractDetail(contractID);
		$("#contractNotesTableBody").html("");
		getContractNotes(contractID);
	} else {
		$("#contractNotesTableBody").html("");
		$("#contractTempsTableBody").html("");
		$("#contractDetail").html("");
		$("#editContractLink").html("");
		$("#deleteContractLink").html("");
		$("#contractDetailTitle").html("");
		$("#contractNotesTitle").html("Contract Notes (0)");
	}
}



function getSingleContractDetail(contractID) {
	
	var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getContracts.php " + resp);
						
						if(resp != 0){
							resp = $.parseJSON(resp);
							showContractDetail(resp.contracts);
						
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","getContracts.php?ID=" + contractID, true);	
				
				xmlhttp.send();
}


function showContractDetail(contracts) {
	// batches is an array of 1 record for the indivudual batch
		currentContract = contracts;
		

		var myContract = "Contract ID - Name: ";
		
		myContract += contracts[0].ID + " - (" + contracts[0].firstName + " " + contracts[0].lastName + ")";
		$("#contractsDetailTitle").html(myContract);

		var myTable	= "<table class='table table-bordered table-condensed' >";
			//myTable	+= "<tr>";
				myTable	+= "<col class='col-sm-6'>";
				myTable	+= "<col class='col-sm-6'>";
			//myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>First Name</th>";
				myTable	+= "<td>" + contracts[0].firstName + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Initial</th>";
				myTable	+= "<td>" + contracts[0].Initial + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Last Name</th>";
				myTable	+= "<td>" + contracts[0].lastName + "</td>";
			myTable	+= "</tr>";

			myTable	+= "<tr>";
				myTable	+= "<th>Street Address</th>";
				myTable	+= "<td>" + contracts[0].street + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>City</th>";
				myTable	+= "<td>" + contracts[0].city + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>State</th>";
				myTable	+= "<td>" + contracts[0].state + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Zip</th>";
				myTable	+= "<td>" + contracts[0].zip + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Email Address</th>";
				myTable	+= "<td>" + contracts[0].emailAddress + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Weight</th>";
								
				myTable	+= "<td>" + formatWeight(contracts[0].weight) + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Height</th>";
				myTable	+= "<td>" + formatHeight(contracts[0].height) + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Age</th>";
				myTable	+= "<td>" + contracts[0].age + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Skier Type</th>";
				myTable	+= "<td>" + contracts[0].skierType + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Snowboard Stance</th>";
				myTable	+= "<td>" + contracts[0].snowboardStance + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Close Date</th>";
				
				if(!contracts[0].closeDate) {
					myTable += "<td><a href='javascript:updateContractCompleteDate(" + contracts[0].ID + ",\"update\")'>Update with todays date</a></td>";	
				} else {
					myTable	+= "<td>" + contracts[0].closeDate + "<a href='javascript:updateContractCompleteDate(" + contracts[0].ID + ")'> remove date</a></td>";
				}
				
			myTable	+= "</tr>";
		myTable	+= "</table>";  
	
	$("#contractDetail").html(myTable);
	$("#editContractLink").html("<a href='javascript:editContract()'>edit</a>");
	$("#deleteContractLink").html("<a href='javascript:deleteContract(" + contracts[0].ID + ", \"remove\")'>delete</a>");
}

function updateContractCompleteDate(cID, action) {
	
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getContracts();
							getSingleContractData(cID);
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","updateContractCompleteDate.php?cID=" + cID +
																"&action=" + action, true);	
				
				xmlhttp.send();
}


function formatWeight(weight) {
		var wgt = weight;
		wgt = wgt.replace("(", "<small>(");
		wgt = wgt.replace(")", ")</small>");
		return wgt;
}

function formatHeight (height) {
	
	var theHeight="";
	
	switch(height+"") {
		case "410":
				theHeight = "&#8804 4'10\" <small>(&#8804 148 cm)</small>";
				break;
		case "411 51":
				theHeight = "4'11\"-5'1\" <small>(149-157 cm)</small>";
				break;
		case "52 55":
				theHeight = "5'2\"-5'5\" <small>(158-166 cm)</small>";
				break;
		case "56 510":
				theHeight = "5'6\"-5'10\" <small>(167-178 cm)</small>";
				break;
		case "511 64":
				theHeight = "5'11\"-6'4\" <small>(179-194 cm)</small>";
				break;
		case "65":
				theHeight = "&#8805 6'5\" <small>(&#8805 195 cm)</small>";
				break;
		default:
				theHeight = height;		
	}
	return theHeight;
}


function deleteContract(cID) {
	if(confirm("Are you sure you want to delete this Contract?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getContracts();
							getSingleContractData(0);
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","deleteContract.php?cID=" + cID, true);	
				
				xmlhttp.send();
	}

}






function showContractNotes(contractNotes) {
	
	
	$("#contractNotesTableBody").html("");
	//alert(patientNotes.length);
	var noteRows = "";

		for(var i = 0; i < contractNotes.length; i++) {
			noteRows += "<tr>";
			noteRows += "<td width='200'>";
			noteRows += "<textarea readonly id='' rows='2' cols='25' maxlength='1056'>" + contractNotes[i].note + "</textarea>"
			noteRows += "</td>"
			noteRows += "<td width='200'>" + contractNotes[i].dayte + "</td>";
			noteRows += "<td><a href='javascript:removeContractNote(" + contractNotes[i].ID + ")'>remove</a></td>";
			noteRows += "<tr>";
		}
		
		$("#contractNotesTitle").html("Contract Notes (" + contractNotes.length + ")");
		$("#contractNotesTableBody").append(noteRows);
	
}

function removeContractNote(contractNoteID) {
	if(confirm("Are you sure you want to delete this note?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getContractNotes(currentContract[0].ID);
						
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","removeContractNote.php?contractNoteID=" + contractNoteID, true);	
				
				xmlhttp.send();
	}
}





function getContractNotes(contractID) {
	var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatientNotes php " + resp);
						
						if(resp != 0){
							resp = $.parseJSON(resp);
							showContractNotes(resp.contractNotes);
						
						} else {// no results
							$("#contractNotesTitle").html("Contract Notes (0)");
							$("#contractNotesTableBody").html("");

							// alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","getContractNotes.php?contractID=" + contractID, true);	
				
				xmlhttp.send();
}


function saveContractNote() {
	
	var note = $("#contractNoteTextarea").val();
	//alert($("#patientNoteTextarea").val());
			
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var resp = xmlhttp.responseText; // return values go here
				
				// alert("respone from savePatientNote php " + resp);
				
				if(resp == 1){
					$('#contractNoteTextarea').val("");
					$('#addContractNoteModal').modal('hide');
					getContractNotes(currentContract[0].ID);

				} else {
					alert(resp);
				}
			} //end if
		} // end  function

		xmlhttp.open("GET","saveContractNote.php?contractID=" + currentContract[0].ID +
												"&note=" + note, true);	
		xmlhttp.send();
}



function getContracts() {
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from getContracts.php " + resp);
					
					if(parseInt(resp) != 0){
						resp = $.parseJSON(resp);
						// batchesArray = resp.batches; // global - not sure yet if needed
						// set the global var with latest contracts dataset
						cachedContracts = resp.contracts;
						showContracts(resp.contracts);
											
					} else {
						if(resp != "0 results")
							alert(resp);
					}
				} //end if
			} // end  function

			//alert(systemSettings[0].showClosedContracts);
			xmlhttp.open("GET","getContracts.php?ID=all&showCompleteContracts=" + systemSettings[0].showClosedContracts, true);	
			
			xmlhttp.send();
}







function closeContractModal() {
	resetAddContractForm();
}


function resetAddContractForm() {
	
 	$('#addContractForm').trigger("reset");
 	
 	$("#submitContractButton").prop("value", "Add Contract");

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

	$('#contractsModal').modal('hide');
}


function addContract(contractID) {
	//alert(addContract);
	
	var formData = new FormData();
	
	var cID = (contractID == "undefined" || contractID == null) ? "undefined" : contractID;
	formData.append('cID', cID);
	
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
	formData.append('operatorUserName', getCookie("user"));
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var resp = xmlhttp.responseText; // return values go here
			
			//alert("respone from addContract.php " + resp);
						
			if(parseInt(resp) > 0){
				alert('Add/Edit Contract Submitted');
				
				resetAddContractForm();
				getContracts();	
				if(contractID)
					getSingleContractData(contractID);
			} else {
				alert(resp);
			}
		} //end if
	} // end  function

	xmlhttp.open("POST","addContract.php", true);									
	xmlhttp.send(formData);
		
}


$(document).ready(function() {
	//alert("doc.ready");
	
	// this event is triggered when the contracts menu items is clicked
	$(".nav-tabs a[href='#contractsMenu']").on('shown.bs.tab', function(){
         getContracts();
        // alert("hrtre");
    });
    
    
	$("#addContractNoteModal").on("hidden.bs.modal", function () {
		$('#batchContractTextarea').val("");
	});
	
	$('#addContractNoteModal').on('shown.bs.modal', function () {
		$('#contractNoteTextarea').focus();
	});	
	
}); // end $(document)


$(document).ready(function() {
	
		$('#erc_completeDate').datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			changeYear: true,
			yearRange: "1900:2016"
		})

	
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
			var error_free = true;
			
			// for the fields that we do not want to validate - add here to enfource they are not validated
			$("#erc_initial").removeClass("invalid").addClass("valid")
			$("#erc_emailAddress").removeClass("invalid").addClass("valid")
			$("#erc_snowboardStance").removeClass("invalid").addClass("valid")
			$("#erc_skierType").removeClass("invalid").addClass("valid")

			for (var input in form_data){
				var element = $("#erc_" + form_data[input]['name']);
				var valid = element.hasClass("valid");
				
				var error_element = $("span", element.parent());
				if (!valid) {
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
			
			if (!error_free){
				//event.preventDefault(); 
				//alert(' errors: Form will NOT be submitted');
			}else{
				//alert('No errors: Form will be submitted');
				
				
				if($("#submitContractButton").prop("value") == "Add Contract"){
					addContract();
				} else {
					addContract(currentContract[0].ID);
				}
				closeContractModal();				
			}
		});
});

