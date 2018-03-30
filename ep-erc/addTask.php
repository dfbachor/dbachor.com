<?php	
	require('config.php');
	
	
	//print_r($_POST); exit();
		
	if(!empty($_POST)) {	
	
		if(empty($_POST['task'])) die("Please enter the task."); 
		if(empty($_POST['assignedUserID'])) die("Please select the Assigned To User."); 
		if(empty($_POST['openDate'])) die("Please enter the open Date."); 
		if(empty($_POST['status'])) die("Please select the status."); 
		
		$task = mysqli_real_escape_string($connection, $_POST['task']);
		$assignedUserID = mysqli_real_escape_string($connection, $_POST['assignedUserID']);
		$status = mysqli_real_escape_string($connection, $_POST['status']);
		// $systemID = $_POST['systemID'];
		$operatorUserName = $_POST['operatorUserName'];
		$tID = $_POST['tID'];
		
		
		date_default_timezone_set('America/New_York');
		
		if(!empty($_POST['openDate'])) {
			$gDate = DateTime::createFromFormat('Y-m-d', $_POST['openDate']);
			$openDate = "'" . $gDate->format('Y-m-d') . "'";
		} else {
			$openDate = "null";
		}
			
		if(!empty($_POST['closeDate'])) {
			$gDate = DateTime::createFromFormat('Y-m-d', $_POST['closeDate']);
			$closeDate = "'" . $gDate->format('Y-m-d') . "'";
		} else {
			$closeDate = "null";
		}
		
		
		// echo $openDate; exit();	
		

		if($tID == 'undefined') { // coming from javscript - no id to update-  must be a new add


			$sql = "insert into tasks (task, assignedUserID, status, openDate, operatorUserName) 
												values ( '$task', $assignedUserID, '$status', $openDate, '$operatorUserName')";
												
												//echo $sql; exit();
			
			$result = $connection->query($sql);
			
			if($result === true) {
				$lastID = $connection->insert_id;	
				echo $lastID;
				exit();					
			} else {
				echo "0 Data Entry Error on add task: " . $sql . "<br>" . $connection->error;
				exit();
			}
		} else { // id Provided
			$sql = "update tasks set 	task = '$task', 
										assignedUserID = $assignedUserID, 
										status = '$status', 
										openDate = $openDate, 
										closeDate = $closeDate,
										operatorUserName = '$operatorUserName'
							where ID = $tID";
				//echo $sql; exit();		
			
			if ($connection->query($sql) === TRUE) {
			    echo $tID; // "Record updated successfully";
			    // return the id so that the calling function can know it was an update
			    
			} else {
			    echo "0 Error updating record: " . $connection->error;
			}
		}

	} else {
		exit("0 not enough data in POST array for addRoom");
	}

?>