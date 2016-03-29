# IndiaOpenData
The India Open Environment Data Project is focused on assessing the air-quality index of different parts of Delhi and showcasing the information in an open, standardized and visualized format to promote community action within the society. For which India Open Data needed help in showcasing the readings in a very simple and understandable format on their website:
http://indiaopendata.com/india-open-environment-data-project/delhi.
 The purpose was to make anyone access the site and be able to understand the air quality for a specific area at any given point of time.
# India Open Data had developed a small and cost effective device to measure the air quality and send the captured data to their server.
#Procedure:
Three live JSON have been developed:
#1. Position 
This JSON will pass the data related to devices planted in which area. 
#2. Current Reading 
This JSON is passing the data related to readings for the past 1 Hour and 24 Hours for all the predefined parameters. 
#3. Days Reading  
This JSON is passing the data related to hourly data for last 15 days for all the predefined parameters to exhibit the changing air quality trend.

#Development:
#Position (See above 1st point in Procedure)
Google Map has been used to showcase the location pointers using the longitude and latitude passing in the JSON. So the logic is to read the JSON and capture the longitude and latitude for each location and create a location pointer. Manual pins have been created so that the pin colour can be controlled as well as the text showing within these pins.  
#Current Details of Air Quality (See above 2nd point in Procedure)
JSON has been used which is passing the current reading for all the parameters for that particular location to showcase the reading for each parameter for last hr. and days’ peak. Also, when anyone clicks on any map pointer (marker), they can see the reading for each parameter for last hr. and days’ peak. The colour combination shown on each entry is based on Air Quality Index (AQI). AQI for each parameter is shown here https://en.wikipedia.org/wiki/Air_quality_index
AQI, defines the colour represented for the reading range for each parameter.

#Check Trend of Air Quality (See above 3rd point in Procedure)
Same colour codes have been used to represent the reading for each parameter. Also, when anyone clicks on “Check Trend”, they can see the readings for each parameter for last 15 days at a 4-hour gap basis.
