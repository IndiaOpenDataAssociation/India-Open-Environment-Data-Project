//Including libraries
#include <SoftwareSerial.h> //Include software serial library, ESP8266 library dependency
#include <String.h> //Include string library which have all string handling functions 

//Software serial interface to connect  ESP8266 wifi module and dust sensor using Rx and Tx pin
SoftwareSerial wifi(7, 8); //(RX, TX)
SoftwareSerial Dust_Serial(2, 3); //(RX, TX)

//Initialization
int PM1 = 0, PM25 = 0, PM10 = 0;
int count = 0;
bool flag = false;

// Data to store recieved buffer
String Data = "";

// Unique Device Id
String deviceID = "";

// HOST Name to send data
char HOST_NAME[] = "Host: oedpdev.eu-gb.mybluemix.net";

// Command to store sending string
String command = "";

// Store SSID & Password for wifi
char ssid[15] = {0};
char pass[15] = {0};

// Timer Intervals
int publishInterval = 18000;
unsigned long lastPublishMillis;

//Ranges
const int Range1_max = 120; const int Range1_min = 60;
const int Range25_max = 350; const int Range25_min = 100;
const int Range10_max = 1200; const int Range10_min = 951;

void setup(void)
{
  //LED initiation
  analogWrite(A0, 1024); delay(1000); analogWrite(A0, 0);
  analogWrite(A1, 1024); delay(1000); analogWrite(A1, 0);
  analogWrite(A2, 1024); delay(1000); analogWrite(A2, 0);
  analogWrite(A0, 1024);
  delay(500);

  //Setting baud rate to communicate with ESP8266
  Dust_Serial.begin(9600); //Dust Sensor baud rate
  //Serial.begin(9600); //Serial baud rate
  wifi.begin(9600);   //Esp8266 module baud rate

  rx_empty(); //Empty the buffer or UART RX.

  initDustSensor(); //Initiate dust sensor to get the data.

  //Serial.print("setup begin\r\n");

//  if(set_baudrate(9600))
//  {
//    //Serial.println("Baudrate set ok");
//  }
//  else
//  {
//    //Serial.println("Baudrate set err");
//  }
  
  //Checking condition that restart function resond correctly or not.
  if (restart())
  {
    //Serial.println("Board Restart ok");
  }
  else
  {
    //Serial.println("Board Restart err");
  }

  delay(5000);
  wifi.println(F("AT+CIPSTAMAC?"));
  check(0, 5000);
  deviceID = "AirOwl_" + getMAC(Data);
  //Serial.println(deviceID);

  wifi.println(F("AT+CIPSTATUS"));
  check(0, 5000);
  if(getStatus(Data) == "2")
  { 
    flag = true;
  }

  if(!flag)
  {
    //Checking condition that operation mode is set to station and softap or not .
    if (setOprToStationSoftAP())
    {
      //Serial.print("to station + softap ok\r\n");
    } else {
      //Serial.print("to station + softap err\r\n");
    }
  
    //Checking condition that static ip is correctly set to 192.168.12.1 or not.
    if (setAPIp("192.168.12.1")) {
      //Serial.println("set ap's ip is ok");
    }
    else
    {
      //Serial.println("set ap's is is error");
    }
  
    //Set SoftAP parameters.
    if (setSoftAPParam(deviceID.c_str(), "12345678")) {
      //Serial.println("AP is set");
    }
    else
    {
      //Serial.println("AP not set");
    }
  
    //Get local IP address of ESP8266 wifi module.
    //Serial.println(getLocalIP());
  
    //Checking condition that multiple connection is set correctly or not.
    if (enableMUX()) {
      //Serial.print("multiple ok\r\n");
    } else {
      //Serial.print("multiple err\r\n");
    }
  
    //Checking condition that starting TCP server connection with port 8090 is correctly or not.
    if (startTCPServer(8090)) {
      //Serial.print("start tcp server ok\r\n");
    } else {
      //Serial.print("start tcp server err\r\n");
    }
  
    //Checking condition that the timeout of TCP Server is set 10 correctly or not.
    if (setTCPServerTimeout(10)) {
      //Serial.print("set tcp server timout 10 seconds\r\n");
    } else {
      //Serial.print("set tcp server timout err\r\n");
    }
  }
  //Serial.print("setup end\r\n");
  lastPublishMillis = millis();
}

void loop(void)
{ 
  while(!flag)
    checkAP();

  //Serial.println("Get data from Dust");

  Winsen_dust(); //

  if (millis() - lastPublishMillis > publishInterval) 
  {
    delay(2000);
    /////////////////////// WiFi////////////////////
    if (Send_Data_SIM_OZ() == 1)
    {
      //Serial.println("SEND DATA DONE:");
      analogWrite(A0, LOW);
      analogWrite(A1, LOW);
      analogWrite(A2, LOW); 
      delay(1000);
      LED_blink(); // Blinking LED's of Airowl eyes.
      PM1 = 0; PM25 = 0; PM10 = 0; count = 0;
    }
    else
    {
      //Serial.println("SEND DATA FAILED:");
    }
    lastPublishMillis = millis();
  }
  
}

bool checkAP()
{
    uint8_t buffer[75] = {0};
    uint8_t mux_id;
    uint32_t len = recv(&mux_id, buffer, sizeof(buffer), 100);// Receive data from all of TCP already builded connection in multiple mode.
    
    if (len > 0) {
        
      rx_empty();
      wifi.print(F("AT+CIPSEND="));
      wifi.print(mux_id);
      wifi.print(F(","));
      wifi.println(2);
      if (check(0, 5000)) {
        rx_empty();
        wifi.println("ok");
        if (check(0, 10000))
        {
          //Serial.println("Send back ok");
        }
      }
      else
      {
        //Serial.println("Could not sent response");
      }

      Data = "";
      //Store data data character by character in the data string .
      for (uint32_t i = 0; i < len; i++) {
        Data += (char)buffer[i];
      }
      
      //Serial.print("Received from :");
      //Serial.print(mux_id);
      //Serial.print("[");
      //Serial.print(Data);
      //Serial.print("]\r\n");
      //Serial.print("I am printing data : ");
      
      // Fteching wanted substring from received data
      int first = Data.indexOf('='); //Index number of first "=" in the data string
      int firstend = Data.indexOf('&');//Index number of first "&" in the data string
      int lastend = Data.indexOf(' ', firstend); //Index number of first space in the data string
      
      Data.substring(first + 1, firstend).toCharArray(ssid, 15); //Fetching  substring between "=" and "&" from the data string
      delay(200);
      Data.substring(firstend + 5 , lastend).toCharArray(pass, 15);
      
      //Serial.println(ssid);
      //Serial.println(pass);

      //Checking condiotion that TCP connection is released or not in multiple mode.
      if (releaseTCP(mux_id)) {
          //Serial.print("release tcp ");
          //Serial.print(mux_id);
          //Serial.println(" ok");
        } else {
          //Serial.print("release tcp");
          //Serial.print(mux_id);
          //Serial.println(" err");
        }
      
      if (strlen(ssid) > 0 && strlen(pass) > 0)
      {

        //Checking condiotion that TCP connection is stoped or not in multiple mode.
        if (stopTCPServer())
        {
          //Serial.println("TCP Server stop ok");
        }
        else
        {
          //Serial.println("TCP Server stop err");
        }

        //Checking condition that only one TCP connection is built or not.
        delay(2000);
        if (disableMUX())
        {
          //Serial.println("mux disable ok");
        }
        else
        {
          //Serial.println("Mux disable err");
        }

        delay(2000);
        for (int i = 0; i < 3; i++)
        {
         
          rx_empty();
          wifi.print(F("AT+CWJAP_DEF=\""));
          wifi.print(ssid);
          wifi.print(F("\",\""));
          wifi.print(pass);
          wifi.println(F("\""));
          
          if (check(0, 10000)) {
            //Serial.print("Join AP success\r\n");
            //Serial.print("IP: ");
            //Serial.println(getLocalIP());
            return 1;
          }
          else
          {
            return 0;
            //Serial.print("Join AP failure\r\n");
          }
        }
      }
      else
      {
        return 0;
      }
    }
    else
    {
      return 0;
    }
}


//Send_Data_SIM_OZ Method is firstly make TCP connection to the server and then send the server.
bool Send_Data_SIM_OZ()
{
  //Serial.println("Searching For Server");

  command = "GET /v1/data?deviceId=" + deviceID + "&type=AIROWL&key=hetvi_1234&pm1="+ String(int(PM1/count)) + "&pm25="+ String(int(PM25/count)) + "&pm10="+ String(int(PM10/count)) + " HTTP/1.1";

  //Serial.println(command);
  rx_empty();
  wifi.println("AT+CIPSTART=\"TCP\",\"oedpdev.eu-gb.mybluemix.net\",80");
  
  if (check(0, 10000) || Data.indexOf("CONNECT") != -1)
  {
    //Serial.println("create tcp ok\r\n");
    int len = command.length() + strlen(HOST_NAME) + 6;

    rx_empty();
    wifi.print(F("AT+CIPSEND="));
    wifi.println(len);
    
    if(check(1, 5000)) {
      
      rx_empty();
      wifi.println(command);
      wifi.println(HOST_NAME);
      wifi.println("");
      
      if(check(0, 1000))
      {
        rx_empty();
        //Serial.println("Data Sent");
        uint8_t buffer[50] = {0};

        //Receive data from TCP  builded connection in single mode
        uint32_t len = recv(buffer, sizeof(buffer), 10000);
        if (len > 0) {
          //Serial.print("Received:[");
          for (uint32_t i = 0; i < len; i++) {
            //Serial.print((char)buffer[i]);
          }
          //Serial.print("]\r\n");
        }
        else
        {
          //Serial.println("Send data err");
        }
      }
      
      rx_empty();
      wifi.println(F("AT+CIPCLOSE"));
      
      if(check(0, 5000))
      {
        //Serial.print("release tcp ok\r\n");
      } else {
        //Serial.print("release tcp err\r\n");
      }
    }
    else
    {
      //Serial.println("> cant find");
    }
    return 1;
  }
  else
  {
    wifi.println(F("AT+CIPCLOSE"));
    //Serial.println("Create TCP err");
    return 0;
  }
}

bool check(int v, uint32_t timeout)
{
  unsigned long start = millis();
  char a;
  Data = "";
  
  while (millis() - start < timeout) {
    while (wifi.available() > 0) {
      a = wifi.read();
      if (a == '\0') continue;
      Data += a;
    }
    if(Data.indexOf("OK") != -1 && v == 0)
    {
      return 1;
    }
    if(Data.indexOf(">") != -1 && v == 1)
    {
      return 1;
    }
    if(Data.indexOf("\r\r\n") != -1 && v == 2)
    {
      return 1;
    }
  }
  return 0;
}

/* Get Mac Address */
String getMAC(String Data)
{
  int first= Data.indexOf('"');
  int firstend = Data.indexOf('"', first + 1);
  return(Data.substring(first+1 ,firstend));
}

/* Get wifi connection Status */
String getStatus(String Data)
{
  String first= Data.substring(Data.indexOf(':'));
  return(first.substring(1,2));
}

/* Set Baudrate */
bool set_baudrate(int baudrate)
{
  rx_empty();
  
  wifi.print(F("AT+UART_DEF="));
  wifi.print(baudrate);
  wifi.print(F(","));
  wifi.print(8);
  wifi.print(F(","));
  wifi.print(1);
  wifi.print(F(","));
  wifi.print(0);
  wifi.print(F(","));
  wifi.println(0);
  
  if(check(0,5000)){
    
    // Set new baudrate
    wifi.begin(baudrate);
    return true;
  }
  else{
    return false;
  }
}

/*setOprToStationSoftAP:-

  Method :-qATCWMODE(mode)& sATCWMODE(mode)
  Set operation mode to station and as well as  to the softap

  @retval true - success.
  @retval false - failure.
*/
bool setOprToStationSoftAP(void)
{
  uint8_t mode;
  if (!qATCWMODE(&mode)) {
    return false;
  }
  if (mode == 3) {
    return true;
  } else {
    if (sATCWMODE(3) ) {
      return true;
    } else {
      return false;
    }
  }
}
bool qATCWMODE(uint8_t *mode)
{
  String str_mode;
  bool ret;
  rx_empty();
  wifi.println(F("AT+CWMODE?"));
  ret = recvFindAndFilter("OK", ":", "\r\n\r\nOK", str_mode, 1000);
  if (ret) {
    *mode = (uint8_t)str_mode.toInt();
    return true;
  } else {
    return false;
  }
}

bool sATCWMODE(uint8_t mode)
{
  rx_empty();
  wifi.print(F("AT+CWMODE="));
  wifi.println(mode);
  
  if (check(0, 1000)) {
    return true;
  }
  return false;
}

/*recvFindAndFilter:-
  /*
  Recvive data from uart and search first target and cut out the substring between begin and end(excluding begin and end self).
  @retval true -if target found .
  @retval false -timeout .
*/
bool recvFindAndFilter(String target, String beg, String en, String &data, uint32_t timeout)
{
  String data_tmp;
  data_tmp = recvString(target, timeout);
  if (data_tmp.indexOf(target) != -1) {
    int32_t index1 = data_tmp.indexOf(beg);
    int32_t index2 = data_tmp.indexOf(en);
    if (index1 != -1 && index2 != -1) {
      index1 += beg.length();
      data = data_tmp.substring(index1, index2);
      return true;
    }
  }
  data = data_tmp;
  return false;
}

/*setAPIp:-
  Set the AP IP.
  Method:-eATCIPAP(ip).
  @param default "AT+CIPAP=" command.
  @param ip - the ip of AP.
  @retval true - success.
  @retval false - failure.
*/
bool setAPIp(String ip)
{
  return eATCIPAP(ip);
}
bool eATCIPAP(String ip)
{
  rx_empty();
  wifi.print(F("AT+CIPAP="));
  wifi.print(F("\""));
  wifi.print(ip);
  wifi.println(F("\""));
  return check(0, 1000);

}

/*setSoftAPParam:-
  Set SoftAP parameters.

  Method:-sATCWSAP(ssid,pass).
  @param default "AT+CWSAP=".
  @param ssid - SSID of SoftAP.
  @param pwd - PASSWORD of SoftAP.
  @retval true - success.
  @retval false - failure.
*/
bool setSoftAPParam(String ssid, String pwd)
{
  return sATCWSAP(ssid, pwd);
}
bool sATCWSAP(String ssid, String pwd)
{
  rx_empty();
  wifi.print(F("AT+CWSAP=\""));
  wifi.print(ssid);
  wifi.print(F("\",\""));
  wifi.print(pwd);
  wifi.print(F("\","));
  wifi.print(5);
  wifi.print(F(","));
  wifi.println(3);
  
  if (check(0, 5000)) {
    return true;
  }
  return false;
}

/*getLocalIP:-
  Get the IP address of ESP8266 wifi module.

  @return the IP list.
*/
String getLocalIP(void)
{
  String list;
  eATCIFSR(list);
  return list;
}
/*eATCIFSR:-
  Get the IP address using AT+CIFSR
  @param list
  @retval true - success.
  @retval false - failure.
*/
bool eATCIFSR(String &list)
{
  rx_empty();
  wifi.println("AT+CIFSR");
  return recvFindAndFilter("OK", "\r\r\n", "\r\n\r\nOK", list, 10000);
}

/*enableMUX:-
  Enable IP MUX(multiple connection mode).

  In multiple connection mode, a couple of TCP and UDP communication can be builded.
  They can be distinguished by the identifier of TCP or UDP named mux_id.

  @retval true - success.
  @retval false - failure.
*/
bool enableMUX(void)
{
  return sATCIPMUX(1);
}

/*disableMUX:-
  Disable IP MUX(single connection mode).

  In single connection mode, only one TCP or UDP communication can be builded.

  @retval true - success.
  @retval false - failure.
*/
bool disableMUX(void)
{
  return sATCIPMUX(0);
}


/*sATCIPMUX:-
  Enable/Disable IP MUX(single connection mode) using AT+CIPMUX

  AT+ CIPMUX=0 - single connection
  AT+ CIPMUX=1 - Multiple connections

  @retval true - success.
  @retval false - failure.
*/
bool sATCIPMUX(uint8_t mode)
{
  rx_empty();
  wifi.print(F("AT+CIPMUX="));
  wifi.println(mode);

  if (check(2, 1000)) {
    return true;
  }
  return false;
}

/*startTCPServer:-
  Start TCP Server(Only in multiple mode).

  @param port - the port number to listen(default: 333).
  @retval true - success.
  @retval false - failure.
*/
bool startTCPServer(uint32_t port)
{
  rx_empty();
  wifi.print(F("AT+CIPSERVER=1,"));
  wifi.println(port);
  
  if ( check(0, 1000) || Data.indexOf("no change") != -1) {
    return true;
  }
  else
  {
    return false;
  }

}

/*stopTCPServer:-
  Stop TCP Server(Only in multiple mode).

  @retval true - success.
  @retval false - failure.
*/
bool stopTCPServer(void)
{
  return sATCIPSERVER(0, 8090);
}

/*sATCIPSERVER:-
  Stop TCP Server(Only in multiple mode) using  AT+ CIPSERVER= <mode>[,<port>] command
  Set server - mode 1
  close server  - mode 0
  @retval true - success.
  @retval false - failure.
*/
bool sATCIPSERVER(uint8_t mode, uint32_t port)
{
  
  if (mode) {
    rx_empty();
    wifi.print(F("AT+CIPSERVER=1,"));
    wifi.println(port);

    if (check(0, 1000) || Data.indexOf("no change") != -1) {
      return true;
    }
    return false;
  }
  else {
    rx_empty();
    wifi.println(F("AT+CIPSERVER=0"));
    return check(0, 1000);
  }
}



/*setTCPServerTimeout:-
  Set the timeout of TCP Server.

  Method :-sATCIPSTO(timeout).
  @param timeout -(0 ~ 28800 seconds, default:180).
  @retval true - success.
  @retval false - failure.
*/
bool setTCPServerTimeout(uint32_t timeout)
{
  rx_empty();
  wifi.print(F("AT+CIPSTO="));
  wifi.println(timeout);
  return check(0, 1000);
}

/*recv:-
  Receive data from TCP or UDP builded already in single mode.

  @param buffer - the buffer for storing data.
  @param buffer_size - the length of the buffer.
  @param timeout - the time waiting data.
  @return  - length of data received.
*/
uint32_t recv(uint8_t *buffer, uint32_t buffer_size, uint32_t timeout)
{
  return recvPkg(buffer, buffer_size, NULL, timeout, NULL);
}

uint32_t recv(uint8_t *coming_mux_id, uint8_t *buffer, uint32_t buffer_size, uint32_t timeout)
{
  return recvPkg(buffer, buffer_size, NULL, timeout, coming_mux_id);
}

/*recvPkg:-
  Receive a package from uart.

  @param buffer - the buffer storing data.
  @param buffer_size - guess what!
  @param data_len - the length of data actually received(maybe more than buffer_size, the remained data will be abandoned).
  @param timeout - the duration waitting data comming.
  @param coming_mux_id - in single connection mode, should be NULL and not NULL in multiple.
*/
uint32_t recvPkg(uint8_t *buffer, uint32_t buffer_size, uint32_t *data_len, uint32_t timeout, uint8_t *coming_mux_id)
{
  String data;
  char a;
  int32_t index_PIPDcomma = -1;
  int32_t index_colon = -1; /* : */
  int32_t index_comma = -1; /* , */
  int32_t len = -1;
  int8_t id = -1;
  bool has_data = false;
  uint32_t ret;
  unsigned long start;
  uint32_t i;

  if (buffer == NULL) {
    return 0;
  }

  start = millis();
  while (millis() - start < timeout) {
    if (wifi.available() > 0) {
      a = wifi.read();
      data += a;
    }

    index_PIPDcomma = data.indexOf("+IPD,");
    if (index_PIPDcomma != -1) {
      index_colon = data.indexOf(':', index_PIPDcomma + 5);
      if (index_colon != -1) {
        index_comma = data.indexOf(',', index_PIPDcomma + 5);
        /* +IPD,id,len:data */
        if (index_comma != -1 && index_comma < index_colon) {
          id = data.substring(index_PIPDcomma + 5, index_comma).toInt();
          if (id < 0 || id > 4) {
            return 0;
          }
          len = data.substring(index_comma + 1, index_colon).toInt();
          if (len <= 0) {
            return 0;
          }
        } else { /* +IPD,len:data */
          len = data.substring(index_PIPDcomma + 5, index_colon).toInt();
          if (len <= 0) {
            return 0;
          }
        }
        has_data = true;
        break;
      }
    }
  }

  if (has_data) {
    i = 0;
    ret = len > buffer_size ? buffer_size : len;
    start = millis();
    while (millis() - start < 3000) {
      while (wifi.available() > 0 && i < ret) {
        a = wifi.read();
        buffer[i++] = a;
      }
      if (i == ret) {
        rx_empty();
        if (data_len) {
          *data_len = len;
        }
        if (index_comma != -1 && coming_mux_id) {
          *coming_mux_id = id;
        }
        return ret;
      }
    }
  }
  return 0;
}

/*releaseTCP:-
  Release TCP connection in multiple mode.

  Method :-sATCIPCLOSEMulitple(mux_id).
  @param mux_id - the identifier of this TCP(available value: 0 - 4).
  @retval true - success.
  @retval false - failure.
*/
bool releaseTCP(uint8_t mux_id)
{
  rx_empty();
  wifi.print(F("AT+CIPCLOSE="));
  wifi.println(mux_id);

  if (check(2, 5000) || Data.indexOf("link is not") != -1) {
    return true;
  }
  return false;
}

/*rx_empty:-
  Empty the buffer or UART RX.
*/
void rx_empty(void)
{
  wifi.listen();
  while (wifi.available() > 0) {
    wifi.read();
  }
}


/* recvString:-
  Recvive data from uart. Return all received data if target found or timeout.
*/
String recvString(String target, uint32_t timeout)
{
  String data;
  char a;
  unsigned long start = millis();
  while (millis() - start < timeout) {
    while (wifi.available() > 0) {
      a = wifi.read();
      if (a == '\0') continue;
      data += a;
    }
    if (data.indexOf(target) != -1) {
      break;
    }
  }
  return data;
}

/*restart:-
  Restart ESP8266 by "AT+RST".
  Method:-eATRST(void)

  @retval true - success.
  @retval false - failure.
*/
bool restart(void)
{
  unsigned long start;
  if (eATRST()) {
    delay(2000);
    start = millis();
    while (millis() - start < 3000) {
      if (eAT()) {
        delay(1500); /* Waiting for stable */
        return true;
      }
      delay(100);
    }
  }
  return false;
}
bool eATRST(void)
{
  rx_empty();
  wifi.println(F("AT+RST"));
  return check(0, 10000);
}

/*eAT:-
  AT command:-ATtention, used to start a command line.

  @retval true - success.
  @retval false - failure.
*/
bool eAT(void)
{
  rx_empty();
  wifi.println(F("AT"));
  return check(0, 10000);
}


/* initDustSensor
  Initiate dust sensor to get the data.
*/
void initDustSensor()
{
  const unsigned char cmd_get_sensor[] =
  {
    0xff, 0x01, 0x78, 0x40, 0x00,
    0x00, 0x00, 0x00, 0x47
  };

  // Send cmd to get data
  for (int i = 0; i < sizeof(cmd_get_sensor); i++)
  {
    Dust_Serial.write(cmd_get_sensor[i]);
  }
  delay(10);
}
/* Winsen_dust
  Calculate dust pm0.3 pm2.5 pm10 value
*/
void Winsen_dust()
{
  byte data[24];
  Dust_Serial.listen();

  int i = 0;
  while (!Dust_Serial.available());
  while (Dust_Serial.available())
  {
    data[i] = Dust_Serial.read();

    if (i == 23)
    {
      Dust_Serial.println();
      PM1 += ((data[4] * 256) + data[5]);
      PM25 += ((data[6] * 256) + data[7]);
      PM10 += ((data[8] * 256) + data[9]);
      count++;
      //Serial.print("PM 1.0 :");
      //Serial.println(PM1/count);
      //Serial.print("PM 2.5 :");
      //Serial.println(PM25/count);
      //Serial.print("PM 10 :");
      //Serial.println(PM10/count);
      //Serial.println("");
    }
    i++;
    delay(10) ;
  }
  
  //Serial.println("Calculation done");
}

void LED_blink()
{

  if ( PM1 > Range1_max || PM25 > Range25_max || PM10 > Range10_max )
  {
    analogWrite(A0, 0);
    analogWrite(A1, 1024);
    analogWrite(A2, 0);
  }
  else if ( PM1 > Range1_min || PM25 > Range25_min || PM10 > Range10_min )
  {
    analogWrite(A0, 0);
    analogWrite(A1, 128);
    analogWrite(A2, 1024);
  }
  else
  {
    analogWrite(A0, 0);
    analogWrite(A1, 0);
    analogWrite(A2, 1024);
  }

}
