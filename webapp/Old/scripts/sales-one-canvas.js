//Notice from Lok
//array that stores the name of element, x, y, width, height and data through the year
//for every element we draw, make sure you pass the above information into the array
//format: trendArray.push(['name-of-element', x, y, width, height,[JanData, FebData,...]]);
//if there is a radius with no width and height, just pass the radius twice
var trendArray=new Array();
function DrawSection (c, x, y, w, h, d)
{

	var sectionColor = d[1]; // this is the color of the section bubble blurb thingy
	var pointerHeight = 44; // this is the height of the little top thingy
	var pointerDistance = d[0]; // this is the distance from x where the pointer will be placed
	var cornerCurveSize = 33; // this is the radius of the corner curve

	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	// draw section
	context.beginPath();
	context.moveTo(x, y + pointerHeight + cornerCurveSize);
	
	// left side
	context.lineTo(x, h);

	// bottom
	context.lineTo(x + w, y + h);

	// right side
	context.lineTo(x + w, y + pointerHeight + cornerCurveSize);

	// check if pointer is too far right
	if (pointerDistance + pointerHeight > w - cornerCurveSize)
	{

		// top right corner
		context.quadraticCurveTo(x + w, y + pointerHeight, x + w - ((x + w - pointerDistance) / 2), y + pointerHeight);

		// pointer right side
		context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + pointerDistance, y);
	}
	else
	{
		// top right corner
		context.quadraticCurveTo(x + w, y + pointerHeight, x + w - cornerCurveSize, y + pointerHeight);

		// top line right side
		context.lineTo(x + pointerDistance + pointerHeight, y + pointerHeight);

		// pointer right side
		context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + pointerDistance, y);
	}

	// check if pointer is too far left
	if (pointerDistance - pointerHeight < cornerCurveSize)
	{
		// pointer left side
		context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + (pointerDistance / 2), y + pointerHeight);

		// top left corner
		context.quadraticCurveTo(x, y + pointerHeight, x, y + pointerHeight + cornerCurveSize);

	}
	else
	{
		// pointer left side
		context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + pointerDistance - pointerHeight, y + pointerHeight);

		// top line left side
		context.lineTo(x + cornerCurveSize, y + pointerHeight);

		// top left corner
		context.quadraticCurveTo(x, y + pointerHeight, x, y + pointerHeight + cornerCurveSize);
	}


	// end draw stuff
	context.closePath();
	context.fillStyle = sectionColor;
	context.fill();

}

function DrawCloud (c, x, y, w, h)
{
	// BUG: Need to add raindrops
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	// draw cloud
	context.beginPath();
	context.moveTo(40*(w/430)+x, 75*(h/180)+y);
	context.bezierCurveTo(x,             95*(h/180)+y,  x,             145*(h/180)+y, 100*(w/430)+x, 145*(h/180)+y);
	context.bezierCurveTo(120*(w/430)+x, 175*(h/180)+y, 190*(w/430)+x, 175*(h/180)+y, 210*(w/430)+x, 145*(h/180)+y);
	context.bezierCurveTo(290*(w/430)+x, 145*(h/180)+y, 290*(w/430)+x, 115*(h/180)+y, 260*(w/430)+x, 95*(h/180)+y);
	context.bezierCurveTo(300*(w/430)+x, 35*(h/180)+y,  240*(w/430)+x, 25*(h/180)+y,  210*(w/430)+x, 45*(h/180)+y);
	context.bezierCurveTo(190*(w/430)+x, y,             120*(w/430)+x, 15*(h/180)+y,  120*(w/430)+x, 45*(h/180)+y);
	context.bezierCurveTo(70*(w/430)+x,  y,             20*(w/430)+x,  15*(h/180)+y,  40*(w/430)+x,  75*(h/180)+y);
	context.closePath();

	// make gradient
	var grd = context.createRadialGradient(238*(w/430)+x, 50*(h/180)+y, 10*(w/430), 238*(w/430)+x, 50*(h/180)+y, 200*(w/430));
	grd.addColorStop(0, "#dddddd"); // light grey
	grd.addColorStop(1, "#555555"); // dark grey
	context.fillStyle = grd;
	context.fill();

}


function DrawSun (c, x, y, r)
{
	// BUG: Need to add sunbeams
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	var centerX = x;
	var centerY = y;
	var radius = r; 

	context.beginPath();
	context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
	context.fillStyle = "#FFEF00";
	context.fill();
}

function DrawX (c, x, y)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	context.beginPath();
	context.moveTo(0, y);
	context.lineTo(canvas.width, y);
	context.lineWidth = 1;
	context.strokeStyle = "#ff0000";
	context.stroke();

	context.beginPath();
	context.moveTo(x, 0);
	context.lineTo(x, canvas.height);
	context.lineWidth = 1;
	context.strokeStyle = "#ff0000";
	context.stroke();

}
function DrawHouse (c, x, y, h)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	var houseColor = "#C04000";
	var windowColor = "#F0F8FF";
	var doorColor = "#808080";

	// draw house
	context.beginPath();
	context.moveTo(2*(h/10)+x,8*(h/10)+y);
	context.lineTo(2*(h/10)+x,3*(h/10)+y);
	context.lineTo(0*(h/10)+x,3*(h/10)+y);
	context.lineTo(2*(h/10)+x,1*(h/10)+y);
	context.lineTo(6*(h/10)+x,1*(h/10)+y);
	context.lineTo(6*(h/10)+x,0*(h/10)+y);
	context.lineTo(7*(h/10)+x,0*(h/10)+y);
	context.lineTo(7*(h/10)+x,1*(h/10)+y);
	context.lineTo(8*(h/10)+x,1*(h/10)+y);
	context.lineTo(10*(h/10)+x,3*(h/10)+y);
	context.lineTo(8*(h/10)+x,3*(h/10)+y);
	context.lineTo(8*(h/10)+x,8*(h/10)+y);
	context.fillStyle = houseColor;
	context.fill();

	// draw left window
	context.beginPath();
	context.moveTo(3*(h/10)+x,3*(h/10)+y);
	context.lineTo(4*(h/10)+x,3*(h/10)+y);
	context.lineTo(4*(h/10)+x,4*(h/10)+y);
	context.lineTo(3*(h/10)+x,4*(h/10)+y);
	context.fillStyle = windowColor;
	context.fill();

	// draw right window
	context.beginPath();
	context.moveTo(6*(h/10)+x,3*(h/10)+y);
	context.lineTo(7*(h/10)+x,3*(h/10)+y);
	context.lineTo(7*(h/10)+x,4*(h/10)+y);
	context.lineTo(6*(h/10)+x,4*(h/10)+y);
	context.fillStyle = windowColor;
	context.fill();

	// draw door
	context.beginPath();
	context.moveTo(5*(h/10)+x,6*(h/10)+y);
	context.lineTo(6*(h/10)+x,6*(h/10)+y);
	context.lineTo(6*(h/10)+x,8*(h/10)+y);
	context.lineTo(5*(h/10)+x,8*(h/10)+y);
	context.fillStyle = doorColor;
	context.fill();

}

function DrawSpirograph (c, x, y)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	// values needed to generate spirograph
	var fixedCircleRadius = 200;
	var movingCircleRadius = -101;
	var height = 201;

	// other vars
	var pX = 0;
	var pY = 0;
	var t = 0;

	// move to starting point
	pX = (fixedCircleRadius - movingCircleRadius)*Math.cos(t) + height*Math.cos(((fixedCircleRadius-movingCircleRadius)/movingCircleRadius)*t);
	pY = (fixedCircleRadius - movingCircleRadius)*Math.sin(t) - height*Math.sin(((fixedCircleRadius-movingCircleRadius)/movingCircleRadius)*t);
	context.moveTo(pX + x,pY + y);
	context.beginPath();

	// then draw the line
	for (t = 0; t < 5300; t = t + .01)
	{
		pX = (fixedCircleRadius - movingCircleRadius)*Math.cos(t) + height*Math.cos(((fixedCircleRadius-movingCircleRadius)/movingCircleRadius)*t);
		pY = (fixedCircleRadius - movingCircleRadius)*Math.sin(t) - height*Math.sin(((fixedCircleRadius-movingCircleRadius)/movingCircleRadius)*t);
		context.lineTo(x + pX,y + pY);

	}
	context.lineWidth = .5;
	context.strokeStyle = "#ff0000";
	context.stroke();
}

function DrawPerson (c, x, y, h)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	var lineWidth = h/10;
	var headRadius = h/10;

	// draw head
	context.beginPath();
	context.arc(x+lineWidth*2.4, y+headRadius, headRadius * .95, 0, 2 * Math.PI, false);
	context.fillStyle = "#000000";
	context.fill();

	// draw left leg
	context.beginPath();
	context.moveTo(x + lineWidth*1.65, y+h*3/5);
	context.lineTo(x + lineWidth*1.65, y+h);
	context.lineWidth = lineWidth;
	context.lineCap = "round";
	context.strokeStyle = "#000000";
	context.stroke();

	// draw right leg
	context.beginPath();
	context.moveTo(x+lineWidth*3.15, y+h*3/5);
	context.lineTo(x+lineWidth*3.15, y+h);
	context.lineWidth = lineWidth;
	context.lineCap = "round";
	context.strokeStyle = "#000000";
	context.stroke();

	// draw body
	context.beginPath();
	context.moveTo(x+lineWidth*2.4, y+headRadius*2);
	context.lineTo(x+lineWidth*2.4, y+h*3/5);
	context.lineWidth = lineWidth*5/2;
	context.lineCap = "butt";
	context.strokeStyle = "#000000";
	context.stroke();

	// draw left arm
	context.beginPath();
	context.moveTo(x+lineWidth*.5, y+headRadius*2+lineWidth/2);
	context.lineTo(x+lineWidth*.5, y+h*3/5);
	context.lineWidth = lineWidth*4/5;
	context.lineCap = "round";
	context.strokeStyle = "#000000";
	context.stroke();

	// draw right arm
	context.beginPath();
	context.moveTo(x+lineWidth*4.3, y+headRadius*2+lineWidth/2);
	context.lineTo(x+lineWidth*4.3, y+h*3/5);
	context.lineWidth = lineWidth*4/5;
	context.lineCap = "round";
	context.strokeStyle = "#000000";
	context.stroke();

}

function Retail_Sale(c, x, y, w, h, d) {
// d = [date, display value]
var date = d[0];
//clearCanvas(c);
var canvas = document.getElementById(c);
var ctx = canvas.getContext("2d");
ctx.scale(w/77,h/76);
x = x/(w/77);
y = y/(h/76);
var img01 = new Image();
img01.src = 'images/retail_car.png';

//draw rectangle in the back of the image
//x,y, width, height
var fillHeight = (d[1]) / -4;
if (fillHeight < -70) {
fillHeight = -70;
}
ctx.fillStyle = "white";
ctx.fillRect(x+25, y+110, 110, -70);
ctx.fillStyle = "#EEEE00";
ctx.fillRect(x+25, y+110, 110, fillHeight);
img01.onload = function () {
ctx.drawImage(img01, x, y, img01.width * 2, img01.height * 2);
ctx.fillStyle = "white";
//draw text
ctx.font = "bold 28pt Calibri";
ctx.fillText(monthname[date.getMonth()], x+51, y+135);
ctx.fillText(d[1], x+47, y+37);
}
}

function Used_Vehicle_Sale(c, x, y, w, h, d) {
//clearCanvas(c);
var canvas = document.getElementById(c);
var ctx = canvas.getContext("2d");
ctx.scale(w/150,h/130);
x = x/(w/150);
y = y/(h/130);

ctx.fillStyle = "black";
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
//outer rectangle
ctx.roundRect(x+0, y, 150, 130, 5).stroke();
//inner rectangle
ctx.roundRect(x+5, y+5, 140, 120, 5).stroke();
//fill the inner rectangle
ctx.fill();
ctx.beginPath();
//color of the "FOR SALE" text
ctx.font = "bold 20pt Calibri";
ctx.fillStyle = "#EEEE00";
ctx.fillText("FOR SALE", x+10, y+30);

ctx.beginPath();
ctx.fillStyle = "white";
//rectangle for date display
ctx.fillRect(x+10, y+40, 130, 35);
//rectangle for data display
ctx.fillRect(x+10, y+80, 130, 35);


ctx.fillStyle = "black";

//date
ctx.fillText(monthname[d[0].getMonth()] +" "+d[0].getFullYear().toString().substr(2, 3), x+35, y+70);
//data
ctx.fillText(d[1], x+60, y+110);
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
/*
This function draw the rectangle with round corner
parameter: x, y: position of the left top corner
w, h: width, height
r: radius of the corners
*/
if (w < 2 * r) r = w / 2;
if (h < 2 * r) r = h / 2;
this.beginPath();
this.moveTo(x + r, y);
this.arcTo(x + w, y, x + w, y + h, r);
this.arcTo(x + w, y + h, x, y + h, r);
this.arcTo(x, y + h, x, y, r);
this.arcTo(x, y, x + w, y, r);
this.closePath();
return this;
}

function Cost_Per_Sale(c, x, y, w, h, d) {
//clearCanvas(c);
var canvas = document.getElementById(c);
var ctx = canvas.getContext("2d");
ctx.scale(w/122,h/80);
x = x/(w/122);
y = y/(h/80);

var img02 = new Image();
img02.src = 'images/cost_per_sale.png';

ctx.fillStyle = "green";
//draw rectangle in the back of the image
//x,y, width, height
img02.onload = function () {
ctx.drawImage(img02, x, y, img02.width * 1.5, img02.height * 1.5);
ctx.fillStyle = "green";
//draw textChalkboard
//ctx.font = "bold 18pt Quartz MS"; ///	windows only
ctx.font = "bold 28pt MarkerFelt-Thin";
ctx.fillText(monthname[d[0].getMonth()], x+65, y+117);
ctx.font = "bold 38pt MarkerFelt-Thin";
ctx.fillText(d[1], x+65, y+75);
}
}

function Pump_In_Sale(c, x, y, w, h, d) {
//clearCanvas(c);
// BUG: bottom most text may extend over max defined width. if last
// piece of data is small, allow some extra room on the canvas for
// slightly overextended text.

var canvas = document.getElementById(c);
var context = canvas.getContext("2d");
var blX = x; // bottom left
var blY = y + h;
var trX = x + w; // top right
var trY = y;
var midX = x + (w / 2);
var midY = y + (h / 2);
var controlX = x;
var controlY = y;

d.sort(); // puts the smallest data on top

// find sum of all data for spacing
var i = 0;
var sum = 0;
for (i = 0; i < d.length; i = i + 1) {
sum = sum + parseInt(d[i][0]);
}

// draw first line of figure
context.beginPath();
context.moveTo(blX, blY);
midY = y;
context.quadraticCurveTo(controlX, midY, midX, midY);
context.quadraticCurveTo(trX, midY, trX, trY);
context.quadraticCurveTo(trX, blY, midX, blY);
context.quadraticCurveTo(controlX, blY, blX, blY);
//context.strokeStyle = "#000000";
context.fillStyle = d[0][2];
context.fill();


// draw lines to finish figure
for (i = 0; i < d.length; i = i + 1) {
context.beginPath();
context.moveTo(blX, blY);
var temp = ((d[i][0] / sum) * h)
midY = midY + temp;
context.quadraticCurveTo(controlX, midY, midX, midY);
context.quadraticCurveTo(trX, midY, trX, trY);
context.quadraticCurveTo(trX, blY, midX, blY);
context.quadraticCurveTo(controlX, blY, blX, blY);

if (i + 1 == d.length) {
context.fillStyle = d[i][2];
} else {
context.fillStyle = d[i + 1][2];
}
//context.strokeStyle = "black";
context.fill();

// Draw text
var text_size = 14;
if (temp < text_size) {
text_size = temp;
}
if (text_size < 8) {
text_size = 8;
}
context.font = "bold " + text_size + "pt Calibri";
context.fillStyle = "#ffffff";
context.fillText(d[i][1], (midX - (w / 7)), midY - temp / 2 + text_size / 2);
}
}

window.onload = function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	//context.canvas.width  = window.innerWidth;
	//context.canvas.height = window.innerHeight;

	// data
	var month = "May";
	var year = "2012";

	// fake kpi
	var kpiRetailSales = "1467";
	var kpiUsedVehicleSales = "1467";
	var date = new Date;

// BACKGROUND SECTION

	// fill background
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#ffffff";
	context.fill();

	// draw image
	var imgBackground = new Image();
	imgBackground.src = "images/light_rock.jpg";
	var imgSplitter = new Image();
	imgSplitter.src = "images/splitter.png";
	context.drawImage(imgBackground, 0, 0); // I don't draw using a function because if i do, the elements draw out of order
	context.drawImage(imgBackground, 570, 0);
	context.drawImage(imgBackground, 0, 210);
	context.drawImage(imgBackground, 570, 210);
	context.drawImage(imgSplitter, 0, 747, canvas.width, 200);  // however, not using a draw function means that this rarely appears... BUGGGGGG!

	// draw circles
	context.beginPath(); // top left
	context.arc(canvas.width/4, 200, 120, 0, 2 * Math.PI, false);
	context.fillStyle = "#7CFC00";
	context.fill();

	context.beginPath(); // top right
	context.arc((canvas.width/2) + 290, 200, 120, 0, 2 * Math.PI, false);
	context.fillStyle = "#7CFC00";
	context.fill();

	context.beginPath(); // middle left
	context.arc(canvas.width/4, 490, 120, 0, 2 * Math.PI, false);
	context.fillStyle = "#7CFC00";
	context.fill();

	context.beginPath(); // bottom left
	context.arc(canvas.width/4, 780, 120, 0, 2 * Math.PI, false);
	context.fillStyle = "#7CFC00";
	context.fill();

	context.beginPath(); // vertical line
	context.moveTo(canvas.width/4, 200);
	context.lineTo(canvas.width/4, 780);
	context.lineWidth = 77;
	context.lineCap = "butt";
	context.strokeStyle = "#7CFC00";
	context.stroke();

	context.beginPath(); // horizontal line
	context.moveTo(canvas.width/4, 200);
	context.lineTo(canvas.width/2 + 290, 200);
	context.lineWidth = 77;
	context.lineCap = "butt";
	context.strokeStyle = "#7CFC00";
	context.stroke();

	var imageObj = new Image();
 
	imageObj.onload = function(){
		context.drawImage(imageObj, canvas.width/4-111, 650);
	};
	imageObj.src = "images/PointingDude.png";


// GRAPHICS SECTION
	Retail_Sale("myCanvas", canvas.width/4-71, 123, 77, 76, [date, kpiRetailSales]);
	Used_Vehicle_Sale("myCanvas", canvas.width/4-71, 433, 150, 130, [date, kpiUsedVehicleSales]);
	Cost_Per_Sale("myCanvas", canvas.width/2 + 290 - 88, 130, 122, 80, [date, kpiUsedVehicleSales]);
	Pump_In_Sale("myCanvas", canvas.width/4+212, 330, canvas.width - (canvas.width/4+212), 370, [[3, "Anytown Automotives", "#ff9b00"],[33, "Anytown Automotive", "#ff9bff"],[3, "aeostnh Automotive", "#5555ff"]]);
	//DrawX("myCanvas",100, 600);
	
// TEXT SECTION


//ARRAY OF ELEMENTS INFOMATION

	trendArray.push(['Retail Sale', canvas.width/4-71, 123, 152, 152,GetTrendKPI(date, 'Retail_Sale'),'Description']);
	trendArray.push(['Used Vehicle Sale', canvas.width/4-71, 433, 150, 130,GetTrendKPI(date, 'Used_Vehicle_Sale'),'Description']);
	trendArray.push(['Cost Per Sale', canvas.width/2 + 202, 130, 122, 80,GetTrendKPI(date, 'Cost_Per_Sale'),'Description']);
	trendArray.push(['Pump In Sale', canvas.width/4+212, 330, canvas.width - (canvas.width/4+212), 370,GetTrendKPI(date, 'Pump_In_Sale'),'Description']);

};



//DIALOG BOX HANDLING
/*
	$(document).bind("touchstart click", function(event){
		//	Testing for area of Retail Sale
			var canvas = document.getElementById("myCanvas");
			var context = canvas.getContext("2d");
				context.strokeStyle ="red";
				context.beginPath();
				context.moveTo(canvas.width/4-71,123);
				context.lineTo(canvas.width/4-71,123+152);
				context.lineTo(canvas.width/4-71+152,123+152);
				context.stroke();
		
		event.preventDefault();
		//http://stackoverflow.com/questions/4780837/is-there-an-equivalent-to-e-pagex-position-for-touchstart-event-as-there-is-fo
		//alert(event.originalEvent.touches[0].pageX);
		$('#status').html('X: '+event.originalEvent.touches[0].pageX);

		for(var i=0;i <trendArray.length;i++ )
		{
			//check if touching the element location
			if(event.originalEvent.touches[0].pageX>trendArray[i][1] && event.originalEvent.touches[0].pageX<(trendArray[i][1]+trendArray[i][3]) && event.originalEvent.touches[0].pageY>trendArray[i][2] && event.originalEvent.touches[0].pageY <(trendArray[i][2]+trendArray[i][4]))
			{
				popup('<p>hiiiiii</p><p>hiiiiii</p><p>hiiiiii</p><p>hiiiiii</p><p>hiiiiii</p><p>hiiiiii</p><p>hiiiiii</p><p>hiiiiii</p>');
			}
			
			//for mouse click on computer
			/*
			if(event.pageX>trendArray[i][1] && event.pageX<(trendArray[i][1]+trendArray[i][3]) && event.pageY>trendArray[i][2] && event.pageY <(trendArray[i][2]+trendArray[i][4]))
			{
				popup('<p>hiiiiii</p>');
			}
			//
		}

	});
*/
$(document).ready(function () {
	// if user clicked on button, the overlay layer or the dialogbox, close the dialog	
	$('#dialog-overlay, #dialog-box').bind("touchstart click", function () {		
		$('#dialog-overlay, #dialog-box').hide();		
		return false;
	});
	
	// if user resize the window, call the same function again
	// to make sure the overlay fills the screen and dialogbox aligned to center	
	$(window).resize(function () {
		
		//only do it if the dialog box is not hidden
		if (!$('#dialog-box').is(':hidden')) popup();		
	});		
});

function popup(message) {
	// get the screen height and width  
	var maskHeight = $(document).height();  
	var maskWidth = $(window).width();
	
	// calculate the values for center alignment
	var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());  
	var dialogLeft = (maskWidth/2) - ($('#dialog-box').width()/2); 
	
	// assign values to the overlay and dialog box
	$('#dialog-overlay').css({height:maskHeight, width:maskWidth}).show();
	$('#dialog-box').css({top:dialogTop, left:dialogLeft}).show();
	
	// display the message
	$('#dialog-message').html(message);
			
}
























