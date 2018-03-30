<!doctype html>
<html>
<head>
	
	<!-- 
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	-->
	<meta http-equiv="expires" content="0">
	<meta name="author" content="David Bachor">
	
	<title>
		Equipment Rental Contract Tracking
	</title>
	
 
	<!-- Bootstrap Latest compiled and minified CSS -->
	<!-- Bootstrap Latest compiled and minified CSS -->
	<!-- Bootstrap Latest compiled and minified CSS -->
	<!-- Bootstrap Latest compiled and minified CSS -->
	<!-- Bootstrap Latest compiled and minified CSS -->
	
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"> -->
	<link rel="stylesheet" href="css/bootstrap.min.css">
	
	<!-- data table css -->
	<!-- data table css -->
	<!-- data table css -->
	<!-- data table css -->
	<!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.11/css/dataTables.bootstrap.min.css"> -->
	<link rel="stylesheet" type="text/css" href="css/dataTables.bootstrap.min.css">
	
 
	<!-- Optional Bootstrap theme -->
	<!-- Optional Bootstrap theme -->
	<!-- Optional Bootstrap theme -->
	<!-- Optional Bootstrap theme -->
<!-- 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous"> -->


	<!-- Latest compiled and minified JavaScript -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>



	<!--  Bootstrap JS -->
	<!--  Bootstrap JS -->
	<!--  Bootstrap JS -->
	<!--  Bootstrap JS -->
	<!--  Bootstrap JS -->
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script> -->
	
	<script src="js/bootstrap.min.js"></script>


	<!-- from https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js -->
	<script type="text/javascript" language="javascript" src="js/jquery.dataTables.min.js"></script>
	
	<!-- from https://cdn.datatables.net/1.10.11/js/dataTables.bootstrap.min.js -->
	<script type="text/javascript" language="javascript" src="js/dataTables.bootstrap.min.js"></script>

	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	
    <script type="text/javascript" src="js/bootstrap-formhelpers-phone.js"></script>
    <script type="text/javascript" src="js/bootstrap-formhelpers-phone.format.js"></script>
    


	<link href="css/custom.css" rel="stylesheet">
	<link href="css/ercPrint.css" rel="stylesheet">
	
	<script src="js/general.js"></script>
	<script src="js/contract.js"></script>
	<script src="js/task.js"></script>
	<script src="js/user.js"></script>

</head>
<body>
	
<?php include("mainNavHeader.html"); ?>
<?php //echo $_SERVER['DOCUMENT_ROOT'] . "/ep-erc/mainNavHeader.html"; ?>

<div id="mainContainer">
  
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/ep-erc/mainMenu.php"); ?>	  
	<?php include("mainMenu.php"); ?>	  
    
  </div> <!-- main tab content -->
</div> <!-- main container -->





<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com//ep-erc/mainContractModal.html"); ?>	
<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com//ep-erc/mainTaskModal.html"); ?>	
<?php //include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com//ep-erc/mainUserModal.html"); ?>	

<?php include("mainContractModal.html"); ?>	
<?php include("mainTaskModal.html"); ?>	
<?php include("mainUserModal.html"); ?>	


<div class="waitModal"><!-- Place at bottom of page --></div>
<br>


<nav class="navbar navbar-default navbar-fixed-bottom navbar-custom myFooter">
<!--   <div class="container"> -->
    <span style="color: #054f05;">@copywrite <a href="http://dbachor.com"> dbachor.com </a> - All Rights Reserved</span>
<!--   </div> -->
</nav>


</body>
</html>