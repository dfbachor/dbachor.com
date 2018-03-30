<?php	
	require('config.php');
			
	if(!empty($_GET)) {	
	
		if(empty($_GET['cID'])) die("No Contract ID."); 
		if(empty($_GET['action'])) die("No action for update complete date."); 
		//if(empty($_GET['operatorUserName'])) die("No user name."); 
		
		$cID = $_GET['cID'];
		$action = $_GET['action'];
		// $operatorUserName = $_GET['operatorUserName'];
		
		if($action == 'update') {
			$sql = "update contracts set closeDate = now() where ID = $cID";
		} else {
			$sql = "update contracts set closeDate = null where ID = $cID";
		}
										

				//echo $sql; exit();		
			
		if ($connection->query($sql) === TRUE) {
		    echo true; // "Record updated successfully";
		    
		} else {
		    echo "Error updating record: " . $connection->error;
		}
	} else {
		exit("0 not enough data in GET array");
	}

?>