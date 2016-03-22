<?php

	if(isset($_GET['device_id']) && isset($_GET['location_address']))
	{
		$deviceId=$_GET['device_id'];
		$location_address= $_GET['location_address'];

		
		$result_arr=array();
		
		$url = "http://indiaopendata.com/indiaopendata_api/get_view2_json.php?device_id=".$deviceId;

		$result =  file_get_contents($url);
		 
		//$result =  file_get_contents($url);
		//print_r($result);
 		$json_arr=json_decode($result);
   		
 		//$csvheader='"Pollutant Name","Location","Current Data","1 Hour Data","24 Hours data"';
		
		$headings = array("Location","Pollutant Name","Current Data","1 Hour Data","24 Hours Data");
		
		// Open the output stream
		$fh = fopen('php://output', 'w');
		
		// Start output buffering (to capture stream contents)
		ob_start();
		        
		fputcsv($fh, $headings);
		        
		// Loop over the * to export
		if (!empty($json_arr)) {
		    foreach($json_arr as $item){


				$OneHourData= $item->last1hr;
				$Day_data=$item->day;
				$CurrentData=$item->currentPeak;
				$PollutantName=$item->name;

				if($PollutantName=="butane" || $PollutantName=="methane" || $PollutantName=="propane" || $PollutantName=="sound" || $PollutantName=="ethanol"  || $PollutantName=="uv")
				{

				}
				else{

						
					//echo $Day_data;
					if($OneHourData=="-" || $OneHourData==0)
					{
						$OneHourData="NA";
					}
					if($Day_data=="-" || $Day_data==0)
					{
						$Day_data="NA";
					}
					if($CurrentData=="-" || $CurrentData==0)
					{
						$CurrentData="NA";
					}
					$temp=array($location_address,$PollutantName,$CurrentData,$OneHourData,$Day_data);
				
					fputcsv($fh, $temp);
				}
	 		

				
			}	
		  
		}
		fclose($fh);
		// Get the contents of the output buffer
		$string = ob_get_clean();
		        
		$filename = 'polluted_' . date("Y-m-d") .'_' . date('H-i-s');
		

		$ContentType		= "Content-type: application/vnd.ms-excel";
		$ContentLength		= "Content-Length: $size_in_bytes";
		$ContentDisposition	= "Content-Disposition: attachment; filename=\"$filename.csv\"";
		 
		header($ContentType);
		header($ContentLength);
		header($ContentDisposition);        
		exit($string);
		 	
	}
	
?>
