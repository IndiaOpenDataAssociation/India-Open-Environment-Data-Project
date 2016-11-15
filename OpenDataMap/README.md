# IndiaOpenData
The India Open Environment Data Project is focused on assessing the air-quality index of different parts of Delhi and showcasing the information in an open, standardized and visualized format to promote community action within the society. For which India Open Data needed help in showcasing the readings in a very simple and understandable format on their website:
http://openenvironment.indiaopendata.com.
 The purpose was to make anyone access the site and be able to understand the air quality for a specific area at any given point of time.
# India Open Data had developed a small and cost effective device to measure the air quality and send the captured data to their server.
#Installation:
This Front end application has been implemented in **React JS**. NodeJS is there to run your code and deploy it to production server. One needs to install all node packages described in package.json to run this application.
#1. install node and bower components 
Please run clone this application and run following commands : 
```
npm install
```
#2. Code Structure 
Each of the modules in ReactJS are having it's own controllers and components.
```
Dashboard
  --- components
  	  --- Map.js
  --- pages
	  --- Home.js
	  --- Analytics.js
	  --- Realtime.js
``` 
#3. Run Application with npm  
We are using node npm, it builds your code, uglifies it, minifies it and joins all js and css files into one.
To run your application in local with (browser sync open) run following command.
```
npm start
```

To minify and combine all files, run production deployment which combines all js and css files to one and save all the data to "dist" directory.
```

npm run bs

```

#4. React Version 
We are using React version 15.x.


#5. Contribute 
Any developer can contribute to this project by generating pull request to this repository.

Happy Coding!!!
