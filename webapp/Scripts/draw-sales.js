//Notice from Lok
//array that stores the name of element, x, y, width, height and data through the year
//for every element we draw, make sure you pass the above information into the array
//format: trendArray.push(['name-of-element', x, y, width, height,[JanData, FebData,...]]);
//if there is a radius with no width and height, just pass the radius twice
var trendArray=new Array();
window.DrawSalesInfographic = function DrawSalesInfographic (c,date)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	//    |\   | \   __   . . .
	//    | |  | /  /  \  | | |
	//    | |  |<   |--|  | | |
	//    |/   | \  |  |   v v    some stuff

    context.fillStyle = "#ffffff";
    context.clearRect(0, 0, canvas.width, canvas.height);

	// fill the top section of the background with a gradient
	context.beginPath();
	var grd = context.createLinearGradient(canvas.width/2, 0, canvas.width/2, 747);
	grd.addColorStop(1, "#93c572");
	grd.addColorStop(0, "#cccccc");
	context.fillStyle = grd;
	context.rect(0, 0, canvas.width, 747);
	context.fill();

	// draw stripes over the gradient
	DrawStripes(c, 0, 0, canvas.width, 747, "#eeeeee");

	// draw the splitter image
	var imgSplitter = new Image();
	imgSplitter.onload = function(){
		context.drawImage(imgSplitter, 0, 747, canvas.width, 200); // below the stripes
		context.drawImage(imgSplitter, 0, 1547, canvas.width, 200); // below the grey area
		DrawCanvasPart2(c,date);  // drawing the entire canvas must be broken up in to multiple functions when loading an image to avoid race condition of background drawing over foreground
	}
	imgSplitter.src = "images/splitter.png";
};

function DrawCanvasPart2 (c,date)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");
	// draw circles
    context.save();
	var circleColor = "#ededed"
	context.fillStyle = circleColor;
	context.strokeStyle = circleColor;

	context.beginPath(); // top left
	context.arc(canvas.width/4, 200, 120, 0, 2 * Math.PI, false);
	context.fill();

	context.beginPath(); // top right
	context.arc((canvas.width/2) + 290, 200, 120, 0, 2 * Math.PI, false);
	context.fill();

	context.beginPath(); // middle left
	context.arc(canvas.width/4, 490, 120, 0, 2 * Math.PI, false);
	context.fill();

	context.beginPath(); // bottom left
	context.arc(canvas.width/4, 780, 120, 0, 2 * Math.PI, false);
	context.fill();

	context.lineWidth = 77; // define line properties
	context.lineCap = "butt";

	context.beginPath(); // vertical line
	context.moveTo(canvas.width/4, 200);
	context.lineTo(canvas.width/4, 780);
	context.stroke();

	context.beginPath(); // horizontal line
	context.moveTo(canvas.width/4, 200);
	context.lineTo(canvas.width/2 + 290, 200);
	context.stroke();
    context.restore();
	// draw some elements on top of the circles
	Used_Vehicle_Sale(c, canvas.width/4-75, 135, 150, 130, [date, GetKPI(date, "Used_Vehicle_Sales")]);
	Retail_Sale(c, canvas.width/4-75, 415, 77, 76, [date, GetKPI(date, "Retail_Sales")]);
	Cost_Per_Sale(c, canvas.width/2 + 290 - 88, 130, 122, 80, [date, GetKPI(date, "Cost_Per_Sale")]);
	Pump_In_Sale(c, canvas.width/4+212, 330, canvas.width - (canvas.width/4+212), 370, [[GetKPI(date, "Pump_In_Sales_Anytown_Automotive"), "Anytown Automotive", "#ff9b00"], [GetKPI(date, "Pump_In_Sale_Allan_Automart"), "Allan Automart", "#f54c08"], [GetKPI(date, "Pump_In_Sale_Jefferson_Automotive"), "Jefferson Automotive", "#b4213f"], [GetKPI(date, "Pump_In_Sale_Nestor_Auto_Center"), "Nestor Auto Center", "#69039d"], [GetKPI(date, "Pump_In_Sale_Diamond_Automotive"), "Diamond Automotive", "#283577"], [GetKPI(date, "Pump_In_Sale_Anthony_Motors"), "Anthony Motors", "#66a5c7"]]);

	//Array of elements infomation
	/*!!! you have to add 207px(height of header picture) to y !!!*/
	//var dataArray = GetTrendKPI(date, 'Retail_Sales');
	var offset = 100;
	//alert(GetTrendKPI(date, 'Retail_Sales')[0][1]);
	trendArray.push(['Retail Sale', canvas.width/4-71, 415+offset, 152, 152,GetTrendKPI(date, 'Retail_Sales'),'<p>The term Retail Sales refers to new vehicles that are registered to individuals or companies that register a small number of vehicles annually.</p>']);
	/////trendArray.push(['Retail Sale', canvas.width/4-71, 123+offset, 152, 152,dataArray,'Description']);

	trendArray.push(['Used Vehicle Sale', canvas.width/4-75, 135+offset, 150, 130,GetTrendKPI(date, 'Used_Vehicle_Sales'),'<p>Used vehicle sales refer to the used vehicles that are sold to individuals</p>']);
	trendArray.push(['Cost Per Sale', canvas.width/2 + 202, 130+offset, 240, 192,GetTrendKPI(date, 'Cost_Per_Sale'),'<p>The amount of money spent by purchasing leads for each vehicle sold</p>']);
	trendArray.push(['Pump In Sale', canvas.width/4+212, 330+offset, canvas.width - (canvas.width/4+212), 370,[[GetTrendKPI(date, 'Pump_In_Sales_Anytown_Automotive'),"#ff9b00","Anytown Automotive"],[GetTrendKPI(date, 'Pump_In_Sale_Allan_Automart'),"#f54c08","Allan Automart"],[GetTrendKPI(date, 'Pump_In_Sale_Jefferson_Automotive'),"#b4213f","Jefferson Automotive"],[GetTrendKPI(date, 'Pump_In_Sale_Nestor_Auto_Center'),"#69039d","Nestor Auto Center"],[GetTrendKPI(date, 'Pump_In_Sale_Diamond_Automotive'),"#283577","Diamond Automotive"],[GetTrendKPI(date, 'Pump_In_Sale_Anthony_Motors'),"#66a5c7","Anthony Motors"]],'<p>Pump-In is the distribution of sales into the PMA by any brand dealer.</p>']);


	// get some text on the screen
    context.save();
	context.font = "bold 19pt Calibri";
	context.fillStyle = "#ffffff";
	context.shadowColor = "#000000";
	context.shadowBlur = 6;
	context.fillText("Used Vehicle Sales", 157, 125);
	context.fillText("Retail Sales", 189, 405);
	context.fillText("Cost Per Sale", 723, 125);
	context.fillText("Pump In Sale", 180, 690);
    context.restore();
	// draw the pointing dude
	var imageObj = new Image();

	imageObj.onload = function(){
		context.drawImage(imageObj, canvas.width/4-111, 648);
		DrawCanvasPart3(c,date);
	};
	imageObj.src = "images/PointingDude.png";

}

function DrawCanvasPart3(c,date)
{
	var canvas = document.getElementById(c);
	var context = canvas.getContext("2d");

	// draw grey background below splitter image
	//context.fillStyle = "#333333";
	//context.rect(0,947, canvas.width, 300);
	DrawSection(c, 0, 903, canvas.width, 300, [0, "#333333"]);

	context.save();
	context.translate(canvas.width, 1291);
	context.rotate(Math.PI);
	DrawSection(c, 0, 0, canvas.width, 300, [0, "#333333"]);
	context.restore();

	DrawSection(c, 0, 1203, canvas.width, 300, [0, "#444444"]);

	context.save();
	context.translate(canvas.width, 1591);
	context.rotate(Math.PI);
	DrawSection(c, 0, 0, canvas.width, 300, [0, "#444444"]);
	context.restore();
	//context.fill();

	// draw some elements over the grey midsection

	context.font = "30pt Calibri";
	context.fillStyle = "#ffffff";

	// Dealer
	context.save();
	context.translate(200, 1150);
	context.rotate(-0.42);
	context.fillText("D", -15, -105);
	context.rotate(0.22);
	context.fillText("e", -10, -105);
	context.rotate(0.15);
	context.fillText("a", -9, -105);
	context.rotate(0.15);
	context.fillText("l", -6, -105);
	context.rotate(0.14);
	context.fillText("e", -10, -105);
	context.rotate(0.16);
	context.fillText("r", -9, -105);
	context.restore();

	// Retention
	context.save();
	context.translate(200, 1100);
	context.rotate(.95);
	context.fillText("R", -13, 80);
	context.rotate(-0.31);
	context.fillText("e", -10, 80);
	context.rotate(-0.22);
	context.fillText("t", -6, 80);
	context.rotate(-0.22);
	context.fillText("e", -10, 80);
	context.rotate(-0.26);
	context.fillText("n", -9, 80);
	context.rotate(-0.26);
	context.fillText("t", -6, 80);
	context.rotate(-0.2);
	context.fillText("i", -6, 80);
	context.rotate(-0.21);
	context.fillText("o", -10, 80);
	context.rotate(-0.29);
	context.fillText("n", -9, 80);
	context.restore();


	// Visits Per
	context.save();
	context.translate(800, 1150);
	context.rotate(-0.49);
	context.fillText("V", -15, -105);
	context.rotate(0.16);
	context.fillText("i", -6, -105);
	context.rotate(0.14);
	context.fillText("s", -9, -105);
	context.rotate(0.11);
	context.fillText("i", -6, -105);
	context.rotate(0.1);
	context.fillText("t", -6, -105);
	context.rotate(0.13);
	context.fillText("s", -9, -105);
	context.rotate(0.20);
	context.fillText("P", -9, -105);
	context.rotate(0.18);
	context.fillText("e", -10, -105);
	context.rotate(0.16);
	context.fillText("r", -9, -105);
	context.restore();

	// Customer
	context.save();
	context.translate(800, 1100);
	context.rotate(1);
	context.fillText("C", -13, 80);
	context.rotate(-0.4);
	context.fillText("u", -10, 80);
	context.rotate(-0.29);
	context.fillText("s", -9, 80);
	context.rotate(-0.21);
	context.fillText("t", -6, 80);
	context.rotate(-0.23);
	context.fillText("o", -10, 80);
	context.rotate(-0.3);
	context.fillText("m", -10, 80);
	context.rotate(-0.45);
	context.fillText("e", -10, 80);
	context.rotate(-0.24);
	context.fillText("r", -6, 80);
	context.restore();

	DrawPie(c, 150, 1050, 100, 100, GetKPI(date, "Dealer_Retention"));
    //DrawX(c, 100,1800);
	DrawPie(c, 750, 1050, 100, 100, GetKPI(date, "Visits_Per_Customer"));
	var kpiData = new Array();
    kpiData.push([GetKPI(date,"Competitive_Segment_Sale_Anytown_Automotive"), "Anytown Automotive"]);
    kpiData.push([GetKPI(date,"Competitive_Segment_Sale_Jeff_Williams_Toyotas"),"Jeff Williams Toyota"]);
    kpiData.push([GetKPI(date,"Competitive_Segment_Sale_Uptown_Honda"),"Uptown Honda"]);
    kpiData.push([GetKPI(date,"Competitive_Segment_Sale_Fred_Rodgers_Mazda"),"Fred Rodgers Mazda"]);
    kpiData.push([GetKPI(date,"Competitive_Segment_Sale_Garrett_Ford"),"Garrett Ford"]);
    kpiData.push([GetKPI(date,"Competitive_Segment_Sale_Peter_Lake_Ford"), "Peter Lake Ford"]);
    DrawCompetitiveSegmentSale(c,100,1300,800,200,kpiData);
    DrawPlaid(c,0,1747,canvas.width,400,0);

    context.save();
    context.font = "bold 19pt Calibri";
	context.fillStyle = "#ffffff";
	context.shadowColor = "#000000";
	context.shadowBlur = 6;
	context.fillText("Competitive Segment Sales", 350, 1280);
	context.font = "bold 30pt Calibri";
	context.fillText("Lost Profit", 140, 1850);
    context.restore();

    DrawLostProfit(c, 100, 1850, 200, 200, GetKPI(date, "Lost_Profit"));
    DrawLostSale(c, 600, 1850, 200, 200, GetKPI(date, "Lost_Sales"));

	var offset=100;

	trendArray.push(['Dealer Retention', 150, 1050+offset, 100, 100,GetTrendKPI(date, 'Dealer_Retention'),'<p>Retention refers to the percentage of vehicles registered in your primary market area (PMA) who have visited your dealership for Customer Pay (CP) vehicle service in the last 12 months.</p>']);
	trendArray.push(['Visits Per Customer', 750, 1050+offset, 100, 100,GetTrendKPI(date, 'Visits_Per_Customer'),'<p>Visits per Customer shows the percentage of your customers who returned for CP vehicle service at least two or more times in the last 12 months, ending on the current month.</p>']);
	trendArray.push(['Lost Profit', 100, 1850+offset, 200, 200,GetTrendKPI(date, 'Lost_Profit'),'<p>Lost Profit = the Lost Sales in the MyPMA times the national average Gross Profit per Vehicle plus the Lost Sales times the Lifetime Service Value. </p>']);
	trendArray.push(['Lost Sales', 600, 1850+offset, 200, 200,GetTrendKPI(date, 'Lost_Sales'),'<p>Within a Census Tract, the Lost Sales = Sales Below Expected at the Benchmark + Insell. At the MyPMA level: Lost Sales = Gross Lost Sales + Insell. </p>']);
	trendArray.push(['Competitive Segment Sale', 100, 1300+offset, 800, 200,[[GetTrendKPI(date, 'Competitive_Segment_Sale_Anytown_Automotive'),"#ff9b00", "Anytown Automotive"],[GetTrendKPI(date, 'Competitive_Segment_Sale_Jeff_Williams_Toyotas'),"#f54c08","Jeff Williams Toyotas"],[GetTrendKPI(date, 'Competitive_Segment_Sale_Uptown_Honda'),"#b4213f","Uptown Honda"],[GetTrendKPI(date, 'Competitive_Segment_Sale_Fred_Rodgers_Mazda'),"#69039d","Fred Rodgers Mazda"],[GetTrendKPI(date, 'Competitive_Segment_Sale_Garrett_Ford'),"#283577","Garrett Ford"],[GetTrendKPI(date, 'Competitive_Segment_Sale_Peter_Lake_Ford'),"#66a5c7","Peter Lake Ford"]],'<p>The amount of money spent by purchasing leads for each vehicle sold</p>']);



}

//DIALOG BOX HANG


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

$("#myCanvas").swiperight(function(event, result) {
			event.stopImmediatePropagation();
			wipeStatus("Right",result,1);
});

$("#myCanvas").swipeleft(function(event, result) {
	event.stopImmediatePropagation();
	wipeStatus("Left",result,1);
});

// Author:      Lok Cheung
// Purpose:		Listen for the user to click or touch the elements on the canvas, then call the popup function
$('#myCanvas').bind("touchstart click", function(event){
	var heightFactor=1;
	for(var i=0;i <trendArray.length;i++ )
	{
		//check if user is touching the area within the element
		if(event.pageX>trendArray[i][1] && event.pageX<(trendArray[i][1]+trendArray[i][3]) && event.pageY>trendArray[i][2] && event.pageY <(trendArray[i][2]+trendArray[i][4])) {
			event.preventDefault();
			popup('<table border="0" width="100%">'+
						'<tr>'+
						'<td><canvas id="trendGraph" height="300" width="600"></canvas></td>'+
						'</tr>'+
						'<tr>'+
						'<td>'+trendArray[i][6]+'</td>'+
						'</tr>'+
						'</table>');
			//changing the height factor of each element
			if(trendArray[i][0]=="Pump In Sale" || trendArray[i][0]=="Competitive Segment Sale") {
				if(trendArray[i][0]=="Competitive Segment Sale")
					heightFactor=5;
				for(var j=0;j<trendArray[i][5].length;j++)  {
					drawTrendMul("trendGraph",trendArray[i][5][j][2],trendArray[i][5][j][0],trendArray[i][5][j][1], j,heightFactor);
				}
			} else {
				if(trendArray[i][0]=="Dealer Retention" || trendArray[i][0]=="Visits Per Customer" ){
					heightFactor=220;
				}
				else if (trendArray[i][0]=="Lost Profit"){
					heightFactor=0.00022;
				}
				else if(trendArray[i][0]=="Lost Sales"){
					heightFactor=0.35;
				}
				else{
					heightFactor=1;
				}
				drawTrend(trendArray[i][5],heightFactor);
			}

			//draw x, y axis of the chart
			var canvas = document.getElementById("trendGraph");
			var context = canvas.getContext("2d");

			context.save();
			context.font = "28pt Calibri";
			context.fillStyle = "#0000ff"; // text color
			context.fillText(trendArray[i][0], 170, 30);
			context.restore();

			context.save();
			context.beginPath();
			context.moveTo(120,40);
			context.lineTo(120,220+40);
			context.lineTo(600,220+40);
			context.strokeStyle = "black";
			context.stroke();
			context.restore();
		}
	}
});
