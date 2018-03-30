<?php	
	require('config.php');
		
	// print_r($_POST); exit();
		
	if(!empty($_POST)) {	
		if(empty($_POST['erc_firstName'])) die("Please enter first name.");
		if(empty($_POST['erc_lastName'])) die("Please enter last name.");
		if(empty($_POST['erc_cellPhone'])) die("Please enter cell phone.");
		if(empty($_POST['erc_street'])) die("Please enter street address.");
		if(empty($_POST['erc_city'])) die("Please enter city.");
		if(empty($_POST['erc_state'])) die("Please enter state.");
		if(empty($_POST['erc_zip'])) die("Please enter zip.");
		
		$erc_firstName = $_POST['erc_firstName'];
		$erc_lastName = $_POST['erc_lastName'];
		$erc_cellPhone = $_POST['erc_cellPhone'];
		$erc_initial = $_POST['erc_initial'];
		$erc_street = $_POST['erc_street'];
		$erc_city = $_POST['erc_city'];
		$erc_state = $_POST['erc_state'];
		$erc_zip = $_POST['erc_zip'];
		$erc_weight = $_POST['erc_weight'];
		$erc_height = $_POST['erc_height'];
		$erc_age = $_POST['erc_age'];
		$erc_emailAddress = $_POST['erc_emailAddress'];
		$erc_skierType = $_POST['erc_skierType'];
		$erc_snowboardStance = $_POST['erc_snowboardStance'];
		$operatorUserName = $_POST['operatorUserName'];
		$cID = $_POST['cID'];

		if($cID == 'undefined') { // coming from javscript - no id to update-  must be a new add

			$sql = "insert into contracts (
							firstName, 
							lastName, 
							Initial, 
							cellPhone,
							street,
							city,
							state,
							zip,
							weight,
							height,
							age,
							emailAddress,
							skierType,
							snowboardStance,
							creationDate,
							operatorUserName
							) values (
							'$erc_firstName', 
							'$erc_lastName', 
							'$erc_initial', 
							'$erc_cellPhone',
							'$erc_street',
							'$erc_city',
							'$erc_state',
							'$erc_zip',
							'$erc_weight',
							'$erc_height',
							'$erc_age',
							'$erc_emailAddress',
							'$erc_skierType',
							'$erc_snowboardStance',
							now(),
							'$operatorUserName'
							)";
			
			$result = $connection->query($sql);
				
			if($result === true) {
				$lastID = $connection->insert_id;		
				echo $lastID;  // this will be the ID of the row inserted					
			} else {
				echo "0 Data Entry Error on add contract: " . /* $sql . */ "<br>" . $connection->error;
				exit();
			}
		} else {
			// cID must be present so this is an update
			
			$sql = "update contracts set
							firstName = '$erc_firstName',
							lastName = '$erc_lastName',
							Initial = '$erc_initial',
							cellPhone = '$erc_cellPhone',
							street = '$erc_street',
							city = '$erc_city',
							state = '$erc_state',
							zip = '$erc_zip',
							weight = '$erc_weight',
							height = '$erc_height',
							age = '$erc_age',
							emailAddress = '$erc_emailAddress',
							skierType = '$erc_skierType',
							snowboardStance = '$erc_snowboardStance'
						where
							ID = $cID";
			
			if ($connection->query($sql) === TRUE) {
			    echo $cID; // "Record updated successfully";
			    // return the id so that the calling function can know it was an update
			} else {
			    echo "Error updating record: " . $sql . $connection->error;
			}		
		}
	} else {
		exit("0 not enough data in POST array");
	}		
				
?>