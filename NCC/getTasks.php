<?php
require("config.php"); 

	if(isset($_GET['myID'])) {
		$myID = $_GET['myID'];
		$whereClause = " where clientID = '$myID' ";

      $query = "select * from tasks" . $whereClause . " order by id";
      
      $tasksResult = mysql_query($query);
      
      if($tasksResult) {
	      $output = "";
	      while ($taskRow = mysql_fetch_assoc($tasksResult)) {
			$output = $output . $taskRow['task'] . ".";	  	
		  } // end while
	 	  
	 	  echo $output;	      
      } else {
	      echo mysql_error();
      } // end if

	}

?>