<?php
	require('config.php');
	
	if($_GET['ID']){
		
		$id = $_GET['ID'];
		$showCompleteContracts = $_GET['showCompleteContracts'];
				
		if($id == "all") {				
			if($showCompleteContracts == 1) {
				$sql = "select * from contracts order by creationDate Desc";
			} else {
				$sql = "select * from contracts where closeDate is null order by creationDate Desc";
			}
		} else {
				$sql = "select * from contracts where ID = $id order by creationDate Desc";
		}
		
		// if($id != "all") {echo $sql; exit();}
		//echo $sql; exit();
		
		$result = $connection->query($sql);
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    $contractData = array();
		    while($row = $result->fetch_assoc()) {
		        $contractData[] = $row;
		    }
		    echo '{"contracts":' . json_encode($contractData) . '}';
		} else {
		    echo "0 results";
		}
	
		$connection->close();
	} else {
		echo "0 No parameters for get contracts request!";
	}
?>