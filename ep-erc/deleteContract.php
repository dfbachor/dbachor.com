<?php
	require('config.php');
	
	
	if($_GET['cID']){
		
		$cID = $_GET['cID'];

		$sql = "delete from contracts where ID = $cID";
		
		$result = $connection->query($sql);
	
		if ($connection->query($sql) === TRUE) {
			echo true; 	 	} else {
		    echo "0 Error deleting contract record: " . $connection->error;
		}

	
		$connection->close();
	} else {
		echo "0 No parameters for remove contract request!";
	}
?>