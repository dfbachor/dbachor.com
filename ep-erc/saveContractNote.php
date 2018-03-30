<?php
	
require('config.php');
		
	if(!empty($_GET)) {	
	
		// if(empty($_GET['uname'])) die("No user name provided."); 
		if(empty($_GET['contractID'])) die("No contract ID."); 
		if(empty($_GET['note'])) die("no note."); 
		
		// $uname = $_GET['uname'];
		$contractID = $_GET['contractID'];
		// $systemID = $_GET['systemID'];
		$note = mysqli_real_escape_string($connection, $_GET['note']);
		
		
				
		$sql = "insert into contractNotes (
					contractID, 
					note, 
					dayte
					) values (
					$contractID, 
					'$note', 
					now()
					)";
					
		
		
		$result = $connection->query($sql);
		
		if($result === true) {
			echo true;
		} else {
			echo " Data Entry Error: " . $sql . "<br>" . $connection->error;
		}
	
	} else {

		exit("not enough data in GET array for update contract notes");
	}
?>