 <?php
	require('config.php');
	
	
	if($_GET['taskID']){
		
		$taskID = $_GET['taskID'];
				
		
		$sql = "select 
					tn.*,
					u.username 
				from 
					taskNotes tn 
					LEFT JOIN user u ON u.ID = tn.userID 
				where 
					tn.taskID = $taskID 
				order by 
					tn.dayte DESC";
		
		

		// $sql = "select * from taskNotes where taskID = $taskID order by dayte DESC";
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $notesData = array();
		    while($row = $result->fetch_assoc()) {
		        $notesData[] = $row;
		    }
		    echo '{"taskNotes":' . json_encode($notesData) . '}';
		} else {
		    echo 0;
		}
	
		$connection->close();
	} else {
		echo "No parameters for get task notes request!";
	}
?>