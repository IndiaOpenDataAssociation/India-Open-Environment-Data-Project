Airowl Wi
**Preloaded / Preferred characteristics**

 - Code does not print anything on Serial Monitor. 
 - ESP8266 communicates on Baud rate of 9600.

**Frequently asked questions**

 ***How to enable printing on Serial Monitor for easy debugging?***
Ans: The code is designed in such a way to avoid any kind of lagging/sticking of code due to printing on Serial Monitor. For that all the Serial print commands are commented. For debugging purpose these Serial print commands can be easily uncommented just by following these simple steps.

 

 - Open the Arduino code “Airowl_wifi” present in the same folder.
 - Press Ctrl + F to search within the code
 - Fill in the following Find & Replace as shown in the image following![enter image description here](https://lh3.googleusercontent.com/-bXlvFCccBXI/V3oi6ohTcyI/AAAAAAAAERo/6GFj0kFJurQjvvgZjGzL7qxl5kxIJz4EQCLcB/s0/wi_1.PNG "wi_1.PNG")
 - Click Replace all
       
	Now the code can be debugged using Serial Monitor. 
	To again comment the Serial print commands follow the same procedure of uncommenting them as explained above and just fill the following credentials in Find & Replace 
			![enter image description here](https://lh3.googleusercontent.com/-bmpjkHlT0xk/V3ojFKphuRI/AAAAAAAAERw/lnEmZmkK4wEX9Ia0OoYUeP0loCqTQb1wgCLcB/s0/wi_2.PNG "wi_2.PNG")

***How to reset the Baud rate of ESP8266 at 9600?***
Ans: For resetting the Baud rate of ESP8266 modules open the Arduino code “BaudRate_ESP” present in the same folder. Just change the baud rate as according to your need and upload the code on your Airowl’s Arduino Nano.
As you’ve replaced the preloaded code from the Arduino you need to upload back the “Airowl_wifi” code into Arduino Nano. Extra care must be taken to change the baud rate in “Airowl_wifi” also.

***How to upload code on Arduino Nano?***
Ans: We’ve very meticulously illustrated the process of uploading the code onto Arduino Nano on our wiki page. Here’s the link: http://bit.do/Airowl
Go to the section 4.3 Re-coding your Airowl.

