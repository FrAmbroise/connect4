from machine import Pin, ADC, PWM # importe dans le code la lib qui d'utiliser la raspberry (ig)
import utime # importe dans le code la lib quui permet de gerer le wait4
import network
import ujson
import urequests

axe_x = ADC(Pin(27,mode=Pin.IN))
pin_button = Pin(16,mode=Pin.IN, pull=Pin.PULL_UP)

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
ssid = 'Caca123'
password= 'sheesh5678'
wlan.connect(ssid, password)
url= "http://192.168.252.58:3000/"

isPressed = "no"
side = 'middle'

while not wlan.isconnected():
    utime.sleep(1)
    print("noco")

while(True):
    
    if(pin_button.value() == 0):

        if(round(axe_x.read_u16(), 2) > 45000):
            side = 'right'
        elif(round(axe_x.read_u16(), 2) < 17000):
            side = 'left'
        else:
            side = 'middle'

        isPressed = 'yes'
    else:
        if(round(axe_x.read_u16(), 2) > 45000):
            side = 'right'
        elif(round(axe_x.read_u16(), 2) < 17000):
            side = 'left'
        else:
            side = 'middle'

        isPressed = 'no'
    
    try:
        r = urequests.post(url, json = {"side": side, "isPressed": isPressed})
        r.close()
        utime.sleep(0.1)
    except Exception as e:
        print(e)

