 <?php
	require('config.php');
	
	
	if($_GET['userID']){
		
		$userID = $_GET['userID'];

		$sql = "select * from userNotes where userID = $userID order by dayte DESC";
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $notesData = array();
		    while($row = $result->fetch_assoc()) {
		        $notesData[] = $row;
		    }
		    echo '{"userNotes":' . json_encode($notesData) . '}';
		} else {
		    echo 0;
		}
	
		$connection->close();
	} else {
		echo "No parameters for get user notes request!";
	}
?>