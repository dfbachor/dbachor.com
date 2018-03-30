var currentTask = null;
var	taskDataTable = null;

function showTasks(tasks) {
	taskDataTable = $('#tasksTable').dataTable(); // assign to the global variable to use to add batches

	taskDataTable.fnClearTable();
		
	for(var i = 0; i < tasks.length; i++) {
		// add the row to the data table
		var newRow = taskDataTable.fnAddData([tasks[i].task, tasks[i].firstName + " " + tasks[i].lastName + " (" + tasks[i].userName + ")", tasks[i].openDate, tasks[i].status ]);
		var row = taskDataTable.fnGetNodes(newRow); // get the row added
		$(row).attr('id', tasks[i].ID); // add the id from the database as the id of the tr
		
	} // end for
	
	$("#tasksTitle").html("Tasks (" + tasks.length + ")")	
	
	// this neds to be after the dataTable command
	// this captures the clict event when a row is clicked
	$('#tasksTable tbody').on('click', 'tr', function () {
        getSingleTaskData( this.id ); // the id is set with the tr from the database id
        
    } );

	if($("#tasksTable_filter label").text() == "Search:") {
		$("#tasksTable_filter label").prepend("<a href='javascript:clearTaskDataTableFilter()'>Clear </a>");
	}
	
	$(window).trigger('resize');
}

function clearTaskDataTableFilter() {
	// growDataTable.fnFilterClear();
	$("#tasksTable_filter input").val("");
	// $("#growTable_filter input").focus().trigger({ type : 'keypress', which : 13});
	//	$("#growTable_filter input").trigger(jQuery.Event('keypress', {which : 13}));
	
	taskDataTable.fnFilter("");
}

function editTask() {
	// to edit the patient - we reuse the add patient model
	// just need to make sure we reset any labels etc. to manage between
	// add and edit
	$("#addTaskModalLabel").html("Edit Task"); // change the label on the modal for edit from add
	$("#addEditTaskButton").prop("value", "Edit Task");
	
	$("#task_name").val(currentTask[0].taskName).removeClass("invalid").addClass("valid");
	// $("#patient_firstName").removeClass("invalid").addClass("valid");

	// set the value and the class to valid for validation
	$("#task_task").val(currentTask[0].task);
	$("#task_userCombo").val(currentTask[0].assignedUserID);
	$("#task_openDate").val(currentTask[0].openDate);
	$("#task_closeDate").val(currentTask[0].closeDate);
	$("#task_status").val(currentTask[0].status);
	
	$("#tasksModal").modal('show');
}


function getSingleTaskData(taskID) {
	if(taskID != 0) {
		getSingleTaskDetail(taskID);
		$("#taskNotesTableBody").html("");
		getTaskNotes(taskID);
	} else {
		$("#taskNotesTableBody").html("");
		$("#taskTempsTableBody").html("");
		$("#taskDetail").html("");
		$("#editTaskLink").html("");
		$("#deleteTaskLink").html("");
		$("#taskDetailTitle").html("");
		$("#taskNotesTitle").html("Task Notes (0)");
	}
}

function getSingleTaskDetail(taskID) {
	
	var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getTasks.php " + resp);
						
						if(resp != 0){
							resp = $.parseJSON(resp);
							showTaskDetail(resp.tasks);
						
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","getTasks.php?ID=" + taskID, true);	
				
				xmlhttp.send();
}

function showTaskDetail(tasks) {
	// batches is an array of 1 record for the indivudual batch
		currentTask = tasks;
		

		var myTask = "Task ID - Name: ";
		
		myTask += tasks[0].ID + " - " + tasks[0].taskName;
		$("#tasksDetailTitle").html(myTask);

		var myTable	= "<table class='table table-bordered table-condensed' >";
			//myTable	+= "<tr>";
				myTable	+= "<col class='col-sm-6'>";
				myTable	+= "<col class='col-sm-6'>";
			//myTable	+= "</tr>";
/*
			myTable	+= "<tr>";
				myTable	+= "<th>ID</th>";
				myTable	+= "<td>" + tasks[0].ID + "</td>";
			myTable	+= "</tr>";
*/
			myTable	+= "<tr>";
				myTable	+= "<th>Task Name</th>";
				myTable	+= "<td>" + tasks[0].task + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>User (username)</th>";
				myTable	+= "<td>" + tasks[0].firstName + " " + tasks[0].lastName + " (" + tasks[0].userName + ")" + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Open Date</th>";
				myTable	+= "<td>" + tasks[0].openDate + "</td>";
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Close Date</th>";
// 				myTable	+= "<td>" + tasks[0].closeDate + "</td>";
				
				
				if(!tasks[0].closeDate) {
					myTable += "<td><a href='javascript:updateTaskCloseDate(" + tasks[0].ID + ")'>Update with todays date</a></td>";	
				} else {
					myTable	+= "<td>" + tasks[0].closeDate + "<a href='javascript:removeTaskCloseDate(" + tasks[0].ID + ")'> remove date</a></td>";
				}
				
			myTable	+= "</tr>";
			myTable	+= "<tr>";
				myTable	+= "<th>Status</th>";
				myTable	+= "<td>" + tasks[0].status + "</td>";
			myTable	+= "</tr>";
		myTable	+= "</table>";  
	
	$("#taskDetail").html(myTable);
	$("#editTaskLink").html("<a href='javascript:editTask()'>edit</a>");
	$("#deleteTaskLink").html("<a href='javascript:deleteTask(" + tasks[0].ID + ")'>delete</a>");
}

function updateTaskCloseDate(tID) {
	if(confirm("Are you sure you want to close this Task?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getTasks();
							getSingleTaskData(tID);
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","updateTaskCloseDate.php?tID=" + tID +
									"&operatorUserName=" + getCookie("user"), true);	
				
				xmlhttp.send();
	}
}


function removeTaskCloseDate(tID) {
	
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getTasks();
							getSingleTaskData(tID);
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","removeTaskCloseDate.php?tID=" + tID +
									"&operatorUserName=" + getCookie("user"), true);	
				
				xmlhttp.send();

}

function deleteTask(sID) {
	if(confirm("Are you sure you want to delete this Task?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getTasks();
							getSingleTaskData(0);
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","deleteTask.php?sID=" + sID, true);	
				
				xmlhttp.send();
	}

}





function showTaskNotes(taskNotes) {
	
	
	$("#taskNotesTableBody").html("");
	//alert(patientNotes.length);
	var noteRows = "";

		for(var i = 0; i < taskNotes.length; i++) {
			noteRows += "<tr>";
			noteRows += "<td width='200'>";
			noteRows += "<textarea readonly id='' rows='2' cols='25' maxlength='1056'>" + "[" + taskNotes[i].username + "]  " +	taskNotes[i].note + "</textarea>"
			noteRows += "</td>"
			noteRows += "<td width='200'>" + taskNotes[i].dayte + "</td>";
			noteRows += "<td><a href='javascript:removeTaskNote(" + taskNotes[i].ID + ")'>remove</a></td>";
			noteRows += "<tr>";
		}
		
		$("#taskNotesTitle").html("Task Notes (" + taskNotes.length + ")");
		$("#taskNotesTableBody").append(noteRows);
	
}

function removeTaskNote(taskNoteID) {
	if(confirm("Are you sure you want to delete this note?")) {
		
		var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatients php " + resp);
						
						if(resp == 1){
							getTaskNotes(currentTask[0].ID);
						
						} else {
							alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","removeTaskNote.php?taskNoteID=" + taskNoteID, true);	
				
				xmlhttp.send();
	}
}


function getTaskNotes(taskID) {
	var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var resp = xmlhttp.responseText; // return values go here
						
						//alert("respone from getPatientNotes php " + resp);
						
						if(resp != 0){
							resp = $.parseJSON(resp);
							showTaskNotes(resp.taskNotes);
						
						} else {// no results
							$("#taskNotesTitle").html("Task Notes (0)");
							$("#taskNotesTableBody").html("");

							// alert(resp);
						}
					} //end if
				} // end  function
	
				xmlhttp.open("GET","getTaskNotes.php?taskID=" + taskID, true);	
				
				xmlhttp.send();
}


function saveTaskNote() {
	
	var note = $("#taskNoteTextarea").val();
	//alert($("#patientNoteTextarea").val());
			
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var resp = xmlhttp.responseText; // return values go here
				
				// alert("respone from savePatientNote php " + resp);
				
				if(resp == 1){
					$('#taskNoteTextarea').val("");
					$('#addTaskNoteModal').modal('hide');
					getTaskNotes(currentTask[0].ID);

				} else {
					alert(resp);
				}
			} //end if
		} // end  function

		xmlhttp.open("GET","saveTaskNote.php?taskID=" + currentTask[0].ID +
												"&note=" + note +
												"&uname=" + getCookie("user"), 
												true);	
		xmlhttp.send();
}


function getTasks() {
	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from getTasks.php " + resp);
					
					if(parseInt(resp) != 0){
						resp = $.parseJSON(resp);
						// batchesArray = resp.batches; // global - not sure yet if needed
						showTasks(resp.tasks);
											
					} else {
						if(resp != "0 results")
							alert(resp);
					}
				} //end if
			} // end  function

			xmlhttp.open("GET","getTasks.php?ID=all&showClosedTasks=" + systemSettings[0].showClosedTasks, true);	
			
			xmlhttp.send();
}






function closeTaskModal() {
	resetAddTaskForm();
}

function resetAddTaskForm() {
	
	$("#task_name").val(".");
	$("#task_testingStatus").val(".");
	$("#task_thcLevel").val(".");
	$("#task_cbdLevel").val("");
	$("#task_indicaPercent").val(".");
	$("#task_sativaPercent").val(".");
	$("#task_genetics").val(".");

	$('#addTaskForm')[0].reset();
	
	$("#addEditTaskButton").prop("value", "Add Task");
	$("#addTaskModalLabel").html("Add Task");

	// remove validation classes
	$('#task_name').removeClass("valid").removeClass("invalid");
	$('#task_testingStatus').removeClass("valid").removeClass("invalid");
	$('#task_thcLevel').removeClass("valid").removeClass("invalid");
	$('#task_cbdLevel').removeClass("valid").removeClass("invalid");
	$('#task_indicaPercent').removeClass("valid").removeClass("invalid");
	$('#task_sativaPercent').removeClass("valid").removeClass("invalid");
	$('#task_genetics').removeClass("valid").removeClass("invalid");

	$('#tasksModal').modal('hide');
}


function addTask(tID) {
		
	var task = $("#task_task").val();
	var assignedUserID = $("#task_userCombo").val();
	var openDate = $("#task_openDate").val();
	var closeDate = $("#task_closeDate").val();
	var status = $("#task_status").val();
	var systemID = systemSettings[0].ID;

	var formData = new FormData();
	
	formData.append('task', task);
	formData.append('assignedUserID', assignedUserID);
	formData.append('openDate', openDate);
	formData.append('closeDate', closeDate);
	formData.append('status', status);
	formData.append('systemID', systemID);
	formData.append('tID', ((tID == null || tID == 'undefined') ? 'undefined' : tID) );
	formData.append('operatorUserName', getCookie("user"));

	var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resp = xmlhttp.responseText; // return values go here
					
					//alert("respone from addTask.php " + resp);
					
					// alert(parseInt(resp));  // this will hav the ID for the batch inserted
					
					if(parseInt(resp) > 0){

						resetAddTaskForm();
						getTasks();
						
						if(tID) 
							getSingleTaskData(tID);
							
					} else {
						alert(resp);
					}
				} //end if
			} // end  function

	xmlhttp.open("POST","addTask.php", true);									
	xmlhttp.send(formData);
}

function populateTaskUsersComboForTaskModal(users) {
	var userSelect = document.getElementById("task_userCombo");
	userSelect.innerHTML = "";
	
	var opt = document.createElement('option');
	opt.innerHTML = "Select User";
	opt.value = 0;
	userSelect.appendChild(opt);
	
	for(var i = 0; i < users.length; i++) {
		var opt = document.createElement('option');
		opt.innerHTML = users[i].firstName + " " + users[i].lastName + " (" + users[i].userName + ")";
		opt.value = users[i].ID;
		userSelect.appendChild(opt);
	}
	
}


function loadUsersToComboForTaskModal() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var resp = xmlhttp.responseText; // return values go here
				
				//alert("respone from loadUsersToComboForTaskModal php " + resp);
				
				if(parseInt(resp) != 0){
					resp = $.parseJSON(resp);
					populateTaskUsersComboForTaskModal(resp.usersForCombo);
										
				} else {
					if(resp != "0 results")
					alert(resp);
				}
			} //end if
		} // end  function

		xmlhttp.open("GET","getUsersForCombo.php", true);	
		
		xmlhttp.send();

}

$(document).ready(function() {
	//alert("doc.ready");
	
	// this event is triggered when the batches menu items is clicked
	$(".nav-tabs a[href='#tasksMenu']").on('shown.bs.tab', function(){
         getTasks();
        //alert("hrtre");
        loadUsersToComboForTaskModal();
        //loadStagesToComboForBatchModal();
        //loadTasksToComboForBatchModal(); // need top load this on startup - since there are sequence issues 
    });
    
    $("#tasksModal").on("shown.bs.modal", function () {
		if($("#addEditTaskButton").prop("value") == "Add Task") {
			$("#task_userCombo").val(getCookie('userID'));
			
			var dayte = new Date();
 
			// GET YYYY, MM AND DD FROM THE DATE OBJECT
			var yyyy = dayte.getFullYear().toString();
			var mm = (dayte.getMonth()+1).toString();
			var dd  = dayte.getDate().toString();
			 
			// CONVERT mm AND dd INTO chars
			var mmChars = mm.split('');
			var ddChars = dd.split('');
			 
			// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
			var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);	
			
			$("#task_openDate").val(datestring);
			$("#task_status").val("Open");
			$("#task_task").focus();
			
		}
	});

    
	$("#addTaskNoteModal").on("hidden.bs.modal", function () {
		$('#batchTaskTextarea').val("");
	});
	
	$('#addTaskNoteModal').on('shown.bs.modal', function () {
		$('#taskNoteTextarea').focus();
	});
	
	$('#task_openDate').datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		yearRange: "1900:2016"
	})

	$('#task_closeDate').datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		yearRange: "1900:2016"
	})

	
    
	$("#taskSubmit input").click(function(event){
			 if($("#addEditTaskButton").prop("value") == "Add Task")
			 	addTask();
			 else
			 	addTask(currentTask[0].ID); //currentBatch[0].ID
	}); // end $("#batch_submit input")
	
	
}); // end $(document)

