<?php
	require('config.php');
	
	if($_GET['ID']){
		
		$id = $_GET['ID'];
		
		// selecting all images at first
		$sql = "select * from system where ID = $id";
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $systemData = array();
		    while($row = $result->fetch_assoc()) {
		        $systemData[] = $row;
		    }

			    $sql = "update system set hits = hits + 1 where ID = $id"; 
				
				if ($connection->query($sql) === TRUE) {		    
				} else {
			    	logmsg("Error updating system.hits: " . $id . " from IP: " . $_SERVER['REMOTE_ADDR']);
				}

		    echo '{"system":' . json_encode($systemData) . '}';
		    logmsg("system request for systemID: " . $id . " from IP: " . $_SERVER['REMOTE_ADDR']);		    
		    
		} else {
		    echo "0 results";
		}
	
		$connection->close();
	} else {
		echo "No parameters for get system request!";
	}
?>