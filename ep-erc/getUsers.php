<?php
	require('config.php');
	
	if($_GET['ID']){
		
		$id = $_GET['ID'];

		if($id == "all") {
			$sql = "select * from user";
		} else {
			$sql = "select * from user where ID = $id";
		}
		
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $userData = array();
		    while($row = $result->fetch_assoc()) {
		        $userData[] = $row;
		    }
		    echo '{"users":' . json_encode($userData) . '}';
		} else {
		    echo "0 results";
		}
	
		$connection->close();
	} else {
		echo "No parameters for get users request!";
	}
?>