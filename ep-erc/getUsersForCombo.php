<?php
	require('config.php');
	
	// $systemID = $_GET['systemID'];
		
		// selecting all images at first
		// $sql = "select * from strains $where";
		$sql = "select ID, userName, firstName, lastName from user";
		//echo $sql; exit();

		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $usersForCombo = array();
		    while($row = $result->fetch_assoc()) {
		        $usersForCombo[] = $row;
		    }
		    echo '{"usersForCombo":' . json_encode($usersForCombo) . '}';
		} else {
		    echo "0 results";
		}
	
		$connection->close();
?>