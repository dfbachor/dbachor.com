<?php
	require('config.php');
	
	
	if($_GET['userNoteID']){
		
		$userNoteID = $_GET['userNoteID'];

		$sql = "delete from userNotes where ID = $userNoteID";
		
		$result = $connection->query($sql);
	
		if ($connection->query($sql) === TRUE) {
		    echo true;
		} else {
		    echo "Error deleting record: " . $connection->error;
		}
	
		$connection->close();
	} else {
		echo "No parameters for remove user note request!";
	}
?>