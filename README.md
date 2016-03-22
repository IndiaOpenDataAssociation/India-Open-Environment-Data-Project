# IndiaOpenData
The India Open Environment Data Project is focused on assessing the air-quality index of different parts of Delhi and showcasing the information in an open, standardized and visualized format to promote community action within the society. For which India Open Data needed help in showcasing the readings in a very simple and understandable format on their website
http://indiaopendata.com/india-open-environment-data-project/delhi , so that anybody accessing the site should be able to understand the Air Quality for a specific area.

# India Open Data had developed a small and cost effective device to measure the Air Quality and send the captured data to their server.


#Procedure:
I have developed the following three live JSON:
#1. Position 
This Json will pass the data related to devices planted in which area. 
#2. Current Reading 
This Json was passing the data related to current readings,1Hour and 24Hours for all the predefined parameters.
#3. Days Reading  
This Json was passing the data related to hourly data for last 15 days for all the predefined parameters.

#Development:
#Position (See above 1st point in Procedure)
I used the google map to showcase the location pointers using the longitude and latitude passing in the Json.
So the logic was to read the Json and capture the longitude and latitude for each location and create a location pointer. I have created the manual pins so that we can control the pin colour and text showing inside the pin.  

#Current Details of Air Quality(See above 2nd point in Procedure)
I have used the Json which is passing the current reading for all the parameter for that location to showcase the reading for each parameter for current, last hr. and Days’ Peak. Also, when you click on any map pointer(marker) you can see the reading for each parameter for last hr. and Days’ Peak.  The logic and colour combination shown on each entry based on Air Quality Index (AQI). AQI for each parameter is shown https://en.wikipedia.org/wiki/Air_quality_index
AQI, defined the colour represented for the range of reading for each parameter.

#Check Trend of Air Quality(See above 3rd point in Procedure)
I have used these colours to represent the reading for each parameter. Also, when you click on “Check Trend” you can see the readings for each parameter for last 15 days and per hour.
