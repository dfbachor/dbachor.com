<?php
		
	function logmsg($msg) {
		
		date_default_timezone_set('America/New_York');
		$dayte = date("Y-m-d h:i:sa");
		$fileDayte = date("Y-m-d");
		
		$logmsg = $dayte . " -- " . $msg . "\r\n";

		
		file_put_contents('log/psacLog_' . $fileDayte . '.txt', $logmsg, FILE_APPEND | LOCK_EX);
		
	}		
		
		// localhost - flashdrive
		$host="localhost"; // Host name 
		$username="dbachor"; // Mysql username 
		$password="detorres1"; // Mysql password 
		$db_name="petersonSkiAndCycle"; // Database name  		
		
		$connection = new mysqli($host, $username, $password, $db_name);
		if ($connection->connect_error) {
			trigger_error('Database connection failed: '  . $connection->connect_error, E_USER_ERROR);
		}	
?>