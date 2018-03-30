<?php

	// Form data:
	$fname      = 'John';
	$lname      = 'Smith';
	$occupation = 'Teacher';
	$age        = '45';
	$gender     = 'male';
	
	// FDF header section
	$fdf_header = "
	%FDF-1.2 
	1 0 obj
	<<
	/FDF << /Fields [";
	
	
	// FDF footer section
	$fdf_footer = "] >> >>
	endobj
	trailer
	<</Root 1 0 R>>
	%%EOF";
	

	// FDF content section
	$fdf_content  = "<< /T (first_name) /V ({$fname}) >>";
	$fdf_content .= "<< /T (last_name) /V ({$lname}) >>";
	$fdf_content .= "<< /T (occupation) /V ({$occupation}) >>";
	$fdf_content .= "<< /T (age) /V ({$age}) >>";
	$fdf_content .= "<< /T (gender) /V ({$gender}) >>";

	$content = $fdf_header . $fdf_content . $fdf_footer;
	// Creating a temporary file for our FDF file.
	$FDFfile = tempnam(sys_get_temp_dir(), gethostname());
	
	echo $FDFfile;

	file_put_contents($FDFfile, $content);
	
	// Merging the FDF file with the raw PDF form
	exec("pdftk fillPDF.pdf fill_form $FDFfile output.pdf"); 
	
	// Removing the FDF file as we don't need it anymore
	unlink($FDFfile);

?>