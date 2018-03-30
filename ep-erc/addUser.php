<?php	
	require('config.php');
	$fileUploadErrorMessage="";
	
	// print_r($_POST); exit();
	
	function uploadFile ($theFile, $personType, $pID) {
		global $fileUploadErrorMessage;
		$fileUploadErrorMessage = "";
		
		$target_dir = "photos/";
		date_default_timezone_set('America/New_York');
		$dayte = date("Y-m-d-h-i-sa"); // get a unique timestamp to save with the image

		$target_file = $target_dir . $personType . "_" . $pID . "_" . basename($theFile["name"]);
		$anyExistingFiles = $target_dir . $personType . "_" . $pID . "*";
		
		$target_file = str_replace(' ', '', $target_file); // remove any spaces in the fiel name

		
		$uploadOk = 1;
		
		$check = getimagesize($theFile["tmp_name"]);
		if($check !== false) {
			// echo "File is an image - " . $check["mime"] . ".";
			$uploadOk = 1;
		} else {
			$fileUploadErrorMessage .= "File is not an image. ";
			$uploadOk = 0;
		}
		
		if (file_exists($target_file)) {
			$fileUploadErrorMessage .=  "Sorry, file already exists. ";
			$uploadOk = 0;
		}
		 // Check file size
		if ($_FILES["fileToUpload"]["size"] > 1000000) {
			$fileUploadErrorMessage .=  "Sorry, your file is too large. ";
			$uploadOk = 0;
		}
		
		// Allow certain file formats
		$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
		$imageFileType = strtolower($imageFileType); // needed to check against the file type in case stored in uppercase
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
			$fileUploadErrorMessage .= "Sorry, only JPG, JPEG, PNG & GIF files are allowed. ";
			$uploadOk = 0;
		}
	
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
			$fileUploadErrorMessage .= "Sorry, your file was not uploaded. ";
			return false;
		} else { // if everything is ok, try to upload file
	
	
				foreach(glob($anyExistingFiles) as $f) {
				    unlink($f); // remove any files for this user
				}
				if (move_uploaded_file($theFile["tmp_name"], $target_file)) {
					return $target_file;
				} else {
					$fileUploadErrorMessage .= "Unknown error saving image file";
					return false; 
				}
		}
		
	} // end uploadFile function
	//////////////////////////////////////////////////////////////////////////////////////////
	//print_r($_POST);
	//exit();
		
	if(!empty($_POST)) {	
	
		if(empty($_POST['fname'])) die("Please enter your first name."); 
		if(empty($_POST['lname'])) die("Please enter your last name."); 
		if(empty($_POST['uname'])) die("Please enter your user name."); 
		if(empty($_POST['role'])) die("Please select user role."); 
		if(empty($_POST['email'])) die("Please enter your email address."); 
		if(empty($_POST['pword'])) die("Please enter your password."); 
		
		$fname = mysqli_real_escape_string($connection, $_POST['fname']);
		$lname = mysqli_real_escape_string($connection, $_POST['lname']);
		$uname = mysqli_real_escape_string($connection, $_POST['uname']);
		$email = mysqli_real_escape_string($connection, $_POST['email']);
		$role = mysqli_real_escape_string($connection, $_POST['role']);
		$pword = mysqli_real_escape_string($connection, $_POST['pword']);
		$uID = $_POST['uID'];
		$systemID = $_POST['systemID'];
		$operatorUserName = $_POST['operatorUserName'];
				
				
		$hash = md5($pword);
 		$targetFile = "photos/default.jpg"; // default image name
		
		if($uID == 'undefined') { // coming from javscript - no id to update-  must be a new add

		
			$sql = "select 1 from user where username = '$uname'";
			$result = $connection->query($sql);
			
			if($result) {
				if($result->num_rows > 0 ) { // this may result in an error if there are no rows returned - it may not be an object at this point
					//this is a duplication of user name
					//echo "username already exists! " . $result->num_rows;
					exit("A user exists already with this user name!");
				} 
			}
						
			// at this point we have a value user to inser into the database
			
			$sql = "insert into user (
						firstname, 
						lastname, 
						username, 
						email, 
						password, 
						rawpassword,
						loggedOn,
						hash,
						role,
						operatorUserName,
						photoFileName ) values (
							'$fname', 
							'$lname', 
							'$uname', 
							'$email', 
							'$pword', 
							'$pword',
							0,
							'$hash',
							'$role',
							'$operatorUserName',
							'$targetFile')";
			
			//echo $sql; 
			//exit();
			
			$result = $connection->query($sql);
			
			if($result === true) {
				$lastID = $connection->insert_id;				
			} else {
				echo " Data Entry Error: " . /* $sql . */ "<br>" . $connection->error;
				exit();
			}
		
		} // end if($uID == 'undefined')
		
			
			
		if($uID != 'undefined')	{
			$sql = "select 1 from user where username = '$uname' and ID != $uID";
			$result = $connection->query($sql);	
				if($result) {
					if($result->num_rows > 0 ) { 
						//this is a duplication of user name
						exit("A user exists already with this user name!");
					} 
				}
								
		} else {
			$uID = $lastID; // set the Uid to the lst inserted id
		}
				
		if(!empty($_FILES)) {	
			$targetFile = uploadFile($_FILES["user_imageFile"], "user", $uID);
		
			// echo $targetFile; exit();
			if($targetFile == false){
				echo "Add User Failed on image upload - setting default image " . $fileUploadErrorMessage;
				$targetFile = "photos/default.jpg";
			}
			$imageToload = true;
		} else {
			$targetFile = "photos/default.jpg";
			$imageToload = false;
		}	
				
				
				
		if($imageToload) {
			$photoFileName = ", photoFileName = '$targetFile'";
		} else {
			if($uID == $lastID) { 				
				$targetFile = "photos/default.jpg"; // default image name
				$photoFileName = ", photoFileName = '$targetFile'";
			} else {
				$photoFileName = "";
			}
		}

				// at this point the image has been copied - not nee to update the database
				// or this is an update request
				
				$sql = "update user set 
							firstname = '$fname', 
							lastname = '$lname', 
							username = '$uname', 
							email = '$email', 
							password = '$pword', 
							rawpassword = '$pword',
							hash = '$hash',
							role = '$role',
							operatorUserName = '$operatorUserName'
							$photoFileName 
						where ID = $uID";

				if ($connection->query($sql) === TRUE) {
				    echo $uID; // "Record updated successfully";
				    // return the id so that the calling function can know it was an update
				} else {
				    echo "Error updating record: " . $connection->error;
				}		

	} else {
	
			exit("not enough data in GET array");
	}

		
		
		
		
		
?>