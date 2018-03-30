<?php	
	require('config.php');
	
	// print_r($_FILES); exit();
			
	if(!empty($_POST)) {	
	
		if(empty($_POST['cID'])) die("No company ID."); 
		if(empty($_POST['cName'])) die("No company name."); 
		//if(empty($_POST['cPhone'])) die("No phone number."); 
		if(empty($_POST['operatorUserName'])) die("No user name."); 
		
		$cID = $_POST['cID'];
		$cname = mysqli_real_escape_string($connection, $_POST['cName']);
		$cphone = mysqli_real_escape_string($connection, $_POST['cPhone']);
		$cShowClosedTasks = ($_POST['cShowClosedTasks'] == "true") ? 1 : 0;
		$cShowClosedContracts = ($_POST['cShowClosedContracts'] == "true") ? 1 : 0;
		$operatorUserName = $_POST['operatorUserName'];
		
		// echo "test" . $cShowCompleteGrows; exit();


		$logoImageSQL = "";
		if(!empty($_FILES)) {	

			$uploadOk = 1;
					
			// echo basename($_FILES["settings_logoFile"]["name"]);
	
			// Check if image file is a actual image or fake image
			if(isset($_POST["submit"])) {
				$check = getimagesize($_FILES["settings_logoFile"]["tmp_name"]);
				if($check !== false) {
					// echo "File is an image - " . $check["mime"] . ".";
					$uploadOk = 1;
				} else {
					echo "0 File is not an image.";
					$uploadOk = 0;
				}
			}
			
			// Check file size
			if ($_FILES["settings_logoFile"]["size"] > 5000000) {
				echo "0 Sorry, your file is too large.";
				$uploadOk = 0;
			}
	
			$imageFileType = pathinfo($_FILES["settings_logoFile"]["name"],PATHINFO_EXTENSION);
			$imageFileType = strtolower($imageFileType); // needed to check against the file type in case stored in uppercase
			if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
			&& $imageFileType != "gif" ) {
				echo "0 Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
				$uploadOk = 0;
			}
			
			
			
			if ($uploadOk == 0) {
				echo "0 Sorry, your file was not uploaded.";
			// if everything is ok, try to upload file
			} else {
				$logoImage = "photos/settings_" . $cID ."_default.jpg";
				if (move_uploaded_file($_FILES["settings_logoFile"]["tmp_name"], $logoImage)) {
					$logoImageSQL = ", logoImage = '$logoImage'";
				}
			}
		}
					
		$sql = "update system set companyName = '$cname', 
								companyPhone = '$cphone', 
								showClosedTasks = '$cShowClosedTasks', 
								showClosedContracts = '$cShowClosedContracts', 
								operatorUserName = '$operatorUserName'
								$logoImageSQL
							where ID = $cID";

				//echo $sql; exit();		
			
		if ($connection->query($sql) === TRUE) {
		    echo true; // "Record updated successfully";
		    
		} else {
		    echo "0 Error updating record: " . $connection->error;
		}
	} else {
		exit("0 not enough data in GET array");
	}
	// enter into the database
	// if the email address exists then return error message starting such
	// if there is an error with the datanase or script - return the db error
	// otherwise insert the data and return true

?>