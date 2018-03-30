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
						creationDate
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
						now()
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
		exit("0 not enough data in POST array");
	}		
				
/*
		date_default_timezone_set('America/New_York');
		
		$insertDateFields .= 'startDate, ';
			if(!empty($_POST['startDate'])) {
				$gDate = DateTime::createFromFormat('Y-m-d', $_POST['startDate']);
				$dayte = "'" . $gDate->format('Y-m-d') . "', ";
			} else {
				$dayte = "null, ";
			}			
		$insertDateValues .= $dayte;
		$updateFieldsAndValues .= "startDate = $dayte";
*/
			
	
/*
		$systemID = $_POST['systemID'];


	
			$sql = "insert into grows (systemID, type, strainID, stageID, roomID, batchID, independentFromBatch, mediumID, preTrimWeight, postTrimWeight, $insertDateFields operatorUserName) 
												values ( $systemID, '$type', $strainID, $stageID, $roomID, $batchID, $independentFromBatch, $mediumID, $preTrimWeight, $postTrimWeight, $insertDateValues '$operatorUserName')";
												
												//echo $sql; exit();
			
			$result = $connection->query($sql);
			
			if($result === true) {
				$lastID = $connection->insert_id;		
				
				if(updateGrowID($connection, $lastID, $systemID)) {
					logmsg($operatorUserName . " " . $lastID . ": New Grows row created");
					echo $lastID;  // this will be the ID of the row inserted		
				} else {
					echo "0 Data Entry Error on adding growID";
				}
				
				
			} else {
				echo "0 Data Entry Error on add grow: " . $sql . "<br>" . $connection->error;
				exit();
			}
	} else {
		exit("0 not enough data in POST array");
	}
*/
?>