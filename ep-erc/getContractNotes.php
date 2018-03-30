 <?php
	require('config.php');
	
	if($_GET['contractID']){
		
		$contractID = $_GET['contractID'];

		$sql = "select * from contractNotes where contractID = $contractID order by dayte DESC";
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $notesData = array();
		    while($row = $result->fetch_assoc()) {
		        $notesData[] = $row;
		    }
		    echo '{"contractNotes":' . json_encode($notesData) . '}';
		} else {
		    echo 0;
		}
	
		$connection->close();
	} else {
		echo "No parameters for get contract notes request!";
	}
?>