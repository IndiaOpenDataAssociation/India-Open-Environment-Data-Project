#include <SoftwareSerial.h>

SoftwareSerial GSM_Serial(7, 8);
SoftwareSerial Dust_Serial(2, 3);

String deviceID = "AirOwl_";

bool initFlag = true;

void setup()
{
  GSM_Serial.begin(9600);              // the GPRS baud rate

  Dust_Serial.begin(9600);             // Dust Sensor baud rate

  //Serial.begin(9600);                 // the GPRS baud rate

  //LED initiation
  analogWrite(A0, 1024); delay(1000); analogWrite(A0, 0);
  analogWrite(A1, 1024); delay(1000); analogWrite(A1, 0);
  analogWrite(A2, 1024); delay(1000); analogWrite(A2, 0);
  delay(1000);
  blue();

  initDustSensor();

  deviceId();
}

void loop()
{
  unsigned int PM1, PM25, PM10;

  if (Get_dust(PM1, PM25, PM10))
  {
    SubmitHttpRequest(PM1, PM25, PM10);
    //Serial.println("***********************************************************************************************");
    delay(1000);
    LED_blink(PM1, PM25, PM10); // Blinking LED's of Airowl eyes.
    delay(1000);
  }
}

void initDustSensor()
{
  const unsigned char cmd_get_sensor[] =
  {
    0xff, 0x01, 0x78, 0x40, 0x00,
    0x00, 0x00, 0x00, 0x47
  };

  //transmit comp data
  for (int i = 0; i < sizeof(cmd_get_sensor); i++)
  {
    Dust_Serial.write(cmd_get_sensor[i]);
  }
  delay(1000);
}

void SubmitHttpRequest(unsigned int PM1, unsigned int PM25, unsigned int PM10)
{
  GSM_Serial.listen();

  rx_empty();
  GSM_Serial.println("AT+SAPBR=3,1,\"CONTYPE\",\"GPRS\""); // setting the SAPBR, the connection type is using gprs

  if (check(0, 5000))
  {
    //Serial.println("GPRS connection ok");
  }
  else
  {
    //Serial.println("GPRS connection err");
  }

  //  GSM_Serial.println("AT+SAPBR=3,1,\"APN\",\"isafe\""); // setting the APN, the second need you fill in your local apn server
  //  if(check(0, 5000))
  //  {
  //    //Serial.println("APN connection ok");
  //  }
  //  else
  //  {
  //    //Serial.println("APN connection err");
  //  }
  //  delay(4000);

  for (int i = 0; i < 3; i++)
  {
    GSM_Serial.println("AT+SAPBR=1,1");//setting the APN, the second need you fill in your local apn server
    if (check(0, 10000))
    {
      //Serial.println("SAPBR connection ok");
      break;
    }
    else
    {
      //Serial.println("SAPBR connection err");
    }
  }

  rx_empty();

  GSM_Serial.println("AT+HTTPINIT"); //init the HTTP request

  if (check(0, 5000))
  {
    //Serial.println("HTTP connection ok");
  }
  else
  {
    //Serial.println("HTTP connection err");
  }

  rx_empty();

  String command = "AT+HTTPPARA=\"URL\",\"http://api.airpollution.online/v1/airowl/data?deviceId=" + deviceID + "&type=AIROWL3G&key=indiaopendata&pm1=" + String(PM1) + "&pm25=" + String(PM25) + "&pm10=" + String(PM10) + "\"";

  //Serial.println(command);
  GSM_Serial.println(command);

  delay(2000);
  rx_empty();
  GSM_Serial.println("AT+HTTPACTION=0");//submit the request

  if (check(0, 5000))
  {
    //Serial.println("Send ok");
  }
  else
  {
    //Serial.println("Send err");
  }
  //delay(1000);
  if (check(2, 10000))
  {
    //Serial.println("Send ok");
  }
  else
  {
    //Serial.println("Send err");
  }

  rx_empty();
  GSM_Serial.println("AT+HTTPREAD");// read the data from the website you access
  GSM_Serial.println("");

  if (check(0, 10000))
  {
    //Serial.println("GSM done");
  }
  else
  {
    //Serial.println("GSM err");
  }

  GSM_Serial.println("AT+HTTPTERM");
  if (check(0, 5000))
  {
    //Serial.println("Terminate done");
  }
  else
  {
    //Serial.println("Terminate err");
  }

  GSM_Serial.println("AT+SAPBR=0,1");
  if (check(0, 5000))
  {
    //Serial.println("Terminate done");
  }
  else
  {
    //Serial.println("Terminate err");
  }

  digitalWrite(A0, LOW);
  digitalWrite(A1, LOW);
  digitalWrite(A2, LOW);
}

boolean Get_dust(unsigned int &PM1, unsigned int &PM25, unsigned int &PM10)
{

  PM1 = 0, PM25 = 0, PM10 = 0;
  unsigned int count = 0;

  unsigned long lastPublishMillis = millis();

  byte data[24];
  byte j = 0;
  unsigned int checksum = 0;

  while (1)
  {
    j = 0;
    
    Dust_Serial.listen();

    checksum = 0;

    while (!Dust_Serial.available());
    while (Dust_Serial.available())
    {
      data[j] = Dust_Serial.read();
      if (j <= 21) {
        checksum += data[j];
      }

      if (j == 23) {
        if (checksum == ((256 * data[22]) + data[23])) {
          if (data[0] == 0x42)
          {
            if (data[1] == 0x4D)
            {
              PM1 += ((data[4] * 256) + data[5]);
              PM25 += ((data[6] * 256) + data[7]);
              PM10 += ((data[8] * 256) + data[9]);
              count++;
              //Serial.print("count : ");
              //Serial.println(count);
              //Serial.print("PM 1.0 :");
              //Serial.println(PM1 / count);
              //Serial.print("PM 2.5 :");
              //Serial.println(PM25 / count);
              //Serial.print("PM 10 :");
              //Serial.println(PM10 / count);
              //Serial.println("");
              Dust_Serial.flush();
              break;
            }
          }
        }
        else
        {
          break;
        }
      }
      j++;
    }

    if (count == 3 && initFlag == true)
    {
      PM1 = PM1 / count;
      PM25 = PM25 / count;
      PM10 = PM10 / count;
      initFlag = false;
      return 1;
    }

    delay(2000);
    if (millis() - lastPublishMillis > 100000UL)
    {
      if (count > 0)
      {
        PM1 = PM1 / count;
        PM25 = PM25 / count;
        PM10 = PM10 / count;

      }
      else
      {
        initDustSensor();
      }
      return 1;
    }
  }
}

void LED_blink(unsigned int PM1, unsigned int PM25, unsigned int PM10)
{
  //Ranges
  const int Range1_max = 120; const int Range1_min = 60;
  const int Range25_max = 350; const int Range25_min = 100;
  const int Range10_max = 1200; const int Range10_min = 951;

  if ( PM1 > Range1_max && PM25 > Range25_max && PM10 > Range10_max )
  {
    red();
  }
  else if ( PM1 > Range1_min && PM25 > Range25_min && PM10 > Range10_min )
  {
    yellow();
  }
  else
  {
    green();
  }
}

void blue()
{
  analogWrite(A0, 1024);
  analogWrite(A1, 0);
  analogWrite(A2, 0);
}

void green()
{
  analogWrite(A0, 0);
  analogWrite(A1, 0);
  analogWrite(A2, 1024);
}

void red()
{
  analogWrite(A0, 0);
  analogWrite(A1, 1024);
  analogWrite(A2, 0);
}

void yellow()
{
  analogWrite(A0, 0);
  analogWrite(A1, 1024);
  analogWrite(A2, 1024);
}

bool check(int v, uint32_t timeout, String &Data)
{
  unsigned long start = millis();
  char a;

  while (millis() - start < timeout) {
    while (GSM_Serial.available() > 0) {
      a = GSM_Serial.read();
      if (a == '\0') continue;
      Data += a;
    }
    if (Data.indexOf("OK") != -1 && v == 0)
    {
      //Serial.println(Data);
      return 1;
    }
    if (Data.indexOf(">") != -1 && v == 1)
    {
      //Serial.println(Data);
      return 1;
    }
    if (Data.indexOf(":") != -1 && v == 2)
    {
      //Serial.println(Data);
      return 1;
    }
  }
  //Serial.println(Data);
  return 0;
}

bool check(int v, uint32_t timeout)
{
  unsigned long start = millis();
  char a;
  String Data;

  while (millis() - start < timeout) {
    while (GSM_Serial.available() > 0) {
      a = GSM_Serial.read();
      if (a == '\0') continue;
      Data += a;
    }
    if (Data.indexOf("OK") != -1 && v == 0)
    {
      //Serial.println(Data);
      return 1;
    }
    if (Data.indexOf(">") != -1 && v == 1)
    {
      //Serial.println(Data);
      return 1;
    }
    if (Data.indexOf(":") != -1 && v == 2)
    {
      //Serial.println(Data);
      return 1;
    }
  }
  //Serial.println(Data);
  return 0;
}

void deviceId(void)
{
  String tmp_id;

  GSM_Serial.listen();


  GSM_Serial.println("AT+GSN");

  if (check(0, 5000, tmp_id))
  {
    int first = tmp_id.indexOf("\n");
    int second = tmp_id.indexOf("\n", first + 3);
    deviceID = deviceID + tmp_id.substring(first + 13, second - 1);
  }
}


void rx_empty(void)
{
  GSM_Serial.listen();
  while (GSM_Serial.available() > 0) {
    GSM_Serial.read();
  }
}
