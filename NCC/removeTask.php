<?php
require("config.php"); 


if(isset($_GET['myID']) && isset($_GET['task'])){
	$myID = addslashes($_GET['myID']);
	$task = addslashes($_GET['task']);

	
	  $whereClause = " where task = '$task' and clientID = $myID";

      $query = "delete from tasks" . $whereClause;
      
      $tasksResult = mysql_query($query);
      
      if($tasksResult) {
	 	  echo true;	      
      } else {
	      echo mysql_error();
      } // end if

	}

?>