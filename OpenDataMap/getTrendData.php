
//GET DETAILS DATA WHICH IS CURRENT DATA, 1HOURDATA, 24 HOURS DATA FOR ALL POLLUTANT 
<?php $url = "http://indiaopendata.com/indiaopendata_api/get_view2_json.php?device_id=".$_GET['deviceId'];

$result =  file_get_contents($url);
echo $result;
/*echo '[{"last1hr": 50, "day": 90, "name": "dustspm2.5", "currentPeak": 501},{"last1hr": 50, "day": 90, "name": "sound", "currentPeak": 80}, {"last1hr": 18, "day": 20, "name": "oxygen", "currentPeak": 15}, {"last1hr": "-", "day": "-", "name": "propane", "currentPeak": "-"}, {"last1hr": 1, "day": 1.5, "name": "hydrogen", "currentPeak": 1}, {"last1hr": "-", "day": "-", "name": "uv", "currentPeak": "-"}, {"last1hr": "-", "day": "-", "name": "nitrogen_dioxide", "currentPeak": "-"}, {"last1hr": "-", "day": "-", "name": "carbon_monoxide", "currentPeak": "-"}, {"last1hr": "-", "day": "-", "name": "ethanol", "currentPeak": "-"}, {"last1hr": 2349660, "day": 2349660, "name": "butane", "currentPeak": 2349660}, {"last1hr": "-", "day": "-", "name": "humidity", "currentPeak": "-"}, {"last1hr": "-", "day": "-", "name": "carbon_dioxide", "currentPeak": "-"}, {"last1hr": "-", "day": "-", "name": "ammonia", "currentPeak": "-"}, {"last1hr": 1641390, "day": 1641390, "name": "methane", "currentPeak": 1641390}]';*/
?>

