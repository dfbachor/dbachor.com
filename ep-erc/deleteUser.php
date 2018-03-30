<?php
	require('config.php');
	
	
	if($_GET['userID']){
		
		$userID = $_GET['userID'];

		$sql = "delete from user where ID = $userID";
		
		$result = $connection->query($sql);
	
		if ($connection->query($sql) === TRUE) {

			$sql = "delete from userNotes where userID = $userID";
			
				$result = $connection->query($sql);
			
				if ($connection->query($sql) === TRUE) {
				    echo true;
				} else {
				    echo "Error deleting user Notes record: " . $connection->error;
				}
	 	} else {
		    echo "Error deleting user record: " . $connection->error;
		}

	
		$connection->close();
	} else {
		echo "No parameters for remove user request!";
	}
?>