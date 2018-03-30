<html>
	<head>
		<meta http-equiv="refresh" content="3;url=index.html">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="">
		<meta name="author" content="">

		<title>Contact - David F. Bachor - Guitarist</title>

		<!-- Bootstrap Core CSS -->
		<link href="css/bootstrap.min.css" rel="stylesheet">

		<!-- Custom CSS -->
		<link href="css/dfb-musician.css" rel="stylesheet">

		<!-- Fonts -->
		<link href="http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
		<link href="http://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
	        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>
	<p>In Php File</p>

<?php
$myemail = 'davidfbachor@gmail.com';
if (isset($_POST['sendmessage'])) {
	$name = strip_tags($_POST['flname']);
	$email = strip_tags($_POST['email']);
	$phone = strip_tags($_POST['phone']);
	$message = strip_tags($_POST['message']);
	echo "<span class=\"alert alert-success\" >Your message has been received. Thanks! Here is what you submitted:</span><br><br>";
	echo "<stong>Name:</strong> ".$flname."<br>";	
	echo "<stong>Email:</strong> ".$email."<br>";	
	echo "<stong>Phone:</strong> ".$phone."<br>";		
	echo "<stong>Message:</strong> ".$message."<br>";


	$to = $myemail;
	$email_subject = "Contact Form From Resume Site: $name";
	$email_body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n ".
	"Email: $email\n Phone: $phone \n Message \n $message";
	$headers = "From: $myemail\n";
	// $headers .= "Reply-To: $email";
	$mailsent = mail($to,$email_subject,$email_body,$headers);
	if ($mailsent == true){
		echo "<string>Mail sent</Strong><br>";
	} else {
		echo "<string>Mail not sent</Strong><br>";
	}
	
} else {
?>
	<P>Error html here</P>
			
<?php
}
?>

	</body>
</html>