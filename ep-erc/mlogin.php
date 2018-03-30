<?php
	require('config.php');
		
	$uname = $_POST['uname'];
	$pword = $_POST['pword'];
	$serveraddr = $_SERVER['REMOTE_ADDR'];

	//print_r($_POST); exit();
	
	// need to check to see if the update is needed - if the user is already logged in then
	// just exit as a successful loggin
	$hash = md5($pword);
	$sql = "SELECT * FROM user WHERE username = '$uname' and hash = '$hash'";

	$result = $connection->query($sql);

	if ($result->num_rows == 1) {
		$row = $result->fetch_assoc();
		
        
        if( $row['loggedOn'] == 1) { // if the user is logged on already  - just return with user data
	        $userData = array();
	        $userData[] = $row;
	        echo '{"user":' . json_encode($userData) . '}';
			logmsg("User " . $uname . " logged on from Cookie!");
	        //echo 1; // user already logged in so exit true and move on
	        exit();				
		} 
	} else {
		// no user found, no need update just return no user
		echo '{"error":[{"message":"loginFailure: There is not user with this username and password"}]}';
		// echo "0 - There is not user with this username and password";
		exit();
	}
	
	
	// at this point there must be a user in the database with a loggedOn 
	// value not == 1 - so we need to update it to 1
		
	$sql = "UPDATE user SET loggedOn = 1, ipAddress = '$serveraddr' WHERE username = '$uname' and hash = '$hash'";
				
	if ($connection->query($sql) === TRUE) {
		if($connection->affected_rows == 1) {
			
	        $userData = array();
	        $userData[] = $row; // set in the above select query
	        echo '{"user":' . json_encode($userData) . '}';
			logmsg("User " . $uname . " logged on from dropdown");
	        //echo 1; // user already logged in so exit true and move on
	        exit();				
		} else {
			 //echo "0 No affected rows for log in update";
		echo '{"error":[{"message":"No affected rows for log in update.  Trying to update user.loggedOn but not record found - this is a serious data inconsistency issue and needs to be resolved asap!"}]}';
		}
	} else {
	    //echo "0 ERROR=Error updating record: $sql :" . $connection->error;
		echo '{"error":[{"message":"ERROR=Error updating record: $sql : '+ $connection->error + '"}]}';
	}
	
?>