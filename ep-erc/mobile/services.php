<?php
	//echo " login ";
	
require_once("simplerest.php");


   class Services extends SimpleRest {
	   
	   public function updateUser($post) {
		   // dfb non of this code in this function has been tested - needed to go 
		   // back to the start to included username
		   
		   	$ID = $post['ID'];
		   	if($ID == "") {   	
		   		return '{"error":[{"message":"updateUser.php: ID: no id provided :'. $post['ID'] .'"}]}';
		   	}		   
		   
		   $username = $post['username'];
		   $firstname = $post['firstname'];
		   $lastname = $post['lastname'];
		   $email = $post['email'];
		   $role = $post['role'];
		   
		   
		   
		   $db = new Database();
		   	
		        $query = "SELECT 1 FROM user WHERE username = :username and ID <> :ID";
			    $query_params = array(':username' => $username, ':ID' => $ID);
			
			    try { 
			        $stmt = $db->prepare($query); 
			        $result = $stmt->execute($query_params); 
			    } catch(PDOException $ex){ 
				   return '{"error":[{"message":"PDO error on duplication check: updateUser: ' . $ex->getMessage() . '"}]}';
					logmsg("updateUser.php : Failed on duplication check: updateUser: " . $ex->getMessage());
			       	exit();
			    } 	
			    
			    $row = $stmt->fetch(); 
			    
			    if($row) { 
			        //die("This username address is already registered"); 
			        // setup reset password button and sent password via email
				   return '{"error":[{"message":"User name already taken"}]}';
			        exit();
			    } 
					
				$sql = 'update user set 
								username = :username, 
								firstname = :firstname, 
								lastname = :lastname,						 
								role = :role,						 
								email = :email						 
						where ID = :ID';	
			
				$query_params = array(
					':username' => $username, 
					':firstname' => $firstname, 
					':lastname' => $lastname,
					':role' => $role,
					':email' => $email,
					':ID' => $ID); 	
				
				//print_r($query_params); exit();
				try {  
			            $stmt = $db->prepare($sql); 
			            $result = $stmt->execute($query_params); 
			            
			    } catch(PDOException $ex) { 
					logmsg("updateUser.php : Failed to update: updateUser: " . $ex->getMessage() .  " " . $sql);
					return '{"error":[{"message":"Failed to run update: updateUser: ' . $ex->getMessage() . ' ' . $sql . '"}]}';
					//exit();
			    } 	
				//logmsg("inside updateAccount.php after insert");
			    		   	
			    		   	
			   return '{"success":[{"message":"success"}]}';
		   
	   } // end updateUser()
	   
	   public function addUser($post) {
		   
		   
		   $firstname = $post['firstname'];
		   $lastname = $post['lastname'];
		   $email = $post['email'];
		   $role = $post['role'];
		   
				
				//inserting some some data
				$sql = 'INSERT INTO user (username, firstname, lastname, email, loggedOn, password, rawPassword, hash, role, operatorUserName, photoFileName) 
				VALUES ("X", :firstname, :lastname, :email, 0 , "pw", "pw", "x", :role, "dbachor", "x")';
				
				$query_params = array(
					':firstname' => $firstname, 
					':lastname' => $lastname, 
					':email' => $email,
					':role' => $role); 	
					
				//print_r($query_params); exit();
				
				try {  
						$db = new Database();
			            $stmt = $db->prepare($sql); 
			            $result = $stmt->execute($query_params); 
			            // echo true; // for success
			            // exit();
			    } catch(PDOException $ex) { 
				   return '{"error":[{"message":"Failed to run insert: addUser: ' . $ex->getMessage() . '"}]}';
					logmsg("signup.php : Failed to run query: " . $ex->getMessage());
					exit();
			    } 	  

		  		  logMsg("addUser: firstname: " . $firstname);
		   
		   	return '{"success":[{"message":"success"}]}';
	   }	   
	   
	    public function getSystem(){
		    
			$sql = "select companyName, companyPhone, showClosedTasks, ShowClosedContracts, logoImage from system";
					
		    try { 
				$db = new Database();
		        $stmt = $db->prepare($sql); 
		        $result = $stmt->execute(); 
				
				$outData = array();
				while($row = $stmt->fetch()) {
					$outData[] = $row;
				} 
				//echo json_encode($outData);
				echo '{"system":' . json_encode($outData) . '}'; 
				exit();
		    } catch(PDOException $ex){ 
				   return '{"error":[{"message":"Failed to run query: getSystem: ' . $ex->getMessage() . '"}]}';
		       	exit();
		    } 
    	}   // end getSystem
		
		
		public function getContracts(){
		    
			$sql = "select ID, firstName, lastName, skierType from contracts";
					
		    try { 
				$db = new Database();
		        $stmt = $db->prepare($sql); 
		        $result = $stmt->execute(); 
				
				$outData = array();
				while($row = $stmt->fetch()) {
					$outData[] = $row;
				} 
				//echo json_encode($outData);
				echo '{"contracts":' . json_encode($outData) . '}'; 
				exit();
		    } catch(PDOException $ex){ 
				   return '{"error":[{"message":"Failed to run query: getContracts: ' . $ex->getMessage() . '"}]}';
		       	exit();
		    } 
    	}   // end getSystem
	
		public function getTasks(){
		    
			$sql = "select ID, task, assignedUserID, status from tasks";
					
		    try { 
				$db = new Database();
		        $stmt = $db->prepare($sql); 
		        $result = $stmt->execute(); 
				
				$outData = array();
				while($row = $stmt->fetch()) {
					$outData[] = $row;
				} 
				//echo json_encode($outData);
				echo '{"tasks":' . json_encode($outData) . '}'; 
				exit();
		    } catch(PDOException $ex){ 
				   return '{"error":[{"message":"Failed to run query: getTasks: ' . $ex->getMessage() . '"}]}';
		       	exit();
		    } 
    	}   // end getSystem
		
		
		
		public function getUsers(){
		    
			$sql = "select ID, username, firstname, lastname, email, role, photoFileName from user";
					
		    try { 
				$db = new Database();
		        $stmt = $db->prepare($sql); 
		        $result = $stmt->execute(); 
				
				$outData = array();
				while($row = $stmt->fetch()) {
					$outData[] = $row;
				} 
				//echo json_encode($outData);
				echo '{"users":' . json_encode($outData) . '}'; 
				exit();
		    } catch(PDOException $ex){ 
				   return '{"error":[{"message":"Failed to run query: getUsers: ' . $ex->getMessage() . '"}]}';
		       	exit();
		    } 
    	}   // end getSystem
		
		
		
		
		
   		public function login($uname, $pword){
	   		
	   			//if(empty($uname) == "" || empty($pword) == "") {
				//   	return '{"error":[{"message":"username or password missing"}]}';
			    //   	exit();
	   			//}
	
				$hash = md5($pword);
				
				$query = "SELECT username FROM user WHERE username = :username and password = :password";
				$query_params = array(':username' => $uname, ':password' => $pword);
				
				// return '{"error":[{"message":"username or password missing??' . $uname . '"}]}';
				
				
			    try { 
				    $db = new Database();
			        $stmt = $db->prepare($query); 
			        $result = $stmt->execute($query_params); 
			    } catch(PDOException $ex){ 
				   	return '{"error":[{"message":"Failed to run query:: ' . $ex->getMessage() . '"}]}';
			       	exit();
			    } 
			    
			    $row = $stmt->fetch(); 
			    
			    if($row) { // this is a successful login
				    $username = $row['username'];
					
			        // at this point it should be a success - ok to return the data form th database
						$query = "select username, firstname, lastname, email, role, photoFileName from user WHERE username = :userName";
						$query_params = array(':userName' => $username);
			
						try { 
							$stmt = $db->prepare($query); 
							$result = $stmt->execute($query_params); 
							
							$outData = array();
							while($row = $stmt->fetch()) {
								$outData[] = $row;
							} 
							//echo json_encode($outData);
							echo '{"user":' . json_encode($outData) . '}'; 
							exit();
						} catch(PDOException $ex){ 
							return '{"error":[{"message":"Failed to run query:: ' . $ex->getMessage() . '"}]}';
							exit();
						} 
			        
			    } else { // failed login
					return '{"loginFailed":[{"message":"No user by the credentials provided. ' . $uname . '"}]}';
				    exit();
			    }
			return '{"loginFailed":[{"message":"No user by the credentials provided. ' . $uname . '"}]}';
		}
   }

   
   
   
   
   
?>