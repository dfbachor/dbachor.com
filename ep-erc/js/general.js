// GLOBAL --------------
var systemSettings = null;
var currentLoggedOnUser = null;

// END GLOBAL

window.onload = init;
function init() {
	//alert(document.cookie);
 
	if(getCookie("user") && getCookie("password") && getCookie("systemID")) {
		// at this point we should have a returning user
		// so log on with this uname and pword
		// also do not show register link or upload link
		checkLogin(0); // zero tells the function this is a returning user
		
		getSystem(getCookie("systemID"));
		showMenuBasedOnLogin(true); 
		
	} else {
 		getSystem(1);
		showMenuBasedOnLogin(false);
	}

	$("#systemSubmit input").click(function(event){
		updateSystem();
	});
	
	$("#tabHome").click();
	
/*
	$("#showImage").on('hidden.bs.modal', function () {
		$('#imagePopupName').html("");
		$("#imagePopupImage").attr('src', ""); // set the image popup
	});
*/	
	
	//

/*
	// set up so we get stats each time user goes to home menu
	$(".nav-tabs a[href='#MainMenu']").on('shown.bs.tab', function(){
		//alert("growsMainMenu");
		getStats(systemSettings[0].ID);
    });	
*/
    
}


function setSystemVariables() {
	//systemSettings = sys; // setting the global variable system
	$("#mainCompanyName").html(/* systemSettings[0].ID + " " +  */systemSettings[0].companyName);
	$("#growMenuHomeCompanyName").html(/* systemSettings[0].ID + " " +  */systemSettings[0].companyName);
	//$("#copywriteCompanyName").html(systemSettings[0].companyName);
	$("#system_ID").val(systemSettings[0].ID);
	$("#system_companyName").val(systemSettings[0].companyName);
	$("#system_companyPhone").val(systemSettings[0].companyPhone);

	$("#system_showClosedTasks").prop('checked', (systemSettings[0].showClosedTasks == 1) ? true : false );
	$("#system_showClosedContracts").prop('checked', (systemSettings[0].showClosedContracts == 1) ? true : false );
	$("#contractsToggleShowClosedContracts").prop('checked', (systemSettings[0].showClosedContracts == 1) ? true : false );
	
	$("#settingsCompanyLogo").attr("src", systemSettings[0].logoImage + "?ghost=" + Math.random());
	$(".companyLogo").attr("src", systemSettings[0].logoImage + "?ghost=" + Math.random());
	$(".companyName").val(systemSettings[0].companyName);
	//showMenuBasedOnRoles();
}

function updateSystem() {
	$('body').addClass('wait');
    $('body').addClass('loading');


	var cID = systemSettings[0].ID;
	//alert(cID);
	var cName = $("#system_companyName").val();
	var cPhone = $("#system_companyPhone").val();
	var cShowCompleteGrows = $("#system_showCompleteGrows").is(':checked');
	var cShowClosedTasks = $("#system_showClosedTasks").is(':checked');
	var cShowClosedContracts = $("#system_showClosedContracts").is(':checked');
	var imageFile = document.getElementById("settings_logoFile").files[0];
		
	var formData = new FormData();

	if(imageFile)
		formData.append('settings_logoFile', imageFile, imageFile.name);
			
	formData.append('cID', cID);
	formData.append('cName', cName);
	formData.append('cPhone', cPhone);
	formData.append('cShowCompleteGrows', cShowCompleteGrows);
	formData.append('cShowClosedTasks', cShowClosedTasks);
	formData.append('cShowClosedContracts', cShowClosedContracts);
	formData.append('operatorUserName', getCookie("user"));
	
	
	// alert(cGrowTracker);

	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from updateSystem.php " + resp);
					
					if(resp == 1){
						//alert("Settings Updated Sucesfully!")
						getSystem(cID);	
					} else {
						alert(resp);
					}
					
					setTimeout(function() { // cause the wait sign to display for at least .5 seconds
								$('body').removeClass('wait');
							    $('body').removeClass('loading');
								}, 
								500);
				} //end if
			} // end  function

	xmlhttp.open("POST","updateSystem.php", false);		
	xmlhttp.send(formData);		
}




function getSystem(id) {
	//alert(id);
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from getSystem.php " + resp);
					
					if(resp != 0){ // admin
						resp = $.parseJSON(resp);
						systemSettings = resp.system; // setting the global variable system
						setSystemVariables();
						// alert(systemSettings[0].ID);
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","getSystem.php?ID=" + id, false); // set to false to enfource data returned from the database	
			xmlhttp.send();
}



function showMenuBasedOnLogin (login) {
	// pass in true if the user has logged in
	// otherwise pass in false
	//alert(document.cookie);
	if(login == true) {

		$("#userName").text('Welcome '+ getCookie("user"));
		
		$(".loggedOn").show();
		$(".notLoggedOn").hide();
		
		if(currentLoggedOnUser[0].role == 'a') {
			$(".admin").show();
		} else {
			$(".admin").hide();
		}
				
		//showMenuBasedOnRoles();
	} else { 
		$("#userName").text(" ");
		
		$(".loggedOn").hide();
		$(".notLoggedOn").show();
		$('.nav-tabs a[href="#mainMenu"]').tab('show'); // displays the home tab
		$(".admin").hide();
	}
}



/*
function showStats(stats) {
	
	// console.log(stats);
	
	$("#homeTotalGrows").html(stats[0].totalGrows);
	$("#homeTotalActiveGrows").html(stats[0].totalActiveGrows);
	$("#homeTotalCompleteGrows").html(stats[0].totalInactiveGrows);
	
	$("#homeTotalBatches").html(stats[0].totalBatches);
	$("#homeTotalActiveBatches").html(stats[0].totalActiveBatches);
	$("#homeTotalCompleteBatches").html(stats[0].totalInactiveBatches);

	$("#homeTotalUsers").html(stats[0].totalUsers);
	$("#homeTotalUserRole").html(stats[0].totalUserUsers);
	$("#homeTotalAdminRole").html(stats[0].totalAdminUsers);
	
	$("#homeTotalRooms").html(stats[0].totalRooms);
	$("#homeTotalStrains").html(stats[0].totalStrains);
	
	setCookie('totalRooms', stats[0].totalRooms);
	setCookie('totalStrains', stats[0].totalStrains);
	setCookie('totalActiveGrows', stats[0].totalActiveGrows);
	setCookie('totalActiveBatches', stats[0].totalActiveBatches);
}
*/

function showMenu(menu) {
	$('.nav-tabs a[href="' + menu + '"]').tab('show');
}


/*
function getStats(id) {
	//alert(id);
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from getStats.php " + resp);
					
					if(parseInt(resp) != 0){ // admin
						resp = $.parseJSON(resp);
						showStats(resp.stats);
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","getStats.php?ID=" + id, false); // set to false to enfource data returned from the database	
			xmlhttp.send();
}
*/



function checkLogin(loggingIn) { // if logging in is 1 then this is a new loging - otherwise should be form acookies
	
	var uname;
	var pword;
	
	if(loggingIn == 1) { // logging in from the user prompt
		 uname = $("#loginUname").val();
		 pword = $("#loginPword").val();
	} else { // auto login from cookie
		uname = getCookie("user");
		pword = getCookie("password");
		
	}
	
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					 //alert("respone from login php " + resp);
					
					if(parseInt(resp) != 0){
						resp = $.parseJSON(resp);
						//alert(resp.user[0].username);
						currentLoggedOnUser = resp.user;
											
						setCookie("userID", currentLoggedOnUser[0].ID);
						setCookie("user", currentLoggedOnUser[0].username);
						setCookie("password", currentLoggedOnUser[0].password);
						setCookie("role", currentLoggedOnUser[0].role);
						setCookie("systemID", 1);
						//alert("current system id! " + currentLoggedOnUser[0].systemID);	
						//getSystem(currentLoggedOnUser[0].systemID);
						showMenuBasedOnLogin(true);
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","login.php?uname=" + uname + 
										"&pword=" + pword, false);	// wait for a response
			xmlhttp.send();
}

function getCookie(cName) {
	if(document.cookie){
		var cookie = document.cookie.split("; ");
		for(var i = 0; i < cookie.length; i++) {
			if(cookie[i].split("=")[0] == cName) {
				return unescape(cookie[i].split("=")[1]);
			}
		}
	}
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    // alert(cname + " " + cvalue + " " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function logout() {
	
	var uname = $("#userName").text();
	uname = uname.split(" ")[1];
	// alert(uname);
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					// alert("respone from logout.php " + resp);
					
					if(resp == 1){
						setCookie("user", "", -1);
						setCookie("password", "", -1);
						setCookie("role", "", -1);
						setCookie("userID", "", -1);
						setCookie("systemID", "", -1);
						
					    getSystem(1);
						showMenuBasedOnLogin(false);
						location.reload();
					
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","logout.php?uname=" + uname, true);		
			xmlhttp.send();
}

function resetPW() {
	var uname = $("#loginUname").val();
	// alert(uname);
	
	// alert(uname);
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from resetPW.php " + resp);
					
					if(resp == 1){
						alert("An email with your password has been send to the email address we have on file for the user name provided, please allow a few minutes for the email to arrive.")
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","resetPW.php?uname=" + uname, true);		
			xmlhttp.send();
}


