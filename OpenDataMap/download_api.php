<?php 
	// Start output buffering (to capture stream contents)
	$filepath='/var/www/html/opendata/indiaopendataapi.txt';
	//$fh = fopen('/var/www/html/opendata/indiaopendataapi.txt', 'r');
	
	// Start output buffering (to capture stream contents)
	ob_start(); 
	 
    readfile($filepath);
    // Get the contents of the output buffer
    $string = ob_get_clean();  
	$filename = 'indiaopendata_api' . date("Y-m-d");
	$ContentType		= "Content-type: application/vnd.ms-excel";
	$ContentLength		= "Content-Length: $size_in_bytes";
	$ContentDisposition	= "Content-Disposition: attachment; filename=\"$filename.txt\"";
	 
	header($ContentType);
	header($ContentLength);
	header($ContentDisposition);        
	exit($string);
		 	
		 	
	
	
?>