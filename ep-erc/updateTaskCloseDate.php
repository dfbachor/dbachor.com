<?php	
	require('config.php');
			
	if(!empty($_GET)) {	
	
		if(empty($_GET['tID'])) die("No batch ID."); 
		if(empty($_GET['operatorUserName'])) die("No user name."); 
		
		$tID = $_GET['tID'];
		$operatorUserName = $_GET['operatorUserName'];
					
		date_default_timezone_set('America/New_York');
			$dayte = date('Y-m-d');			
			
		$sql = "update tasks set closeDate = '$dayte', 
								operatorUserName = '$operatorUserName',
								status = 'Closed'
						where ID = $tID";

				//echo $sql; exit();		
			
		if ($connection->query($sql) === TRUE) {
			echo true;		    
		} else {
		    echo "Error updating task close date: " . $connection->error;
		}
	} else {
		exit("0 not enough data in GET array");
	}
	// enter into the database
	// if the email address exists then return error message starting such
	// if there is an error with the datanase or script - return the db error
	// otherwise insert the data and return true

?>