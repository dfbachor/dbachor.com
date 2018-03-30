<?php
	require('config.php');
	
	
	if($_GET['taskNoteID']){
		
		$taskNoteID = $_GET['taskNoteID'];

		$sql = "delete from taskNotes where ID = $taskNoteID";
		
		$result = $connection->query($sql);
	
		if ($connection->query($sql) === TRUE) {
		    echo true;
		} else {
		    echo "Error deleting record: " . $connection->error;
		}
	
		$connection->close();
	} else {
		echo "No parameters for remove task note request!";
	}
?>