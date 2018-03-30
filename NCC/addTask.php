<?php
require("config.php"); 

if(isset($_GET['myID']) && isset($_GET['task'])){
	$myID = addslashes($_GET['myID']);
	$task = addslashes($_GET['task']);
	//date_default_timezone_set("America/New_York");
	//$datetime = date('Y-m-d H:i:s');

	
	$query = "insert into tasks (clientID, task) values ('$myID', '$task')"; 
												
	$result = mysql_query( $query);

    if($result)
    {
	 	echo true;	      
    } else {
	    echo mysql_error();
    } // end if
            
    
}