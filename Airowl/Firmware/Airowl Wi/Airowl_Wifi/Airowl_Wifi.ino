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

//Ranges
const int Range10_max = 120; const int Range10_min= 60;
const int Range25_max = 350; const int Range25_min= 100;
const int Range3_max = 1200; const int Range3_min= 951;

// Send server credentials
char oz_action[] = "GET ";  // Edit to build your comp - "GET ", "POST ", "HEAD ", "OPTIONS " - note trailing space

//Initialization 
int PM1=0, PM25=0, PM10=0;  
bool flag = false;
bool cond = false;

//Ranges
const int Range10_max = 120; const int Range10_min= 60;
const int Range25_max = 350; const int Range25_min= 100;
const int Range3_max = 1200; const int Range3_min= 951;

void setup(void)
{
      //LED initiation
    digitalWrite(A0, HIGH); delay(1000); digitalWrite(A0, LOW);
    digitalWrite(A1, HIGH); delay(1000); digitalWrite(A1, LOW);
    digitalWrite(A2, HIGH); delay(1000); digitalWrite(A2, LOW);
    delay(500);
      
    //Setting baud rate to communicate with ESP8266 
    Dust_Serial.begin(9600); //Dust Sensor baud rate 
    Serial.begin(9600); //Serial baud rate 
    wifi.begin(9600);   //Esp8266 module baud rate     
<<<<<<< HEAD
=======
    Dust_Serial.begin(9600); //Dust Sensor baud rate 

    LED_blink();

    pinMode(A0, OUTPUT);
    pinMode(A1, OUTPUT);
    pinMode(A2, OUTPUT);
    
>>>>>>> origin/master
    rx_empty(); //Empty the buffer or UART RX.

    initDustSensor(); //Initiate dust sensor to get the data. 
    
    Serial.print("setup begin\r\n"); 

    //Checking condition that restart function resond correctly or not.
    if(restart()) 
    {
       Serial.println("Board Restart ok");  
    }
    else
    {
        Serial.println("Board Restart err");  
    }
    
    delay(5000);

    //Checking condition that baud rate is set 9600 or not.
    if(eATSETUART(9600)) 
     {
      Serial.print("Baudrate done\r\n");
     }       
    else {
      Serial.print("Error in settign baud rate");
    }

     //Checking condition that operation mode is set to station and softap or not . 
    if (setOprToStationSoftAP())
    {
        Serial.print("to station + softap ok\r\n");
    } else {
        Serial.print("to station + softap err\r\n");
    }

    //Checking condition that static ip is correctly set to 192.168.12.1 or not.
    if(setAPIp("192.168.12.1")){
     Serial.println("set ap's ip is ok");
   }
   else
   {
     Serial.println("set ap's is is error");
   }

    //Set SoftAP parameters.
    setSoftAPParam("AirOwl3","12345678");
    Serial.println("AP is set");   
    //Get local IP address of ESP8266 wifi module.
    Serial.println(getLocalIP());
    
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
       String SSID1, PASSWORD, Data;
       if(!flag)
       {
            uint8_t buffer[128] = {0};
            uint8_t res[2] = {'O','K'};
            uint8_t mux_id;
            uint32_t len = recv(mux_id, buffer, sizeof(buffer), 100);// Receive data from all of TCP already builded connection in multiple mode.
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
                Serial.print("I am printing data : ");
                Serial.println(Data);

                // Fteching wanted substring from received data
                int first= Data.indexOf('='); //Index number of first "=" in the data string 
                int firstend = Data.indexOf('&');//Index number of first "&" in the data string 
                int second = Data.indexOf('=', first + 1 );//Index number of second "=" in the data string 
                int lastend= Data.indexOf(' ',second);//Index number of first space in the data string 
                
                SSID1 = Data.substring(first+1,firstend); //Fetching  substring between "=" and "&" from the data string 
                PASSWORD = Data.substring(second+1 ,lastend);//Fetching  substring between second "=" and space from the data string 
                
                //Checking condiotion that send data to TCP already builded connection is done correctly  or not in multiple mode.
                if(send(mux_id, res, 2)) {
                    Serial.print("send back ok\r\n");
                } else {
                    Serial.print("send back err\r\n");
                }

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

                 //Checking condiotion that TCP connection is stoped or not in multiple mode.
                if(stopTCPServer())
                {
                  Serial.println("TCP Server stop ok");
                }
                else
                {
                  Serial.println("TCP Server stop err");
                }  

                //Checking condition that only one TCP connection is built or not.
                if(disableMUX())
                {
                    Serial.println("mux disable ok");  
                }
                else
                {
                    Serial.println("Mux disable err");  
                }
                flag = true;
            }
        }
        else if ( flag && !(cond))
        {
           delay(2000);
            
           for(int i = 0; i < 3; i++)
           {
             if(joinAP(SSID1, PASSWORD)) //Join in AP
             {
                Serial.print("Join AP success\r\n");
                Serial.print("IP: ");
                Serial.println(getLocalIP()); 
                break;   
             } 
             else 
             {
                Serial.print("Join AP failure\r\n");
             }
           }
                 
           cond = true; 
        }
     if(cond && flag) 
     {
      Serial.println("Get data from Dust");
      
      Winsen_dust(); //
<<<<<<< HEAD
      LED_on();
=======

      LED_blink(); // Blinking LED's of Airowl eyes.
>>>>>>> origin/master
      
      delay(2000);
      /////////////////////// WiFi////////////////////
       if(Send_Data_SIM_OZ() == 1)
       {
         Serial.println("SEND DATA DONE:");  
       }
       else
       {
         Serial.println("SEND DATA FAILED:");
       }
     }   
}
//Send_Data_SIM_OZ Method is firstly make TCP connection to the server and then send the server.
int Send_Data_SIM_OZ()
{
  uint8_t buffer[200] = {0};
    
   Serial.println("Searching For Server");
   //Checking condition that TCP connection is built correctly or not.
   if (createTCP(HOST_NAME, HOST_PORT))
   {   
      Serial.println("create tcp ok\r\n");
   }
   else
   {
     Serial.println("create tcp err\r\n");
   }
   // Get method to send data to the server. 
    const char *hello = "GET /test HTTP/1.1\r\nHost: oedpdev.eu-gb.mybluemix.net\r\nConnection: close\r\n\r\n";

   //Checking condition that data is send to server or not.
    if(send((const uint8_t*)hello, strlen(hello)))
    {
      Serial.println("Data Sent");  
    }
    else
    {
      Serial.println("Data don't sent");  
    }
    //Receive data from TCP  builded connection in single mode
    uint32_t len = recv(buffer, sizeof(buffer), 10000);
    if (len > 0) {
        Serial.print("Received:[");
        for(uint32_t i = 0; i < len; i++) {
            Serial.print((char)buffer[i]);
        }
        Serial.print("]\r\n");
    }
    //Checking condition that TCP connection is released correctly or not. 
    if (releaseTCP()) {
        Serial.print("release tcp ok\r\n");
    } else {
        Serial.print("release tcp err\r\n");
    }
    
 /********************************/
 /* Response Test */
 /********************************/
 String response = "";
 boolean Flag = 1;
   delay(500);
 return 1;
 
}
     
/*setOprToStationSoftAP:- 
* 
* Method :-qATCWMODE(mode)& sATCWMODE(mode)
* Set operation mode to station and as well as  to the softap  
*  
* @retval true - success. 
* @retval false - failure. 
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
        if (sATCWMODE(3) ){ 
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
    ret = recvFindAndFilter("OK", ":", "\r\n\r\nOK", str_mode,1000); 
    if (ret) {
        *mode = (uint8_t)str_mode.toInt();       
        return true;
    } else {
        return false;
    }
}

bool sATCWMODE(uint8_t mode)
{

    String data;
    rx_empty();
    wifi.print(F("AT+CWMODE="));
    wifi.println(mode);
    data = recvString("OK", "no change",1000);
    if (data.indexOf("OK") != -1 || data.indexOf("no change") != -1) {
        return true;
    }
    return false;
}

/*recvFindAndFilter:-
/* 
* Recvive data from uart and search first target and cut out the substring between begin and end(excluding begin and end self). 
* @retval true -if target found . 
* @retval false -timeout . 
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
* Set the AP IP. 
* Method:-eATCIPAP(ip).
* @param default "AT+CIPAP=" command. 
* @param ip - the ip of AP. 
* @retval true - success.
* @retval false - failure.
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
  return recvFind("OK",1000);

}

/*setSoftAPParam:-
* Set SoftAP parameters. 
* 
* Method:-sATCWSAP(ssid,pass).
* @param default "AT+CWSAP=". 
* @param ssid - SSID of SoftAP. 
* @param pwd - PASSWORD of SoftAP.  
* @retval true - success.
* @retval false - failure. 
*/
bool setSoftAPParam(String ssid, String pwd)
{
    return sATCWSAP(ssid, pwd);
}
bool sATCWSAP(String ssid, String pwd)
{
    String data;
    rx_empty();
    wifi.print(F("AT+CWSAP=\""));
    wifi.print(ssid);
    wifi.print(F("\",\""));
    wifi.print(pwd);
    wifi.print(F("\",")); 
    data = recvString("OK", "ERROR", 5000);
    if (data.indexOf("OK") != -1) {
        return true;
    }
    return false;
}

/*getLocalIP:-
* Get the IP address of ESP8266 wifi module. 
*
* @return the IP list. 
*/
String getLocalIP(void)
{
    String list;
    eATCIFSR(list);
    return list;
}
/*eATCIFSR:-
* Get the IP address using AT+CIFSR 
* @param list 
* @retval true - success.
* @retval false - failure.  
*/
bool eATCIFSR(String &list)
{
    rx_empty();
    wifi.println("AT+CIFSR");
    return recvFindAndFilter("OK", "\r\r\n", "\r\n\r\nOK", list, 10000);
}

/*enableMUX:-
* Enable IP MUX(multiple connection mode). 
*
* In multiple connection mode, a couple of TCP and UDP communication can be builded. 
* They can be distinguished by the identifier of TCP or UDP named mux_id. 
* 
* @retval true - success.
* @retval false - failure.
*/
bool enableMUX(void)
{
    return sATCIPMUX(1);
}

/*disableMUX:-
* Disable IP MUX(single connection mode). 
*
* In single connection mode, only one TCP or UDP communication can be builded.  
* 
* @retval true - success.
* @retval false - failure.
*/
bool disableMUX(void)
{
    return sATCIPMUX(0);
}


/*sATCIPMUX:-
* Enable/Disable IP MUX(single connection mode) using AT+CIPMUX
*
* AT+ CIPMUX=0 - single connection 
* AT+ CIPMUX=1 - Multiple connections
* 
* @retval true - success.
* @retval false - failure.
*/
bool sATCIPMUX(uint8_t mode)
{
    String data;
    rx_empty();
    wifi.print(F("AT+CIPMUX="));
    wifi.println(mode);
    
    data = recvString("OK", "Link is builded",1000);
    if (data.indexOf("OK") != -1) {
        return true;
    }
    return false;
}

/*startTCPServer:-
* Start TCP Server(Only in multiple mode). 
* 
* @param port - the port number to listen(default: 333).
* @retval true - success.
* @retval false - failure.
*/
bool startTCPServer(uint32_t port)
{
    if (sATCIPSERVER(1, port)) {
        return true;
    }
    return false;
}

/*stopTCPServer:-
* Stop TCP Server(Only in multiple mode). 
* 
* @retval true - success.
* @retval false - failure.
*/
bool stopTCPServer(void)
{
    sATCIPSERVER(0, 333);
    //restart();
    return false;
}

/*sATCIPSERVER:-
* Stop TCP Server(Only in multiple mode) using  AT+ CIPSERVER= <mode>[,<port>] command 
* Set server - mode 1
* close server  - mode 0  
* @retval true - success.
* @retval false - failure.
*/
bool sATCIPSERVER(uint8_t mode, uint32_t port)
{
    String data;
    if (mode) {
        rx_empty();
        wifi.print(F("AT+CIPSERVER=1,"));
        wifi.println(port);
        
        data = recvString("OK", "no change",1000);
        if (data.indexOf("OK") != -1 || data.indexOf("no change") != -1) {
            return true;
        }
        return false;
        } else {
        rx_empty();
        wifi.println(F("AT+CIPSERVER=0"));
        return recvFind("\r\r\n",1000);
    }
}



/*setTCPServerTimeout:-
* Set the timeout of TCP Server. 
* 
* Method :-sATCIPSTO(timeout).
* @param timeout -(0 ~ 28800 seconds, default:180). 
* @retval true - success.
* @retval false - failure.
*/
bool setTCPServerTimeout(uint32_t timeout)
{
    return sATCIPSTO(timeout);
}

bool sATCIPSTO(uint32_t timeout)
{
    rx_empty();
    wifi.print(F("AT+CIPSTO="));
    wifi.println(timeout);
    return recvFind("OK",1000);
}

/*recv:-
* Receive data from TCP or UDP builded already in single mode. 
*
* @param buffer - the buffer for storing data. 
* @param buffer_size - the length of the buffer. 
* @param timeout - the time waiting data. 
* @return  - length of data received. 
*/
uint32_t recv(uint8_t *buffer, uint32_t buffer_size, uint32_t timeout)
{
    return recvPkg(buffer, buffer_size, NULL, timeout, NULL);
}

/*recv:-
* Receive data from one of TCP or UDP builded already in multiple mode. 
*
* @param mux_id - the identifier of this TCP(available value: 0 - 4). 
* @param buffer - the buffer for storing data. 
* @param buffer_size - the length of the buffer. 
* @param timeout - the time waiting data. 
* @return - length of data received. 
*/
uint32_t recv(uint8_t mux_id, uint8_t *buffer, uint32_t buffer_size, uint32_t timeout)
{
    uint8_t id;
    uint32_t ret;
    ret = recvPkg(buffer, buffer_size, NULL, timeout, &id);
    if (ret > 0 && id == mux_id) {
        return ret;
    }
    return 0;
}

/*recvPkg:-
* Receive a package from uart. 
*
* @param buffer - the buffer storing data. 
* @param buffer_size - guess what!
* @param data_len - the length of data actually received(maybe more than buffer_size, the remained data will be abandoned).
* @param timeout - the duration waitting data comming.
* @param coming_mux_id - in single connection mode, should be NULL and not NULL in multiple. 
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
        if(wifi.available() > 0) {
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
            while(wifi.available() > 0 && i < ret) {
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

/*send:-
* Send data based on TCP  builded already in single mode. 
* 
* Method :-sATCIPSENDSingle(buffer, len);
* (CIPMUX=0) AT+CIPSEND=<length>
* @param buffer - the buffer of data to send. 
* @param len - the length of data to send. 
* @retval true - success.
* @retval false - failure.
*/
bool send(const uint8_t *buffer, uint32_t len)
{
    return sATCIPSENDSingle(buffer, len);
}
bool sATCIPSENDSingle(const uint8_t *buffer, uint32_t len)
{
    rx_empty();
    wifi.print(F("AT+CIPSEND="));
    wifi.println(len);
    if (recvFind(">", 5000)) {
        rx_empty();
        for (uint32_t i = 0; i < len; i++) {
            wifi.write(buffer[i]);
        }
        return recvFind("SEND OK", 10000);
    }
    return false;
}


/*send:-
* Send data based on one of TCP or UDP builded already in multiple mode. 
* 
* Method :-sATCIPSENDMultiple(mux_id, buffer, len).
* (CIPMUX=1) AT+CIPSEND= <id>,<length>.
* @param mux_id - the identifier of this TCP(available value: 0 - 4). 
* @param buffer - the buffer of data to send. 
* @param len - the length of data to send. 
* @retval true - success.
* @retval false - failure.
*/
bool send(uint8_t mux_id, const uint8_t *buffer, uint32_t len)
{
    return sATCIPSENDMultiple(mux_id, buffer, len);
}
bool sATCIPSENDMultiple(uint8_t mux_id, const uint8_t *buffer, uint32_t len)
{
    rx_empty();
    wifi.print(F("AT+CIPSEND="));
    wifi.print(mux_id);
    wifi.print(F(","));
    wifi.println(len);
    if (recvFind(">", 5000)) {
        rx_empty();
        for (uint32_t i = 0; i < len; i++) {
            wifi.write(buffer[i]);
        }
        return recvFind("SEND OK", 10000);
    }
    return false;
}

/*releaseTCP:-
* Release TCP connection in multiple mode. 
* 
* Method :-sATCIPCLOSEMulitple(mux_id).
* @param mux_id - the identifier of this TCP(available value: 0 - 4). 
* @retval true - success.
* @retval false - failure.
*/
bool releaseTCP(uint8_t mux_id)
{
    return sATCIPCLOSEMulitple(mux_id);
}
bool sATCIPCLOSEMulitple(uint8_t mux_id)
{
    String data;
    rx_empty();
    wifi.print(F("AT+CIPCLOSE="));
    wifi.println(mux_id);
    
    data = recvString("OK", "link is not", 5000);
    if (data.indexOf("OK") != -1 || data.indexOf("link is not") != -1) {
        return true;
    }
    return false;
}


/*releaseTCP:-
* Release TCP connection in single mode.
* 
* Method:-eATCIPCLOSESingle().
* @param mux_id of TCP server.
* @retval true - success.
* @retval false - failure.
*/
bool releaseTCP(void)
{
    return eATCIPCLOSESingle();
}
bool eATCIPCLOSESingle(void)
{
    rx_empty();
    wifi.println(F("AT+CIPCLOSE"));
    return recvFind("OK", 5000);
}

/*joinAP and sATCWJAP:-
* Join in AP. 
*
* @param pattern -1 send "AT+CWJAP_DEF=" -2 send "AT+CWJAP_CUR=" -3 send "AT+CWJAP=". 
* @param ssid - SSID of AP to join in. 
* @param pwd - Password of AP to join in. 
* @retval true - success.
* @retval false - failure.
*/
bool joinAP(String ssid, String pwd)
{
    return sATCWJAP(ssid, pwd);
}
bool sATCWJAP(String ssid, String pwd)
{
    String data;

    rx_empty();
    wifi.print(F("AT+CWJAP=\""));
    wifi.print(ssid);
    wifi.print(F("\",\""));
    wifi.print(pwd);
    wifi.println(F("\""));
    
    data = recvString("OK", "FAIL", 10000);
    if (data.indexOf("OK") != -1) {
        return true;
    }
    return false;
}


/*createTCP :-
* Create TCP connection in single mode. 
* Mehtod :-sATCIPSTARTSingle
* @param addr - the IP or domain name of the target host. 
* @param port - the port number of the target host. 
* @retval true - success.
* @retval false - failure.
*/
bool createTCP(String addr, uint32_t port)
{
    return sATCIPSTARTSingle("TCP", addr, port);
}
bool sATCIPSTARTSingle(String type, String addr, uint32_t port)
{
    String data;
    rx_empty();
    wifi.print("AT+CIPSTART=\"");
    //Serial.print("AT+CIPSTART=\"");
    wifi.print(type);
    //Serial.print(type.c_str());
    wifi.print("\",\"");
    //Serial.print("\",\"");
    wifi.print(addr);
    //Serial.print(addr.c_str());
    wifi.print("\",");
    //Serial.print("\",");
    wifi.println(port);
    //Serial.println(port);

    data = recvString("OK", "ERROR", "ALREADY CONNECT", 10000);
    if (data.indexOf("OK") != -1 || data.indexOf("ALREADY CONNECT") != -1) {
        return true;
    }
    return false;
}

/*rechFind:- 
* Recvive data from uart and search first target. Return true if target found, false for timeout.
* @retval true - success.
* @retval false - failure.
*/
bool recvFind(String target, uint32_t timeout)
{
    String data_tmp;
    data_tmp = recvString(target, timeout);
    if (data_tmp.indexOf(target) != -1) {
        return true;
    }
    return false;
}

/*rx_empty:- 
* Empty the buffer or UART RX.
*/
void rx_empty(void) 
{
    while(wifi.available() > 0) {
        wifi.read();
    }
}


/* recvString:-
* Recvive data from uart. Return all received data if target found or timeout. 
*/
String recvString(String target, uint32_t timeout)
{
    String data;
    char a;
    unsigned long start = millis();
    while (millis() - start < timeout) {
        while(wifi.available() > 0) {
            a = wifi.read();
      if(a == '\0') continue;
            data += a;
        }
        if (data.indexOf(target) != -1) {
            break;
        }   
    }
    
    return data;
}

/*recvString:-
 * Recvive data from uart. Return all received data if one of target1 and target2 found or timeout. 
*/
String recvString(String target1, String target2, uint32_t timeout)
{
    String data;
    char a;
    unsigned long start = millis();
    while (millis() - start < timeout) {
        while(wifi.available() > 0) {
            a = wifi.read();
      if(a == '\0') continue;
            data += a;
        }
        if (data.indexOf(target1) != -1) {
            break;
        } else if (data.indexOf(target2) != -1) {
            break;
        }
    }
    return data;
}

/*recvString:- 
* Recvive data from uart. Return all received data if one of target1, target2 and target3 found or timeout. 
*/

String recvString(String target1, String target2, String target3, uint32_t timeout)
{
    String data;
    char a;
    unsigned long start = millis();
    while (millis() - start < timeout) {
        while(wifi.available() > 0) {
            a = wifi.read();
      if(a == '\0') continue;
            data += a;
        }
        if (data.indexOf(target1) != -1) {
            break;
        } else if (data.indexOf(target2) != -1) {
            break;
        } else if (data.indexOf(target3) != -1) {
            break;
        }
    }
    return data;
}

/*eATSETUART:-
* Set up a serial port configuration.  
*
* @param defult pattern  send "AT+UART=". 
* @param baudrate - the uart baudrate. 
* @retval true - success. 
* @retval false - failure. 
*/
bool eATSETUART(uint32_t baudrate)
{
    rx_empty();
    
    wifi.print(F("AT+UART="));
    
    wifi.print(baudrate);
    wifi.print(F(","));
    wifi.print(8);
    wifi.print(F(","));
    wifi.print(1);
    wifi.print(F(","));
    wifi.print(0);
    wifi.print(F(","));
    wifi.println(0);
    
    if(recvFind("OK",5000)){

      wifi.begin(baudrate);
      return true;
    }
    else{
    return false;
    }
 
}

/*restart:-
* Restart ESP8266 by "AT+RST". 
* Method:-eATRST(void)
*
* @retval true - success.
* @retval false - failure.
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
    return recvFind("OK", 10000);
}

/*eAT:-
* AT command:-ATtention, used to start a command line. 
*
* @retval true - success.
* @retval false - failure.
*/
bool eAT(void)
{
    rx_empty();
    wifi.println(F("AT"));
    return recvFind("OK", 10000);
}
/* initDustSensor
*Initiate dust sensor to get the data. 
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
* Calculate dust pm0.3 pm2.5 pm10 value
*/ 
void Winsen_dust()
{
    byte data[24];
    Dust_Serial.listen();
    
    int i=0;    
    while(!Dust_Serial.available());
    while(Dust_Serial.available())
    {
        data[i] = Dust_Serial.read();
       
        if(i == 23)
        {
            Dust_Serial.println();
            PM1 = ((data[4]*256) + data[5]);
            PM25 = ((data[6]*256) + data[7]);
            PM10 = ((data[8]*256) + data[9]);
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

<<<<<<< HEAD
void LED_on()
=======
void LED_blink()
>>>>>>> origin/master
{
  if( PM10>Range10_max || PM25>Range25_max || PM10>Range3_max )
  {
    digitalWrite(A0, LOW);
    digitalWrite(A1, HIGH);
    digitalWrite(A2, LOW); 
  }
  else if( PM10>Range10_min || PM25>Range25_min || PM10>Range3_min )
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
<<<<<<< HEAD
}
=======
}  

>>>>>>> origin/master
