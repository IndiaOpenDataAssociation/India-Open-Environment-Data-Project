//GET ALL LOCATIONS DATA 
<?php $url = "http://indiaopendata.com/indiaopendata_api/get_locations_json.php";

$result =  file_get_contents($url);
echo $result;
 
?>
