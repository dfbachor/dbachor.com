<!doctype html>
<html>
<head>	
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Application Shell</title>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

</head>

<body style="padding-top: 65px; padding-bottom: 65px;"> 
		<!-- Header -->
	<?php //error_reporting(E_ALL); ?>	
	<?php  include("header.html"); ?>
	
	<?php  include("home.html"); ?>
	<?php  include("about.html"); ?>
	<?php  include("contact.html"); ?>
	<?php  include("specificContent.html"); ?>
	<?php  include("signup.html"); ?>
	<?php  include("login.html"); ?>
	<?php  include("manageAccount.html"); ?>
	<?php  include("resetpw.html"); ?>

	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/applicationShell/header.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/home.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/about.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/contact.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/specificContent.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/signup.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/login.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/manageAccount.html"); ?>
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/resetpw.html"); ?>

		<!-- Footer -->
	<?php // include($_SERVER['DOCUMENT_ROOT'] . "/dbachor.com/applicationShell/footer.html"); ?>
	<?php include("footer.html"); ?>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.js"></script>
	
	
	<script src="js/appShell.js"></script>
	
	<script>
		$(document).ready(function() {
		    $('section').eq('home').show(); 
			
		    $('.navbar-nav').on('click', 'a', function() {
		        	$($(this).attr('href')).show().siblings('section:visible').hide();
		    });
		});
	</script>

</body>
</html>