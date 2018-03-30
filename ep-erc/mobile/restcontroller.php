<?php
	require_once("config.php");
	require_once("services.php");
	require_once("dfbfunctions.php");


/*
	dfb-
	both GET and POST arrays can be set - once from the caller as a POST and another from the .htaccess redefine for the restfulness	
*/
//print_r($_GET);
//print_r($_POST);
//print_r($_SERVER['REQUEST_METHOD']);

//if(isset($_POST)) {
//	
	//echo '{"error":[{"message":"post data is set - username: ' . $_GET["service"] . '"}]}';
	//exit();
//
//}

//echo " restCOntroller.php "; exit();


$service = "";
if(isset($_GET["service"]))
	$service = $_GET["service"];
/*
controls the RESTful services
URL mapping
*/

//exit(); 

$services = new Services();

switch($service){

	case "login":
		$uname = $_POST["uname"];
		$pword = $_POST["pword"];

		
		echo $services->login($uname, $pword);
		break;

	case "system":
		
		echo $services->getSystem();

		break;
		
	case "users":
		
		echo $services->getUsers();
		break;
		
	case "tasks":
		
		echo $services->getTasks();
		break;

	case "contracts":
		
		echo $services->getContracts();
		break;

	case "adduser":
		
		echo $services->addUser($_POST);
		break;

	case "updateuser":
		
		echo $services->updateUser($_POST);
		break;

	case "" :
		echo "not found";
		break;
}
?>