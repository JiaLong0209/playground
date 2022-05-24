#!/usr/bin/env python
from __future__ import division

from flask import Flask, render_template, Response
import time

# Import the PCA9685 module.
import Adafruit_PCA9685

# Alternatively specify a different address and/or bus:
pwm = Adafruit_PCA9685.PCA9685(address=0x40, busnum=6)

# Configure min and max servo pulse lengths
servo_min = 150  # Min pulse length out of 4096
servo_max = 600  # Max pulse length out of 4096

D_EN_A = 0
D_A_IN1 = 1
D_A_IN2 = 2

D_EN_B = 4
D_B_IN3 = 5
D_B_IN4 = 6

H_EN_A = 8
H_A_IN1 = 9
H_A_IN2 = 10

H_EN_B = 12
H_B_IN3 = 13
H_B_IN4 = 14

def Drive_Motor(Motor,Dir,Speed):
    if (Motor == 'A'):
        if (Dir == 'FW'):
            pwm.set_pwm(D_A_IN1, 4095, 0)
            pwm.set_pwm(D_A_IN2, 0, 4095)
        elif (Dir == 'BW'):
            pwm.set_pwm(D_A_IN1, 0, 4095)
            pwm.set_pwm(D_A_IN2, 4095, 0)
        elif (Dir == 'STOP'):
            pwm.set_pwm(D_A_IN1, 0, 0)
            pwm.set_pwm(D_A_IN2, 0, 0)              
        if (Speed >= 4095):
            Speed = 4095
        else:
            pwm.set_pwm(D_EN_A, 0, Speed)
            
    if (Motor == 'B'):
        if (Dir == 'FW'):
            pwm.set_pwm(D_B_IN3, 4095, 0)
            pwm.set_pwm(D_B_IN4, 0, 4095)
        elif (Dir == 'BW'):
            pwm.set_pwm(D_B_IN3, 0, 4095)
            pwm.set_pwm(D_B_IN4, 4095, 0)
        elif (Dir == 'STOP'):
            pwm.set_pwm(D_B_IN3, 0, 0)
            pwm.set_pwm(D_B_IN4, 0, 0)              
        if (Speed >= 4095):
            Speed = 4095
        else:
            pwm.set_pwm(D_EN_B, 0, Speed)
 
app = Flask(__name__)
  
@app.route('/')  
def main():
    return render_template('motor.html')

@app.route('/Forward')  #網址加上 /Forward
def Forward():
    print('click 前進')
    Drive_Motor('A', 'FW', 2000)
    Drive_Motor('B', 'FW', 2000)
    return render_template('motor.html')

@app.route('/Backward')
def Backward():
    print('click 後退')
    Drive_Motor('A', 'BW', 2000)
    Drive_Motor('B', 'BW', 2000)
    return render_template('motor.html')

@app.route('/Left')
def Left():
    print('click 左轉')
    Drive_Motor('A', 'FW', 2000)
    Drive_Motor('B', 'STOP', 0)
    return render_template('motor.html')

@app.route('/Right')
def Right():
    print('click 右轉')
    Drive_Motor('A', 'STOP', 0)
    Drive_Motor('B', 'FW', 2000)
    return render_template('motor.html')

@app.route('/Stop')
def Stop():
    print('click 停止')
    Drive_Motor('A', 'STOP', 0)
    Drive_Motor('B', 'STOP', 0)
    return render_template('motor.html')

 
if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=9000, debug=True, threaded=True)
        # port 要1000以上
    except KeyboardInterrupt:
        Drive_Motor('A', 'STOP', 0)
        Drive_Motor('B', 'STOP', 0)
        print("\nQuit") 
    # 按下 Ctrl + C quit
    