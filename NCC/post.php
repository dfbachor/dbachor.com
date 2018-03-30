<?php
require("config.php"); 

if(isset($_GET['user']) && isset($_GET['message'])){
	$user = addslashes($_GET['user']);
	$message = addslashes($_GET['message']);
	date_default_timezone_set("America/New_York");
	$datetime = date('Y-m-d H:i:s');

	
	// $query = "insert into chatlog (dayte, user, message) values ('$datetime', '$user', '$message')"; 
												
	// $result = mysql_query( $query);

    // if($result)
    // {
	//  	echo true;	      
    // } else {
	//     echo mysql_error();
    // } // end if
	
	//inserting some some data
	$sql = 'insert into chatlog (dayte, user, message) values (:datetime, :user, :message)';
	
	$query_params = array(
		':datetime' => $datetime, 
		':user' => $user, 
		':message' => $message); 	
		
	//print_r($query_params); exit();
	
	try {  
            $stmt = $db->prepare($sql); 
            $result = $stmt->execute($query_params); 
            echo true; // for success
            // exit();
    } catch(PDOException $ex) { 
	        echo "0 .Failed to run query: " . $ex->getMessage(); 
			logmsg("signup.php : Failed to run query: " . $ex->getMessage());
			exit();
    } 	  
    
}
?>
