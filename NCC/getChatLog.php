<?php
require("config.php"); 

	if(isset($_GET['startDateTime'])) {
		$startDateTime = $_GET['startDateTime'];
		$whereClause = " where dayte >= '$startDateTime' ";
	}
      
      $query = "select * from chatlog" . $whereClause . " order by id";
      
      $chatLogResult = mysql_query($query);
      
      if($chatLogResult) {
	      $output = "";
	      while ($chatRow = mysql_fetch_assoc($chatLogResult)) {
			$output = $output . "(" . $chatRow['dayte'] . ") " . $chatRow['user'] . ": " . $chatRow['message'] . "<BR>";	  	
		  	
		  } // end while
	 	  
	 	  echo $output;	      
      } else {
	      echo mysql_error();
      } // end if
            
  
?>
