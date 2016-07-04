Airowl Wi

Preloaded / Preferred characteristics

1.	Code does not print anything on Serial Monitor.
2.	ESP8266 communicate on Baud rate of 9600.

Frequently asked questions

1.	How to enable printing on Serial Monitor for easy debugging?
Ans: The code is designed in such a way to avoid any kind of lagging/sticking of code due to printing on Serial Monitor. For that all      the Serial print commands are commented. For debugging purpose these Serial print commands can be easily uncommented just by          following these simple steps.
      (i)	Open the Arduino code “Airowl_wifi” present in the same folder.
      (ii)	 Press Ctrl + F to search within the code
      (iii)	Fill in the following Find & Replace as shown in the image following
 
      (iv)	Click Replace all
     Now the code can be debugged using Serial Monitor. 
     To again comment the Serial print commands follow the same procedure of uncommenting them as explained above and just fill the following credentials in Find & Replace
 
2.	How to reset the Baud rate of ESP8266 at 9600?
Ans: For resetting the Baud rate of ESP8266 modules open the Arduino code “BaudRate_ESP” present in the same folder. Just change the       baud rate as according to your need and upload the code on your Airowl’s Arduino Nano.
     As you’ve replaced the preloaded code from the Arduino you need to upload back the “Airowl_wifi” code into Arduino Nano. Extra care must be taken to change the baud rate in “Airowl_wifi” also.

3.	How to upload code on Arduino Nano?
Ans: We’ve very meticulously illustrated the process of uploading the code onto Arduino Nano on our wiki page. Here’s the link:            http://bit.do/Airowl
     Go to the section 4.3 Re-coding your Airowl.



