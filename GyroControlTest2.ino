#include <Servo.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_LSM303_U.h>
#include <Adafruit_L3GD20_U.h>
#include <Adafruit_9DOF.h>

Servo servox1;
Servo servox2;
Servo servoy1;
Servo servoy2; 

int originRoll = 0;
int originPitch = 0;
int originMag = 0;

/* Assign a unique ID to the sensors */
Adafruit_9DOF                dof   = Adafruit_9DOF();
Adafruit_LSM303_Accel_Unified accel = Adafruit_LSM303_Accel_Unified(30301);
Adafruit_LSM303_Mag_Unified   mag   = Adafruit_LSM303_Mag_Unified(30302);

/* Update this with the correct SLP for accurate altitude measurements */
float seaLevelPressure = SENSORS_PRESSURE_SEALEVELHPA;

/**************************************************************************/
/*!
    @brief  Initialises all the sensors used by this example
*/
/**************************************************************************/
void initSensors()
{
  if(!accel.begin())
  {
    /* There was a problem detecting the LSM303 ... check your connections */
    Serial.println(F("Ooops, no LSM303 detected ... Check your wiring!"));
    while(1);
  }
  if(!mag.begin())
  {
    /* There was a problem detecting the LSM303 ... check your connections */
    Serial.println("Ooops, no LSM303 detected ... Check your wiring!");
    while(1);
  }
}


void calibrate(void)
{
  sensors_event_t accel_event;
  sensors_event_t mag_event;
  sensors_vec_t   orientation;

  /* Calculate pitch and roll from the raw accelerometer data */
  accel.getEvent(&accel_event);
  if (dof.accelGetOrientation(&accel_event, &orientation))
  {
    originRoll = orientation.roll;
    originPitch = orientation.pitch;
  }
  
  /* Calculate the heading using the magnetometer */
  mag.getEvent(&mag_event);
  if (dof.magGetOrientation(SENSOR_AXIS_Z, &mag_event, &orientation))
  {
    originMag = orientation.heading;
  }
}

/**************************************************************************/
/*!

*/
/**************************************************************************/

void setup(void)
{
  Serial.begin(115200);
  Serial.println(F("Adafruit 9 DOF Pitch/Roll/Heading Example")); Serial.println("");
  servox1.attach(8);
  servox2.attach(9);
  servoy1.attach(10);
  servoy2.attach(11);
  /* Initialise the sensors */
  initSensors();
  calibrate();

}

void spindown(void){
  
}


void stablize(void){
  sensors_event_t accel_event;
  sensors_event_t mag_event;
  sensors_vec_t   orientation;

  /* Calculate pitch and roll from the raw accelerometer data */
  accel.getEvent(&accel_event);
  if (dof.accelGetOrientation(&accel_event, &orientation))
  {
    int angleX = orientation.roll - originRoll;
    int angleY = orientation.pitch - originPitch;

    int valx1 = (int) angleX + 90;
    int valx2 = (int) (-1*angleX) + 90;
    int valy1 = (int) angleY + 90;
    int valy2 = (int) (-1*angleY) + 90;

    Serial.print("valx1:");
    Serial.println(valx1);
    Serial.print("valx2:");
    Serial.println(valx2);
    
    Serial.print("valy1:");
    Serial.println(valy1);
    Serial.print("valy2:");
    Serial.println(valy2 );

    servox1.write(valx1);
    servox2.write(valx2);
    servoy1.write(valy1);
    servoy2.write(valy2);
  }
}


/**************************************************************************/
/*!
    @brief  Constantly check the roll/pitch/heading/altitude/temperature
*/
/**************************************************************************/
void loop(void)
{
  sensors_event_t accel_event;
  sensors_event_t mag_event;
  sensors_vec_t   orientation;

  /* Calculate pitch and roll from the raw accelerometer data */
  accel.getEvent(&accel_event);
  if (dof.accelGetOrientation(&accel_event, &orientation))
  {
    int angleX = orientation.roll - originRoll;
    int angleY = orientation.pitch - originPitch;

    int valx2 = (int) angleX + 90;
    int valx1 = (int) (-1*angleX) + 90;
    int valy2 = (int) angleY + 90;
    int valy1 = (int) (-1*angleY) + 90;

    servox1.write(valx1);
    servox2.write(valx2);
    servoy1.write(valy1);
    servoy2.write(valy2);
  }

  Serial.println(F(""));
  delay(1);
}
