//Including libraries
#include <SoftwareSerial.h> //Include software serial library, ESP8266 library dependency
#include <String.h> //Include string library which have all string handling functions 

//Define parameters
#define DEVICE_ID   "3"
#define HOST_NAME   "oedpdev.eu-gb.mybluemix.net"
#define HOST_PORT   80

//Software serial interface to connect  ESP8266 wifi module and dust sensor using Rx and Tx pin
SoftwareSerial wifi(7, 8); //(RX, TX)
SoftwareSerial Dust_Serial(2, 3); //(RX, TX)

//Initialization
int PM1 = 0, PM25 = 0, PM10 = 0;
bool flag = false;
bool cond = false;

String Data = "";
//char ssid[15] = {0};
//char pass[15] = {0};
String ssid    = "";
String pass = "";

void setup(void)
{
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  pinMode(A2, OUTPUT);

  //LED initiation
  digitalWrite(A0, HIGH); delay(1000); digitalWrite(A0, LOW);
  digitalWrite(A1, HIGH); delay(1000); digitalWrite(A1, LOW);
  digitalWrite(A2, HIGH); delay(1000); digitalWrite(A2, LOW);
  delay(500);

  //Setting baud rate to communicate with ESP8266
  Dust_Serial.begin(9600); //Dust Sensor baud rate
  Serial.begin(9600); //Serial baud rate
  wifi.begin(9600);   //Esp8266 module baud rate

  rx_empty(); //Empty the buffer or UART RX.

  initDustSensor(); //Initiate dust sensor to get the data.

  Serial.print("setup begin\r\n");

  
  //Checking condition that restart function resond correctly or not.
  if (restart())
  {
    Serial.println(Data);
    Serial.println("Board Restart ok");
  }
  else
  {
    Serial.println("Board Restart err");
  }

  delay(5000);

  //Checking condition that operation mode is set to station and softap or not .
  if (setOprToStationSoftAP())
  {
    Serial.print("to station + softap ok\r\n");
  } else {
    Serial.print("to station + softap err\r\n");
  }

  //Checking condition that static ip is correctly set to 192.168.12.1 or not.
  if (setAPIp("192.168.12.1")) {
    Serial.println("set ap's ip is ok");
  }
  else
  {
    Serial.println("set ap's is is error");
  }

  //Set SoftAP parameters.
  if (setSoftAPParam("AirOwl", "12345678")) {
    Serial.println("AP is set");
  }
  else
  {
    Serial.println("AP not set");
  }

  //Checking condition that multiple connection is set correctly or not.
  if (enableMUX()) {
    Serial.print("multiple ok\r\n");
  } else {
    Serial.print("multiple err\r\n");
  }

  //Checking condition that starting TCP server connection with port 8090 is correctly or not.
  if (startTCPServer(8090)) {
    Serial.print("start tcp server ok\r\n");
  } else {
    Serial.print("start tcp server err\r\n");
  }

  //Checking condition that the timeout of TCP Server is set 10 correctly or not.
  if (setTCPServerTimeout(10)) {
    Serial.print("set tcp server timout 10 seconds\r\n");
  } else {
    Serial.print("set tcp server timout err\r\n");
  }

  Serial.print("setup end\r\n");
}

void loop(void)
{ 
  while(!flag)
    checkAP();
    
  Serial.println("Get data from Dust");

  Winsen_dust(); //

  LED_blink(); // Blinking LED's of Airowl eyes.


  delay(2000);
  /////////////////////// WiFi////////////////////
  if (Send_Data_SIM_OZ() == 1)
  {
    Serial.println("SEND DATA DONE:");
  }
  else
  {
    Serial.println("SEND DATA FAILED:");
  }
}

bool checkAP()
{
    uint8_t mux_id;        
    rx_empty();
      

    Data = "";
    uint8_t buffer[128] = {0};
    uint32_t len = recv(&mux_id, buffer, sizeof(buffer), 100);
    if (len > 0) {
        
        Serial.print("Received from :");
        Serial.print(mux_id);
        Serial.print("[");
        //Store data data character by character in the data string .
        for(uint32_t i = 0; i < len; i++) {
            Serial.print((char)buffer[i]);
            Data += (char)buffer[i]; 
        }
        Serial.print("]\r\n");        
        ReadData();
      
    //Checking condiotion that TCP connection is released or not in multiple mode.
    if (releaseTCP(mux_id)) {
        Serial.print("release tcp ");
        Serial.print(mux_id);
        Serial.println(" ok");
      } else {
        Serial.print("release tcp");
        Serial.print(mux_id);
        Serial.println(" err");
      }
      
      if (ssid!="" && pass!="")
      {

        //Checking condiotion that TCP connection is stoped or not in multiple mode.
        if (stopTCPServer())
        {
          Serial.println("TCP Server stop ok");
        }
        else
        {
          Serial.println("TCP Server stop err");
        }

        //Checking condition that only one TCP connection is built or not.
        delay(2000);
        if (disableMUX())
        {
          Serial.println("mux disable ok");
        }
        else
        {
          Serial.println("Mux disable err");
        }

        for (int i = 0; i < 3; i++)
        {
         
          rx_empty();
          wifi.print(F("AT+CWJAP=\""));
          wifi.print(ssid);
          wifi.print(F("\",\""));
          wifi.print(pass);
          wifi.println(F("\""));
          delay(2000);
          if (check(0, 10000)) {
            Serial.print("Join AP success\r\n");
            flag = true;
            return 1;
          }
          else
          {
            Serial.print("Join AP failure\r\n");
          }
       }
      }
      else
      {
        return 0;
        Serial.println("Fail");
      }
    }
   return 0;
}


//Send_Data_SIM_OZ Method is firstly make TCP connection to the server and then send the server.
bool Send_Data_SIM_OZ()
{
  Serial.println("Searching For Server");
  rx_empty();
  wifi.println("AT+CIPSTART=\"TCP\",\"oedpdev.eu-gb.mybluemix.net\",80");
  
  if (check(0, 20000) || Data.indexOf("CONNECT") != -1)
  {
    Serial.println("create tcp ok\r\n");
    int len = 130;

    rx_empty();
    wifi.print(F("AT+CIPSEND="));
    wifi.println(len);
    
    if(check(1, 5000)) {
      
      rx_empty();
     
      String address = "GET /v1/data?deviceId=AIROWL_002&type=AIROWL&key=hetvi_1234&pm1="+ String(PM1) + "&pm25="+ String(PM25) + "&pm10="+ String(PM10);
      Serial.println(address);
      wifi.println(address);
      wifi.println("Host: oedpdev.eu-gb.mybluemix.net");
      wifi.println("");
      
      if(check(0, 1000))
      {
        rx_empty();
        Serial.println("Data Sent");
        uint8_t buffer[50] = {0};

        //Receive data from TCP  builded connection in single mode
        uint32_t len = recv(buffer, sizeof(buffer), 10000);
        if (len > 0) {
        Serial.print("Received:[");
        for (uint32_t i = 0; i < len; i++) {
          Serial.print((char)buffer[i]);
        }
        Serial.print("]\r\n");
        }
        else
        {
          Serial.println("Send data err");
        }
      }
      
      rx_empty();
      wifi.println(F("AT+CIPCLOSE"));
      
      if(check(0, 5000))
      {
        Serial.print("release tcp ok\r\n");
      } else {
        Serial.print("release tcp err\r\n");
      }
    }
    else
    {
      rx_empty();
      wifi.println(F("AT+CIPCLOSE"));
      
      if(check(0, 5000))
      {
        Serial.print("release tcp ok\r\n");
      } else {
        Serial.print("release tcp err\r\n");
      }
      Serial.println("> cant find");
    }
    return 1;
  }
  else
  {
    wifi.println(F("AT+CIPCLOSE"));
    Serial.println("Create TCP err");
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
      //Serial.println(Data);
      return 1;
    }
    if(Data.indexOf(">") != -1 && v == 1)
    {
      //Serial.println(Data);
      return 1;
    }
    if(Data.indexOf("\r\r\n") != -1 && v == 2)
    {
      //Serial.println(Data);
      return 1;
    }
  }
  //Serial.println(Data);
  return 0;
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
  @param pwd - pass of SoftAP.
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
  wifi.print(3);
  wifi.print(F(","));
  wifi.println(0);
  
  if (check(0, 5000)) {
    return true;
  }
  return false;
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

void ReadData()
{
  int first= Data.indexOf('=');
  int firstend = Data.indexOf('&');
  int second = Data.indexOf('=', first + 1 );
  int lastend= Data.indexOf(' ',second);
  
  ssid = Data.substring(first+1,firstend);
  pass = Data.substring(second+1 ,lastend);
   if (ssid!="" && pass!="")
    {
        Serial.println("*******************************************");
        Serial.println("The SSID " + ssid );
        Serial.println("The pass " + pass );
        Serial.println("*******************************************");
    }
    else
    {
      Serial.println("Kuch nhi aya");
    }
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
      PM1 = ((data[4] * 256) + data[5]);
      PM25 = ((data[6] * 256) + data[7]);
      PM10 = ((data[8] * 256) + data[9]);
      Serial.print("PM 1.0 :");
      Serial.println(PM1);
      Serial.print("PM 2.5 :");
      Serial.println(PM25);
      Serial.print("PM 10 :");
      Serial.println(PM10);
      Serial.println("");
    }
    i++;
    delay(10) ;
  }
  Serial.println("Calculation done");
}

void LED_blink()
{
  //Ranges
  const int Range10_max = 120; const int Range10_min = 60;
  const int Range25_max = 350; const int Range25_min = 100;
  const int Range3_max = 1200; const int Range3_min = 951;

  if ( PM10 > Range10_max || PM25 > Range25_max || PM10 > Range3_max )
  {
    digitalWrite(A0, LOW);
    digitalWrite(A1, HIGH);
    digitalWrite(A2, LOW);
  }
  else if ( PM10 > Range10_min || PM25 > Range25_min || PM10 > Range3_min )
  {
    digitalWrite(A0, HIGH);
    digitalWrite(A1, LOW);
    digitalWrite(A2, LOW);
  }
  else
  {
    digitalWrite(A0, LOW);
    digitalWrite(A1, LOW);
    digitalWrite(A2, HIGH);
  }

}

