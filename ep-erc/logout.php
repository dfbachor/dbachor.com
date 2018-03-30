<?php
require('config.php');
	
//print_r($_GET);	

	$uname = $_GET['uname'];
		
	$sql = "UPDATE 
				user 
			SET 
				loggedOn = 0 
			WHERE 
				username = '$uname'";
	
	if ($connection->query($sql) === TRUE) {
	    echo true;
	
	} else {
	    echo "ERROR=Error updating record: $sql :" . $connection->error;
	}





?>