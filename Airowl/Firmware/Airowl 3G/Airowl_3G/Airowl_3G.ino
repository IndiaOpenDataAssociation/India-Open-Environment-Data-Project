
#include <SoftwareSerial.h>
#include <String.h>
 
SoftwareSerial GSM_Serial(7, 8);
SoftwareSerial Dust_Serial(2, 3);


String Msg;
 byte data[24];
const unsigned char cmd_get_sensor[] =
{
    0xff, 0x01, 0x78, 0x40, 0x00,
    0x00, 0x00, 0x00, 0x47
};

//Ranges
const int Range10_max = 120; const int Range10_min= 60;
const int Range25_max = 350; const int Range25_min= 100;
const int Range3_max = 1200; const int Range3_min= 951;

#define ARRAYSIZE 15
String apn[ARRAYSIZE] = {"www","airtelgprs.com","aircelgprs.com","TATA.DOCOMO.INTERNET","bsnlnet","internet","uninor","mtnl.net"};

int PM1=0, PM25=0, PM10=0;
int i = 0;
String APN;
void setup()
{
  GSM_Serial.begin(9600);               // the GPRS baud rate   
  Dust_Serial.begin(9600);             // Dust Sensor baud rate
  Serial.begin(19200);                 // the GPRS baud rate 
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  pinMode(A2, OUTPUT);
  
  delay(500);
    //transmit comp data
  for (i = 0; i < sizeof(cmd_get_sensor); i++)
  {
    Dust_Serial.write(cmd_get_sensor[i]);
  }
  delay(10);
    
}
 
void loop()
{  
  // Dust_Serial.listen();
   Winsen_dust();
   Serial.println("***********************************************************************************************");
   delay(2000);  

   LED_blink(); // Blinking LED's of Airowl eyes.
  
  // GSM_Serial.listen();  
   SubmitHttpRequest();
   delay(5000);
   Serial.println("***********************************************************************************************");
}


void SubmitHttpRequest()
{
  GSM_Serial.listen();

  GSM_Serial.println("AT+CSQ");
  delay(1000);
 
  ShowSerialData();// this code is to show the data from gprs shield, in order to easily see the process of how the gprs shield submit a http request, and the following is for this purpose too.
 
  GSM_Serial.println("AT+CGATT?");
  delay(1000);
 
  ShowSerialData();
 
  GSM_Serial.println("AT+SAPBR=3,1,\"CONTYPE\",\"GPRS\"");//setting the SAPBR, the connection type is using gprs
  delay(1000);
 
  ShowSerialData();
  int j;

  String APN1 = "AT+SAPBR=3,1,\"APN\","+ String(apn[j]) + "\"";
  String APN2 = "AT+SAPBR=3,1,\"APN\",\"mtnl\",\"mtnl123\","+ String(apn[j]) + "\"";
 

  int size=sizeof(apn);
  for (j = 0; j <size ; j++)
  {
    if (j == (size-1)) 
    {
      GSM_Serial.println(APN2);
     
    }
    else
    {
    GSM_Serial.println(APN1);
     Serial.println("apn done");
    }
    delay(2000);
    
   if (Serial.readString()=="OK")
     APN = apn[j];
     break;

  }
 
  ShowSerialData();
 
  GSM_Serial.println("AT+SAPBR=1,1");//setting the SAPBR, for detail you can refer to the AT command mamual
  delay(2000);
 
  ShowSerialData();
 
  GSM_Serial.println("AT+HTTPINIT"); //init the HTTP request
 
  delay(2000); 
  ShowSerialData();

  String address = "AT+HTTPPARA=\"URL\",\"http://oedpdev.eu-gb.mybluemix.net/v1/data?deviceId=AIROWL_001&type=AIROWL&key=hetvi_1234&pm1="+ String(PM1) + "&pm25="+ String(PM25) + "&pm10="+ String(PM10) +"\"";
 
 // String address = "AT+HTTPPARA=\"URL\",\"http://oizomdev.cloudapp.net/api/data?serial_number=5&W_DUST25=" + String(PM25) + "&W_DUST10=" + String(PM10) + "&W_DUST3=" + String(PM1) +"\"";

  GSM_Serial.println(address);// setting the httppara, the second parameter is the website you want to access
  delay(1000);
 
  ShowSerialData();
 
  GSM_Serial.println("AT+HTTPACTION=0");//submit the request 
  delay(10000);//the delay is very important, the delay time is base on the return from the website, if the return datas are very large, the time required longer.
  //while(!GSM_Serial.available());
 
  ShowSerialData();
 
  GSM_Serial.println("AT+HTTPREAD");// read the data from the website you access
  delay(300);
 
  ShowSerialData();
 
  GSM_Serial.println("");
  delay(100);
  Serial.println("GSM done");
}

void ShowSerialData()
{
    GSM_Serial.listen();
    
    while(GSM_Serial.available()!=0)
    Serial.write(GSM_Serial.read());
}

void Winsen_dust()
{
    Dust_Serial.listen();
    
    i=0;    
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

void LED_blink()
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
}  
