<?php
	
require('config.php');
		
	if(!empty($_GET)) {	
	
		if(empty($_GET['uname'])) die("No user name provided."); 
		if(empty($_GET['taskID'])) die("No task ID."); 
		if(empty($_GET['note'])) die("no note."); 
		
		$uname = $_GET['uname'];
		$taskID = $_GET['taskID'];
		$note = mysqli_real_escape_string($connection, $_GET['note']);
		
				
		$sql = "insert into taskNotes (
					taskID, 
					userID, 
					note, 
					dayte,
					operatorUserName ) 
				values (
						$taskID, 
						(select ID from user where username = '$uname'), 
						'$note', 
						now(),
						'$uname'
						)";
					
		
		
		$result = $connection->query($sql);
		
		if($result === true) {
			echo true;
		} else {
			echo " Data Entry Error: " . $sql . "<br>" . $connection->error;
		}
	
	} else {

		exit("not enough data in GET array");
	}
?>