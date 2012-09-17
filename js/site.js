//convenient breakoutjs vars
var IOBoard = BO.IOBoard;
var IOBoardEvent = BO.IOBoardEvent;
var Pin = BO.Pin;
var PinEvent = BO.PinEvent;
var Potentiometer = BO.io.Potentiometer;
var PotEvent = BO.io.PotEvent;

// arduino board
var arduino = new IOBoard(location.hostname, 8887);

// global var to handle duplicated transition end events
var transEndToHandle = true;

// maps of positions
var rightPressed = [
                    {'src' : 'start' , 'target' : 'pos1'},
                    {'src' : 'pos7' , 'target' : 'start'},
                    {'src' : 'pos8' , 'target' : 'pos7'},
                    {'src' : 'pos5' , 'target' : 'pos4'}
                    ];
var leftPressed = [
                   {'src' : 'start' , 'target' : 'pos7'},
                   {'src' : 'pos1' , 'target' : 'start'},
                   {'src' : 'pos7' , 'target' : 'pos8'},
                   {'src' : 'pos4' , 'target' : 'pos5'}
                   ];
var upPressed = [
                 {'src' : 'start' , 'target' : 'pos6'},
                 {'src' : 'pos1' , 'target' : 'pos2'},
                 {'src' : 'pos3' , 'target' : 'pos1'},
                 {'src' : 'pos4' , 'target' : 'start'}
                 ];
var downPressed = [
                   {'src' : 'pos6' , 'target' : 'start'},
                   {'src' : 'pos2' , 'target' : 'pos1'},
                   {'src' : 'pos1' , 'target' : 'pos3'},
                   {'src' : 'start' , 'target' : 'pos4'}
                   ];
// maps the position and its related video
var videoMap = [
                {'pos' : 'pos1' , 'video' : 'anaTijoux'},
                {'pos' : 'pos2' , 'video' : 'c2c'},
                {'pos' : 'pos3' , 'video' : 'filastine'},
                {'pos' : 'pos4' , 'video' : 'leadBreakfast'},
                {'pos' : 'pos5' , 'video' : 'odezenne'},
                {'pos' : 'pos6' , 'video' : 'woodkid'},
                {'pos' : 'pos7' , 'video' : 'natalia'},
                {'pos' : 'pos8' , 'video' : 'oddfuture'},
                ];

/**
 * Called when the page is ready
 */
function initPage() {
	keyPress();	
	transitionEnd();
	initArduino();
}

/**
 * Handle transition end event sent when the point has finished to move
 */
function transitionEnd() {
	$("#car").bind("webkitTransitionEnd otransitionend transitionend msTransitionEnd", function(){
		if (transEndToHandle && $("#car").attr('class') != "start") {  
			$("#videoDiv").addClass("visible");
			insertVideo($("#car").attr('class'));
			transEndToHandle = false;
			$("#wrapper").addClass("greyed");
			setTimeout(function(){$("#video")[0].play()},800);
		}
	});
}

/**
 * Insert the right video in the pop up
 * @param className the css class name of the current point position
 */
function insertVideo(className) {
	$.each(videoMap, function() {
        if (this.pos == className) {
        	// when it's the case get the corresponding video
        	$("#videoDiv").html("<video id=\"video\" src=\"video/" + this.video + ".webm\"></video>");
        }
    });
}

/**
 * Handles the keys when pressed
 */
function keyPress() {
	$(document).keydown(function(e){
		// only handles arrow keys
		switch(e.which) {
	        case 37: // left
				changePosition(leftPressed);
	        break;
	        
	        case 38: // up
				changePosition(upPressed);
	        break;

	        case 39: // right
				changePosition(rightPressed);				
	        break;

	        case 40: // down
				changePosition(downPressed);				
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault();
	});
}


/**
 * Changes the css class according to the mapping in the json in param
 * @param json the json data that handles the move from one to another point
 */
function changePosition(json) {
	// hides and stops the video if displayed
	$("#wrapper").removeClass("greyed");
	$("#videoDiv").removeClass("visible");
	var video = $("#video")[0];
	if (video) {
		video.pause();
	}
	// allow the handling of the transition end event
	transEndToHandle = true;
	// gets the current css class name of the #car dom element
	var className = $("#car").attr('class');
	// iterates over the json message to find the class name in the src attribute
	$.each(json, function() {
        if (this.src == className) {
        	// when it's the case remove the current css className and assign the one in the target attribute
        	$("#car").removeClass(className).addClass(this.target);
        }
    });
}

/**
 * Init the arduino board
 */ 
function initArduino() {
	// add a listener to be notified when the board is ready
	arduino.addEventListener(IOBoardEvent.READY, onReady);
}

/**
 * Called when the arduino board is ready
 * @param evt the event that is sent when the board is ready
 */
function onReady(evt) {
	// remove the event listener because it is no longer needed
	arduino.removeEventListener(IOBoardEvent.READY, onReady);

	// digital pins
	// pins are 2,3,4,5,6 and 7
	// enable and add a change event listener for each pin (i.e. each button)
	for (var pin = 2; pin < 6; ++ pin) {
		arduino.setDigitalPinMode(pin, Pin.DIN);
		var button = arduino.getDigitalPin(pin);
		button.addEventListener(PinEvent.CHANGE, onChange);
	};
}

/**
 * Handles the changed state of a button
 * @param evt the event sent when the state of a button has changed
 */
function onChange(evt) {
	console.log("onchange");
	// get the pin number and the value
	var pin = evt.target.number;
	var value = evt.target.value;
	console.log("pin " + pin +" : " + value);
	// launches the right move given the pin
	switch (pin) {
		case 2: // up
			changePosition(upPressed);
	        break;
		case 3: // down
			changePosition(downPressed);
	        break;
		case 4: // left
			changePosition(leftPressed);
	        break;
		case 5: // right
			changePosition(rightPressed);
			break;
		case 6:
			break;
		case 7:
			break;
		default:
			break;
	}
}