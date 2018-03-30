/* all about managing users  *****************************************/
// global
var currentUser =null;
var userDataTable = null;

function showUsers(users) {
	
	userDataTable = $('#userTable').dataTable(); // assign to the global variable use to add users
	// $("#userListing").html(""); // clears out the current display
	userDataTable.fnClearTable();
		
			for(var i = 0; i < users.length; i++) {
				var newRow = userDataTable.fnAddData([users[i].firstname + " " + users[i].lastname, users[i].username, users[i].email, users[i].role]);
				var row = userDataTable.fnGetNodes(newRow); // get the row added
				$(row).attr('id', users[i].ID); // add the id from the database as the id of the tr
		

							} // end for
	
	$("#userTitle").html("Users (" + users.length + ")")	
	
	// this neds to be after the dataTable command
	// this captures the clict event hen a row is clicked
	
	
	$('#userTable tbody').on('click', 'tr', function () {
        getSingleUserData( this.id ); // the id is set with the tr from the database id
        
    } );
	
	if($("#userTable_filter label").text() == "Search:") {
		$("#userTable_filter label").prepend("<a href='javascript:clearUserDataTableFilter()'>Clear </a>");
	}
}

function clearUserDataTableFilter() {
	// growDataTable.fnFilterClear();
	$("#strainsTable_filter input").val("");
	// $("#growTable_filter input").focus().trigger({ type : 'keypress', which : 13});
	//	$("#growTable_filter input").trigger(jQuery.Event('keypress', {which : 13}));
	
	userDataTable.fnFilter("");
}


function saveUserNote() {
	
	var note = $("#userNoteTextarea").val();
	//alert($("#patientNoteTextarea").val());
			
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					// alert("respone from saveUserNote php " + resp);
					
					if(resp == 1){
						$('#userUserTextarea').val("");
						$('#addUserNoteModal').modal('hide');
						getUserNotes(currentUser[0].ID);

					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","saveUserNote.php?userID=" + currentUser[0].ID +
													"&note=" + note +
													"&systemID=" + getCookie("systemID") +
													"&uname=" + getCookie("user"), 
													true);	
			
			xmlhttp.send();
	
}



function showUserDetail(user) {
	// user is an array of 1 record for the indivudual patient
		var urole = '';
		currentUser = user;
		var userImg;
		
		
		
		if(user[0].photoFileName == "photos/default.jpg") {
			//alert(systemSettings[0].logoImage);
				userImg = systemSettings[0].logoImage;
		} else {
			userImg = user[0].photoFileName;
		}
		
		//alert("useImg " + userImg);
		
		$("#userPhoto").attr('src', userImg + "?ghost=" + Math.random());
		$("#imagePopupImage").attr('src', user[0].photoFileName + "?ghost=" + Math.random()); // set the image popup

		var myUser = user[0].firstname + " " + user[0].lastname + "<br>";
		$("#imagePopupName").html(myUser);
		$("#usersDetailTitle").html(myUser);
				  	 
		var myTable	= "<table class='table table-bordered table-condensed' >";
			//myTable	+= "<tr>";
				myTable	+= "<col class='col-sm-6'>";
				myTable	+= "<col class='col-sm-6'>";
			//myTable	+= "</tr>";
/*
			myTable	+= "<tr>";
				myTable	+= "<th>ID</th>";
				myTable	+= "<td>" + user[0].ID + "</td>";
			myTable	+= "</tr>";
*/
			myTable	+= "<tr>";
				myTable	+= "<th>First Name</th>";
				myTable	+= "<td>" + user[0].firstname + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Last Name</th>";
				myTable	+= "<td>" + user[0].lastname + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Role</th>";
					if(user[0].role == 'u') 
						urole = "User";
					else if(user[0].role == 'a') 
						urole = "Admin";
				myTable	+= "<td>" + urole + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Email Address</th>";
				myTable	+= "<td>" + user[0].email + "</td>";
			myTable	+= "</tr>";
/*
			myTable	+= "<tr>";
				myTable	+= "<th>Grow Tracker</th>";
				myTable	+= "<td>" + ((user[0].grower == 1) ? "yes" : "no") + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Vender Tracker</th>";
				myTable	+= "<td>" + ((user[0].vender == 1) ? "yes" : "no") + "</td>";
			myTable	+= "</tr>";
*/
		myTable	+= "</table>";  
	
	$("#userDetail").html(myTable);
	$("#editUserLink").html("<a href='javascript:editUser()'>edit</a>");
	$("#deleteUserLink").html("<a href='javascript:deleteUser(" + user[0].ID + ")'>delete</a>");
	
}

function deleteUser(userID) {
	if(confirm("Are you sure you want to delete this user?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getUsers();
							getSingleUserData(0);
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","deleteUser.php?userID=" + userID, true);	
				
				xmlhttp.send();
	}

}


function editUser() {
	// to edit the patient - we reuse the add patient model
	// just need to make sure we reset any labels etc. to manage between
	// add and edit
	$("#myUserModalLabel").html("Edit User"); // change the label on the modal for edit from add
	
	
	$("#addEditUserButton").prop("value", "Update User Information");

	$("#user_fname").val(currentUser[0].firstname).removeClass("invalid").addClass("valid");
	// $("#patient_firstName").removeClass("invalid").addClass("valid");
	// set the value and the class to valid for validation
	$("#user_lname").val(currentUser[0].lastname).removeClass("invalid").addClass("valid");
	$("#user_uname").val(currentUser[0].username).removeClass("invalid").addClass("valid");
	$("#user_email").val(currentUser[0].email).removeClass("invalid").addClass("valid");
	$("#user_pword").val(currentUser[0].password).removeClass("invalid").addClass("valid");
	$("#user_role").val(currentUser[0].role).removeClass("invalid").addClass("valid");
	
	$("#userModal").modal('show');
}


function getSingleUserData(userID) {
	if(userID != 0) {
		getSingleUserDetail(userID);
		$("#userNotesTableBody").html("");
		getUserNotes(userID);
	} else {
		$("#userNotesTableBody").html("");
		$("#userDetail").html("");
		$("#editUserLink").html("");
		$("#deleteUserLink").html("");
		$("#usersDetailTitle").html("");
	}
}

	
function getUserNotes(userID) {
	var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatientNotes php " + resp);
						
						if(resp != 0){
							resp = $.parseJSON(resp);
							showUserNotes(resp.userNotes);
						
						} else {// no results
							$("#userNotesTitle").html("User Notes (0)");
							$("#userNotesTableBody").html("");
							// alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","getUserNotes.php?userID=" + userID, true);	
				
				xmlhttp.send();
}




function showUserNotes(userNotes) {
	
	$("#userNotesTableBody").html("");
	//alert(patientNotes.length);
	var noteRows = "";

		for(var i = 0; i < userNotes.length; i++) {
			noteRows += "<tr>";
			noteRows += "<td width='200'>";
			noteRows += "<textarea readonly id='' rows='2' cols='25' maxlength='1056'>" + userNotes[i].note + "</textarea>"
			noteRows += "</td>"
			noteRows += "<td width='200'>" + userNotes[i].dayte + "</td>";
			noteRows += "<td><a href='javascript:removeUserNote(" + userNotes[i].ID + ")'>remove</a></td>";
			noteRows += "<tr>";
		}
		
		$("#userNotesTitle").html("User Notes (" + userNotes.length + ")");
		$("#userNotesTableBody").append(noteRows);
	
}


function removeUserNote(userNoteID) {
	if(confirm("Are you sure you want to delete this note?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getUserNotes(currentUser[0].ID);
						
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","removeUserNote.php?userNoteID=" + userNoteID, true);	
				
				xmlhttp.send();
	}
}



function getSingleUserDetail(userID) {
	var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getUsers php " + resp);
						
						if(resp != 0){
							resp = $.parseJSON(resp);
							showUserDetail(resp.users);
						
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","getUsers.php?ID=" + userID, true);			
				
				xmlhttp.send();
}





function getUsers() {
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from getUsers php " + resp);
					
					if(resp != 0){
						resp = $.parseJSON(resp);
						showUsers(resp.users);
					
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","getUsers.php?ID=all", true);
			
			xmlhttp.send();
}


function resetUserForm() {
	$('#userForm')[0].reset();
	
	$("#addEditUserButton").prop("value", "Add User");
	$("#addUserModalLabel").html("Add User");
	
	// remove validation classes
	$('#user_fname').removeClass("valid").removeClass("invalid");
	$('#user_lname').removeClass("valid").removeClass("invalid");
	$('#user_uname').removeClass("valid").removeClass("invalid");
	$('#user_email').removeClass("valid").removeClass("invalid");
	$('#reg_role').removeClass("valid").removeClass("invalid");
	$('#reg_pword').removeClass("valid").removeClass("invalid");
	$('#userModal').modal('hide');
}



function addUser(userID) {
	
	// alert("register user"); return;
	if(currentUser[0].username == 'demo') {
		alert("This feature is not available for user demo");
		return;
	}
	
	var fname = $("#user_fname").val();
	var lname = $("#user_lname").val();
	var role = $("#user_role").val();
	var uname = $("#user_uname").val();
	var email = $("#user_email").val();
	var pword = $("#user_pword").val();
	var uID = (userID == "undefined" || userID == null) ? "undefined" : userID;
	var systemID = systemSettings[0].ID;
	var imageFile = document.getElementById("user_imageFile").files[0];
	
	// alert(imageFile.length);
	var formData = new FormData();	
	
	if(imageFile)
		formData.append('user_imageFile', imageFile, imageFile.name);
	
	
	formData.append('fname', fname);
	formData.append('lname', lname);
	formData.append('role', role);
	formData.append('uname', uname);
	formData.append('email', email);
	formData.append('pword', pword);
	formData.append('uID', uID);
	formData.append('systemID', systemID);
	formData.append('operatorUserName', getCookie("user"));
	
	// alert(fname + " " + lname + " " + uname + " " + email + " " + pword);

	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from register user php " + resp);
					
					if(parseInt(resp) > 0){ // must be a valid user id - is greater than zero
						
						$("#user_fname").val("");
						$("#user_lname").val("");
						$("#user_role").val("");
						$("#reg_uname").val("");
						$("#reg_email").val("");
						$("#reg_pword").val("");
		

						alert("Add User Successfull!"); // does no popup ????
						resetUserForm();
						getUsers();	
						if(userID)
							getSingleUserData(userID);
						
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

												
			xmlhttp.open("POST","addUser.php", true); 

			xmlhttp.send(formData);
}



// some of the functionality to process the add user request is in the register.js file
// since we reuse the register modal html

$(document).ready(function() {
	//alert("doc.ready");
	
			// this event is triggered when the patients menu items is clicked
			$(".nav-tabs a[href='#usersMenu']").on('shown.bs.tab', function(){
		        getUsers();
		    });
		    
		    
		    var imagePopCaller = ""; 
		    $("#settingsCompanyLogoAnchor").on('click', function () {
			    imagePopCaller = "settingsCompanyLogoAnchor";
		    });
		    $("#userPhotoAnchor").on('click', function () {
			    imagePopCaller = "userPhotoAnchor";
		    });
		    
		    
		    
		    $("#showImage").on("show.bs.modal", function (e) {
			    
			    
			    if(imagePopCaller == "userPhotoAnchor") {

				    var userImg ="";
				    
				    if(currentUser[0].photoFileName == "photos/default.jpg") {
						userImg = systemSettings[0].logoImage;
					} else {
						userImg = currentUser[0].photoFileName;
					}
				    
					$("#imagePopupImage").attr('src', userImg + "?ghost=" + Math.random()); // set the image popup
					var myUser = currentUser[0].firstname + " " + currentUser[0].lastname + "<br>";
					$("#imagePopupName").html(myUser);
					$("#imagePopupFooterArea").html(myUser);

				}
				
			    if(imagePopCaller == "settingsCompanyLogoAnchor") {

				    var userImg = systemSettings[0].logoImage;
				    
					$("#imagePopupImage").attr('src', userImg + "?ghost=" + Math.random()); // set the image popup
					var myUser = systemSettings[0].companyName + "<br>";
					$("#imagePopupName").html(myUser);
					$("#imagePopupFooterArea").html(myUser);

				}
				
				// showImage can also be called from grow.js for grow notesl
								        
				
				
			});
		    
		    $("#addUserNoteModal").on("hidden.bs.modal", function () {
			    //alert("patientNoteTextarea");
				$('#userNoteTextarea').val("");

			});
			
			$('#addUserNoteModal').on('shown.bs.modal', function () {
				$('#userNoteTextarea').focus();
			});
			
			$("#userAdduser").on('click',function(){
				//alert("userAdduser");
				$("#myUserModalLabel").html("Add User");
				//resetRegistrationForm(); // from the user.js file - this clears the form in case there is dta there already
			});
			
			$("#user_submit input").click(function(event){
			// alert('No errors: Form will be submitted'); 
			if($("#addEditUserButton").prop("value") == "Add User")
				addUser();
			else
				// alert(currentUser[0].ID);
			 	addUser(currentUser[0].ID); //currentGrow[0].ID
	}); // end $("#grow_submit input")

		    
}); // end $(document).ready
		
/* all about add Patient end *****************************************/