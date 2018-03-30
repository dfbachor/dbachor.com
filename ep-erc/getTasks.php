<?php
	require('config.php');
	
	if($_GET['ID']){
		
		$id = $_GET['ID'];
		// $systemID = $_GET['systemID'];
		$showClosedTasks = $_GET['showClosedTasks'];

		if($id == "all") {
			if($showClosedTasks == 1) {
				$showClosedTasks = "";
			} else {
				$showClosedTasks = " and t.closeDate is null ";
			}
				
			
			$where = " where u.ID = t.assignedUserID $showClosedTasks";
		} else {
			$where = " where u.ID = t.assignedUserID and t.ID = $id $showClosedTasks";
		}
		
		$sql = "select t.*, u.userName, u.firstName, u.lastName from tasks t, user u $where";

		// if($id != "all") {echo $sql; exit();}
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $taskData = array();
		    while($row = $result->fetch_assoc()) {
		        $taskData[] = $row;
		    }
		    echo '{"tasks":' . json_encode($taskData) . '}';
		} else {
		    echo "0 results";
		}
	
		$connection->close();
	} else {
		echo "0 No parameters for get tasks request!";
	}
?>