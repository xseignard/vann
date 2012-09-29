//convenient breakoutjs vars
var IOBoard = BO.IOBoard;
var IOBoardEvent = BO.IOBoardEvent;
var Pin = BO.Pin;
var PinEvent = BO.PinEvent;
var Potentiometer = BO.io.Potentiometer;
var PotEvent = BO.io.PotEvent;
var LED = BO.io.LED;
var Oscillator = BO.generators.Oscillator;

// arduino board
var arduino = new IOBoard(location.hostname, 8887);

// maps the position and its related video
var videoMap = 
[
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
	//transitionEnd();
	//initArduino();
}

/**
 * From the "centre" to the "prison"
 */
var centreToPrison = 
{
'end': 'prison',
'moves': [
	 {'top':'25.5%', 'left':'46.75%', 'duration':'1.5'},
	 {'top':'15.65%', 'left':'46.95%', 'duration':'1.5'},
	 {'top':'15%', 'left':'47.3%', 'duration':'0.16'}
    ]
};

/**
 * From the "prison" to the "centre"
 */
var prisonToCentre = 
{
'end': 'centre',
'moves': [
	 {'top':'15.65%', 'left':'46.95%', 'duration':'0.16'},
	 {'top':'25.5%', 'left':'46.75%', 'duration':'1.5'},
	 {'top':'31.3%', 'left':'39.7%', 'duration':'1.5'}
    ]
};

/**
 * From the "prison" to the "cimetiere"
 */
var prisonToCimetiere = 
{
'end': 'cimetiere',
'moves': [
	 {'top':'13.5%', 'left':'41.6%', 'duration':'1'},
	 {'top':'10.7%', 'left':'46.1%', 'duration':'1'}
    ]
};

/**
 * From the "cimetiere" to the "prison"
 */
var cimetiereToPrison = 
{
'end': 'prison',
'moves': [
	 {'top':'13.5%', 'left':'41.6%', 'duration':'1'},
	 {'top':'15%', 'left':'47.3%', 'duration':'1'}	 
    ]
};

/**
 * From the "centre" to the "boucherie"
 */
var centreToBoucherie = 
{
'end': 'boucherie',
'moves': [
	 {'top':'27.55%', 'left':'32.25%', 'duration':'1.3'},
	 {'top':'23.25%', 'left':'32.05%', 'duration':'0.75'},
	 {'top':'22.8%', 'left':'31.2%', 'duration':'0.16'}
    ]
};

/**
 * From the "boucherie" to the "centre"
 */
var boucherieToCentre = 
{
'end': 'centre',
'moves': [
	 {'top':'23.25%', 'left':'32.05%', 'duration':'0.16'},
	 {'top':'27.55%', 'left':'32.25%', 'duration':'0.75'},
	 {'top':'31.3%', 'left':'39.7%', 'duration':'1.3'}
	 ]
};

/**
 * From the "boucherie" to the "tour"
 */
var boucherieToTour = 
{
'end': 'tour',
'moves': [
	 {'top':'20.1%', 'left':'36.5%', 'duration':'1'},
    ]
};

/**
 * From the "tour" to the "boucherie"
 */
var tourToBoucherie = 
{
'end': 'boucherie',
'moves': [
	 {'top':'22.8%', 'left':'31.2%', 'duration':'1'}
    ]
};

/**
 * From the "centre" to the "mur"
 */
var centreToMur = 
{
'end': 'mur',
'moves': [
	 {'top':'33.2%', 'left':'37.3%', 'duration':'0.5'},
	 {'top':'28.2%', 'left':'36.3%', 'duration':'0.3'},
	 {'top':'30.7%', 'left':'32.8%', 'duration':'0.8'}
    ]
};

/**
 * From the "mur" to the "centre"
 */
var murToCentre = 
{
'end': 'centre',
'moves': [
	 {'top':'28.2%', 'left':'36.3%', 'duration':'0.8'},
	 {'top':'33.2%', 'left':'37.3%', 'duration':'0.3'},
	 {'top':'31.3%', 'left':'39.7%', 'duration':'0.5'}
    ]
};

/**
 * From the "mur" to the "hippodrome"
 */
var murToHippodrome = 
{
'end': 'hippodrome',
'moves': [
	 {'top':'32.9%', 'left':'30.1%', 'duration':'0.65'},
	 {'top':'43.5%', 'left':'30.3%', 'duration':'1.5'},
	 {'top':'44.5%', 'left':'29.6%', 'duration':'0.16'}
    ]
};

/**
 * From the "hippodrome" to the "mur"
 */
var hippodromeToMur = 
{
'end': 'mur',
'moves': [
	 {'top':'43.5%', 'left':'30.3%', 'duration':'0.16'},	 
	 {'top':'32.9%', 'left':'30.1%', 'duration':'1.5'},
	 {'top':'30.7%', 'left':'32.8%', 'duration':'0.65'}
    ]
};

/**
 * From the "centre" to the "usine"
 */
var centreToUsine = 
{
'end': 'usine',
'moves': [
	 {'top':'34.6%', 'left':'45.9%', 'duration':'1'},
	 {'top':'39.3%', 'left':'46%', 'duration':'0.5'},
	 {'top':'41.9%', 'left':'50.1%', 'duration':'0.7'}
    ]
};

/**
 * From the "usine" to the "centre"
 */
var usineToCentre = 
{
'end': 'centre',
'moves': [
	 {'top':'39.3%', 'left':'46%', 'duration':'0.7'},
	 {'top':'34.6%', 'left':'45.9%', 'duration':'0.5'},
	 {'top':'31.3%', 'left':'39.7%', 'duration':'1'}
	]
};

/**
 * From the "usine" to "erdre"
 */
var usineToErdre = 
{
'end': 'erdre',
'moves': [
	 {'top':'44.5%', 'left':'53.9%', 'duration':'0.7'},
	 {'top':'28.2%', 'left':'55.2%', 'duration':'1'},
	 {'top':'30.9%', 'left':'61.6%', 'duration':'1'},
	 {'top':'47.9%', 'left':'60.8%', 'duration':'1.5'},
	 {'top':'48.9%', 'left':'61.8%', 'duration':'0.16'}
    ]
};

/**
 * From the "erdre" to "usine"
 */
var erdreToUsine = 
{
'end': 'usine',
'moves': [
	 {'top':'47.9%', 'left':'60.8%', 'duration':'0.16'},
	 {'top':'30.9%', 'left':'61.6%', 'duration':'1.5'},
	 {'top':'28.2%', 'left':'55.2%', 'duration':'1'},
	 {'top':'44.5%', 'left':'53.9%', 'duration':'1'},
	 {'top':'41.9%', 'left':'50.1%', 'duration':'0.7'}	 
    ]
};

//maps of positions
var east = 
[
 {'src':'boucherie', 'target':boucherieToCentre},
 {'src':'centre', 'target':centreToUsine},
 {'src':'usine', 'target':usineToErdre}
];

var west = 
[
 {'src':'erdre', 'target':erdreToUsine},
 {'src':'usine', 'target':usineToCentre},
 {'src':'prison', 'target':prisonToCimetiere},
 {'src':'centre', 'target':centreToBoucherie}
];
var north = 
[
 {'src':'hippodrome', 'target':hippodromeToMur},
 {'src':'mur', 'target':murToCentre},
 {'src':'centre', 'target':centreToPrison},
 {'src':'boucherie', 'target':boucherieToTour}
];
var south = 
[
 {'src':'cimetiere', 'target':cimetiereToPrison},
 {'src':'prison', 'target':prisonToCentre},
 {'src':'centre', 'target':centreToMur},
 {'src':'mur', 'target':murToHippodrome},
 {'src':'tour', 'target':tourToBoucherie}
];

function move(json) {
	// the timeline handling the move
	var tl = new TimelineMax();//{onComplete:move, onCompleteParams:[]});	
	tl.pause();
	// constructs the move
	$.each(json.moves, function() {
		var op = this.opacity === undefined? 1 : this.opacity;
		tl.to($('#car'), this.duration, {css:{top:this.top, left:this.left, opacity:op}, ease:Linear.easeNone});
    });
	// adds end effects
	tl.to($('#car'), 0.5, {css:{scale:4, rotation:360}, ease:Linear.easeNone})
      .to($('#car'), 0.5, {css:{scale:1, rotation:360}, ease:Linear.easeNone});
	// changes the css class to know where is the map marker
	tl.call(function() {
		$('#car').removeClass().addClass(json.end);
	})
	tl.play();
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
	        case 37: // west
				changePosition(west);
	        break;
	        
	        case 38: // north
				changePosition(north);
	        break;

	        case 39: // east
				changePosition(east);				
	        break;

	        case 40: // south
				changePosition(south);				
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
	// gets the current css class name of the #car dom element
	var className = $("#car").attr('class');
	// iterates over the json message to find the class name in the src attribute
	$.each(json, function() {
        if (this.src == className) {
        	move(this.target);
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
	// get the pin number and the value
	var pin = evt.target.number;
	var value = evt.target.value;
	console.log("pin " + pin +" : " + value);
	// launches the right move given the pin
	switch (pin) {
		case 2: // north
			changePosition(north);
	        break;
		case 3: // south
			changePosition(south);
	        break;
		case 4: // west
			changePosition(west);
	        break;
		case 5: // east
			changePosition(east);
			break;
		case 6:
			break;
		case 7:
			break;
		default:
			break;
	}
}