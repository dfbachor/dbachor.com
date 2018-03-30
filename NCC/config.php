<?php header('Access-Control-Allow-Origin: *');
		// localhost - flashdrive
		$username = "dbachor"; 
		$password = "detorres1"; 
		$host = "localhost"; 
		$dbname = "dfb"; 

		
		
		// mysql -h 107.180.2.3 -u cisc158Student -p
		//
		//$host="107.180.2.3"; // Host name 
		//$username="cisc158Student"; // Mysql username 
		//$password="cisc158Student"; // Mysql password 
		//$db_name="cisc158Exam"; // Database name 
		
		// Connect to server and select databse. mysql
		// $connection =  mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
		// mysql_select_db("$db_name") or die("cannot select DB");
		
		// session_start(); 


		$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'); 
		try { 
			$db = new PDO("mysql:host={$host};  dbname={$dbname};charset=utf8", $username, $password, $options); 
		}     
		catch(PDOException $ex){
			//header("http/1.0 503 Service Unavailable");		
			logmsg("Config.php : Failed to connect to the database: "  . $ex->getMessage());
			echo "0 Failed to connect to the database: " . $ex->getMessage();
		}
		
		
		
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
		$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); 
?>