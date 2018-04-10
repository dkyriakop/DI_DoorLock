#!/usr/bin/env node

//*** SMARTPHONE DOORLOCK ***//

// ************* PARAMETERS *************** //
//
// Parameters: unlockedState and lockedState
// These parameters are in microseconds.
// The servo pulse determines the degree
// at which the horn is positioned. In our
// case, we get about 100 degrees of rotation
// from 1ms-2.2ms pulse width. You will need
// to play with these settings to get it to
// work properly with your door lock
//
// Parameters: motorPin
// The GPIO pin the signal wire on your servo
// is connected to
//
// Parameters: buttonPin
// The GPIO pin the signal wire on your button
// is connected to. It is okay to have no button connected
//
// Parameters: ledPin
// The GPIO pin the signal wire on your led
// is connected to. It is okay to have no ledconnected
//
//
// **************************************** //
var unlockedState = 1730;
var lockedState = 710;

var motorPin = 14;
var buttonPin = 4
var ledPin = 17
var fs=require('fs');

var date = new  Date();

// *** Start code *** //

var locked = true

//Setup servo
var Gpio = require('pigpio').Gpio,
  motor = new Gpio(motorPin, {mode: Gpio.OUTPUT}),
  button = new Gpio(buttonPin, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.FALLING_EDGE
}),
  led = new Gpio(ledPin, {mode: Gpio.OUTPUT});

const express = require('express')
const app = express()

var users  = [];

users.push(['jpapid','TWJRtp9tCDv3UHGQa6dN']);
users.push(['hololens','hackadoor@!']);
users.push(['DoorMobile','hygfdoiloncdj']);
users.push(['dkyriakop','phC9ezjL1sc6ihdde9wf']);
users.push(['kmenti','BBBuM4KNvtkMQs78ZMPL']);
users.push(['spetrova','PReeJDNdDrk4IXYdcNdJ']);
users.push(['spolitis','k1fWXIPdOzCoIROWk4zQ']);
users.push(['mtsiligian','3bElcdbr5B38ZGyZX7UG']);
users.push(['sparginou','VohLQnO7ufT9KCliuOy1']);
users.push(['cgkizelis','7sxeWmao8xVnDbOC8PNb']);
users.push(['egkouti','mnn3DWqExXPge1KVWHH5']);
users.push(['gathanas','9vYt2bKQYUpW1zDjCvz0']);
users.push(['vaggelis','yolo']);
users.push(['lenia','P2ht7W8yUSekFbAC5vXQ']);


var x ,authuser

//	console.log(users[0][0]);
//	console.log(users[0][1]);
//	console.log(users[1][0]);
//	console.log(users[1][1]);

app.get('/', (req, res) => res.send('This is Hacka Door Speaking!'))

app.listen(80, () => console.log('Example app listening on port 80!'))

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});


app.get ('/changelock', (req,res) => {

for (x=0;x<11;x++){if  (users[x][1]==req.query.user) {auth=true; authuser=users[x][0] ;break } else{ auth=false} }

	if (auth) {
		if (locked) {
			unlockDoor()
			res.send('	<HTML><link rel="stylesheet" type="text/css" href="http://www.cosmotehackathon.gr/iot/style.css"> \
					<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"><TITLE> Hacka Door</TITLE> \
					<BODY> \
<center><img src="http://www.cosmotehackathon.gr/iot/unlocked.png" width="64px"></center> \
<span class="switch"> \
	<span class="switch-border1">\
		<span class="switch-border2">\
			<input id="switch1" type="checkbox" onclick="myFunction()" />\
			<label for="switch1"></label>\
			<span class="switch-top"></span>\
			<span class="switch-shadow"></span>\
			<span class="switch-handle"></span>\
			<span class="switch-handle-left"></span>\
			<span class="switch-handle-right"></span>\
			<span class="switch-handle-top"></span>\
			<span class="switch-handle-bottom"></span>\
			<span class="switch-handle-base"></span>\
			<span class="switch-led switch-led-green">\
				<span class="switch-led-border">\
					<span class="switch-led-light">\
						<span class="switch-led-glow"></span>\
					</span>\
				</span>\
			</span>\
			<span class="switch-led switch-led-red">\
				<span class="switch-led-border">\
					<span class="switch-led-light">\
						<span class="switch-led-glow"></span>\
					</span>\
				</span>\
			</span>\
		</span>\
	</span>\
</span>\
					<CENTER><H1>Door unLocked by '+authuser+'</H1></CENTER>\
<center><img src="http://www.cosmotehackathon.gr/iot/recordseparator.png"></center> \
<script>function myFunction() {window.location.reload();}</script></BODY>')
			fs.appendFileSync('/root/DoorAccess.log',authuser+' unlocked the door on '+date+'\r\n')
		} else {
			lockDoor()
			res.send('\
					<HTML> <link rel="stylesheet" type="text/css" href="http://www.cosmotehackathon.gr/iot/style.css"> \
					<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no"><TITLE> Hacka Door</TITLE>\
					<BODY>\
<center><img src="http://www.cosmotehackathon.gr/iot/locked.png" width="64px"></center><span class="switch"> \
	<span class="switch-border1">\
		<span class="switch-border2">\
			<input id="switch2" type="checkbox" checked onclick="myFunction()" />\
			<label for="switch2"></label>\
			<span class="switch-top"></span>\
			<span class="switch-shadow"></span>\
			<span class="switch-handle"></span>\
			<span class="switch-handle-left"></span>\
			<span class="switch-handle-right"></span>\
			<span class="switch-handle-top"></span>\
			<span class="switch-handle-bottom"></span>\
			<span class="switch-handle-base"></span>\
			<span class="switch-led switch-led-green">\
				<span class="switch-led-border">\
					<span class="switch-led-light">\
						<span class="switch-led-glow"></span>\
					</span>\
				</span>\
			</span>\
			<span class="switch-led switch-led-red">\
				<span class="switch-led-border">\
					<span class="switch-led-light">\
						<span class="switch-led-glow"></span>\
					</span>\
				</span>\
			</span>\
		</span>\
	</span>\
</span>\
					<CENTER><H1>Door Locked by '+authuser+'</H1></CENTER>\
<center><img src="http://www.cosmotehackathon.gr/iot/recordseparator.png"></center> \
					<script>function myFunction() { window.location.reload();}</script></BODY>')
			fs.appendFileSync('/root/DoorAccess.log',authuser+' locked the door on '+date+'\r\n')
		}

	} else {
			res.send('\
					<HTML><link rel="stylesheet" type="text/css" href="http://www.cosmotehackathon.gr/iot/style.css">\
					<TITLE> Hacka Door</TITLE>\
					<BODY><center><img src="http://www.cosmotehackathon.gr/iot/security.png" width="256px"></center>\
<p style="color:white;text-align:center;font-size:18px;">I dont think so!</p>\
				</BODY>')
			fs.appendFileSync('/root/DoorAccess.log','Unauthorized access attempt by'+req.query.user+' on '+date+'\r\n')
	}
})

console.log("locking door")
lockDoor()

button.on('interrupt', function (level) {
	//console.log("level: " + level + " locked: " + locked)
	if (level == 0) {
		if (locked) {
			unlockDoor()
		} else {
			lockDoor()
		}
	}
});



function lockDoor() {
	motor.servoWrite(lockedState);
	led.digitalWrite(1);
	locked = true

	//notify

  	//After 1.5 seconds, the door lock servo turns off to avoid stall current
  	setTimeout(function(){motor.servoWrite(0)}, 1500)
}

function unlockDoor() {
	motor.servoWrite(unlockedState);
	led.digitalWrite(0);
	locked = false

	//notify

  	//After 1.5 seconds, the door lock servo turns off to avoid stall current
  	setTimeout(function(){motor.servoWrite(0)}, 1500)
}
//or.servoWrite(0)}, 1500)

