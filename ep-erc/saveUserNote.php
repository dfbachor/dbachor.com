<?php
	
require('config.php');
		
	if(!empty($_GET)) {	
	
		if(empty($_GET['uname'])) die("No user name provided."); 
		if(empty($_GET['userID'])) die("No user ID."); 
		if(empty($_GET['note'])) die("no note."); 
		
		$uname = $_GET['uname'];
		$userID = $_GET['userID'];
		$note = mysqli_real_escape_string($connection, $_GET['note']);
				
		$sql = "insert into userNotes (
					userID, 
					editingUserID, 
					note, 
					dayte,
					operatorUserName ) 
				values (
						$userID, 
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