<?php
require("config.php"); 
//print_r($_GET); Exit;

	if(isset($_GET['startDateTime'])) {
		$startDateTime = $_GET['startDateTime'];
		$whereClause = " where dayte >= '$startDateTime' ";
	}
      
      // $query = "select * from chatlog" . $whereClause . " order by id";
      
      // $chatLogResult = mysql_query($query);
      
      // if($chatLogResult) {
	// 	  $chatData = array();
	//       while ($chatRow = mysql_fetch_assoc($chatLogResult)) {
	// 	        $chatData[] = $chatRow;
	// 	  } // end while
	 	  
	// 	    echo '{"chats":' . json_encode($chatData) . '}';
      // } else {
	//       echo mysql_error();
	// } // end if  
	


	$query = "select * from chatlog" . $whereClause . " order by id";
	// $query_params = array(':userName' => $userName);

	try { 
		$stmt = $db->prepare($query); 
		$result = $stmt->execute($query_params); 
			
			$outData = array();
			while($row = $stmt->fetch()) {
				$outData[] = $row;
			} 
			//echo json_encode($outData);
			echo '{"chats":' . json_encode($outData) . '}'; 
			exit();
	} catch(PDOException $ex){ 
			echo "0 .Failed to run query: " . $ex->getMessage();
			exit();
	} 
?>
