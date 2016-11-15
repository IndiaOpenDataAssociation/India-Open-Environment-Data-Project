# IndiaOpenData
The India Open Environment Data Project is focused on assessing the air-quality index of different parts of Delhi and showcasing the information in an open, standardized and visualized format to promote community action within the society. For which India Open Data needed help in showcasing the readings in a very simple and understandable format on their website:
http://openenvironment.indiaopendata.com.
 The purpose was to make anyone access the site and be able to understand the air quality for a specific area at any given point of time.
# India Open Data had developed a small and cost effective device to measure the air quality and send the captured data to their server.
#Installation:
This Front end application has been implemented in AngularJS 1.4.x. Gulp task runner is there to run your code and deploy it to production server. Bower components has been used for libraries which are used in application.
#1. install node and bower components 
Please run clone this application and run following commands : 
```
npm install
bower install
```
#2. Code Structure 
Each of the modules in AngularJS are having it's own controller, module, factory, route and other directives if required.
```
dashboard
  --- dashboard.controller.js
  --- dashboard.module.js
  --- dashboard.route.js
  --- dashboard.factory.js
``` 
#3. Run Application with gulp  
We are using gulp as JS task runner, it builds your code, uglifies it, minifies it and joins all js and css files into one.
To run your application in local with (browser sync open) run following command.
```
gulp serve
```

To minify and combine all files, run production deployment which combines all js and css files to one and save all the data to "dist" directory.
```
gulp deploy:dist
```

#4. Angular Version 
We are using AngularJS version 1.4.x. We will be shifting to AngularJS 2.0 very soon.


#5. Contribute 
Any developer can contribute to this project by generating pull request to this repository.

Happy Coding!!!
