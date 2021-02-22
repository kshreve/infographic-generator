import retailCar from '../images/retail_car.png';
import costPerSale from '../images/cost_per_sale.png'
import car2 from '../images/car2.png'
import puzzle from '../images/puzzle.jpg'
import response from '../images/response.png'
import leadUsed from '../images/lead_usedcar.png'
import leadNew from '../images/lead_newcar.png'
import watcharm from '../images/watcharm.png'
import leadUnopened from '../images/lead_Unopened.png'

// Name: Retail_Sale
// Author: Lok Cheung, Louis Bodnar
// Description: Creates the retail sale infographic element
window.Retail_Sale = function Retail_Sale(c, x, y, w, h, d) {
  // d = [date, display value]
  var date = d[0];
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.scale(w / 77, h / 76);
  x = x / (w / 77);
  y = y / (h / 76);
  var img01 = new Image();
  img01.src = retailCar;

  //draw rectangle in the back of the image
  //x,y, width, height
  var fillHeight = -(d[1] % 70);
  //var fillHeight = (d[1]) / -4;
  if (fillHeight == 0 && d[1] > 70) {
    fillHeight = -70;
  } else if (fillHeight > -50) {
    fillHeight += -40;
  }
  ctx.fillStyle = "white";
  ctx.fillRect(x + 25, y + 110, 110, -70);
  ctx.fillStyle = "#EEEE00";
  ctx.fillRect(x + 25, y + 110, 110, fillHeight);
  img01.onload = function() {
    ctx.drawImage(img01, x, y, img01.width * 2, img01.height * 2);
    ctx.fillStyle = "white";
    //draw text
    ctx.font = "bold 28pt Calibri";
    ctx.fillText(monthname[date.getMonth()], x + 51, y + 135);
    ctx.fillText(addCommas(d[1]), x + 47, y + 37);
  }
  ctx.restore();
}

// Name: Used_Vehicle_Sale
// Author: Lok Cheung
// Description: Creates the used vehicle sales infographic element
window.Used_Vehicle_Sale = function Used_Vehicle_Sale(c, x, y, w, h, d) {
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.scale(w / 150, h / 130);
  x = x / (w / 150);
  y = y / (h / 130);

  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  //outer rectangle
  ctx.roundRect(x + 0, y, 150, 130, 5);
  ctx.stroke();
  //inner rectangle
  ctx.roundRect(x + 5, y + 5, 140, 120, 5).stroke();
  //fill the inner rectangle
  ctx.fill();
  ctx.beginPath();
  //color of the "FOR SALE" text
  ctx.font = "bold 20pt Calibri";
  ctx.fillStyle = "#EEEE00";
  ctx.fillText("FOR SALE", x + 10, y + 30);

  ctx.beginPath();
  ctx.fillStyle = "white";
  //rectangle for date display
  ctx.fillRect(x + 10, y + 40, 130, 35);
  //rectangle for data display
  ctx.fillRect(x + 10, y + 80, 130, 35);

  ctx.fillStyle = "black";
  //date
  ctx.fillText(monthname[d[0].getMonth()] + " " + d[0].getFullYear()
    .toString()
    .substr(2, 3), x + 35, y + 70);
  //data
  ctx.fillText(addCommas(d[1]), x + 60, y + 110);
  ctx.restore();
}

// Usage: Context.roundRect(x,y,w,h,r)
// Author: Lok Cheung
// Description: This function draw the rectangle with round corner
//  parameter: x, y: position of the left top corner
//  w, h: width, height
//  r: radius of the corners
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
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

// Name: Cost Per Sale
// Author: Lok Cheung
// Description: Draws the cost per sale infographic element
window.Cost_Per_Sale = function Cost_Per_Sale(c, x, y, w, h, d) {
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.scale(w / 122, h / 80);
  x = x / (w / 122);
  y = y / (h / 80);

  var img02 = new Image();
  img02.src = costPerSale;

  ctx.fillStyle = "green";
  //draw rectangle in the back of the image
  img02.onload = function() {
    ctx.drawImage(img02, x, y, img02.width * 1.5, img02.height * 1.5);
    ctx.fillStyle = "green";
    //draw textChalkboard
    ctx.font = "bold 28pt MarkerFelt-Thin";
    ctx.fillText(monthname[d[0].getMonth()], x + 65, y + 117);
    ctx.font = "bold 38pt MarkerFelt-Thin";
    ctx.fillText(addCommas(d[1]), x + 65, y + 75);
  }
  ctx.restore();
}

// Name:        Pump_In_Sales
// Author:      Louis Bodnar
// Purpose:     Uses quadratic curves to draw a colorful figure with labeled sections.  Each section's height is relative to its weighted value.
// Arguments:   Pump_In_Sale(canvas_name, x_position, y_position, width, height, data);
// Data format: [[value, label, color], ... ]
// Example:     Pump_In_Sale("myCanvas", 0, 0, 300, 100, [ [53, "Detroit Sales", "#ff0000"], [13, "Chicago Sales", "#9933dd"] ]);
window.Pump_In_Sale = function Pump_In_Sale(c, x, y, w, h, d) {

  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save()
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
  for(i = 0; i < d.length; i = i + 1) {
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
  context.fillStyle = d[0][2];
  context.fill();

  // draw lines to finish figure
  for(i = 0; i < d.length; i = i + 1) {
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
    context.fillStyle = "#FFFFFF";
    context.fillText(d[i][1], x + (w * 11 / 24), midY - temp / 2 + text_size / 2);
  }
  context.restore();
}

// Name: DrawSection
// Author: Louis Bodnar
window.DrawSection = function DrawSection(c, x, y, w, h, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  var sectionColor = d[1]; // this is the color of the section bubble blurb thingy
  var pointerHeight = 44; // this is the height of the little top thingy
  var pointerDistance = d[0]; // this is the distance from x where the pointer will be placed
  var cornerCurveSize = 33; // this is the radius of the corner curve

  // draw section
  context.beginPath();
  context.moveTo(x, y + pointerHeight + cornerCurveSize);

  // left side
  context.lineTo(x, y + h);

  // bottom
  context.lineTo(x + w, y + h);

  // right side
  context.lineTo(x + w, y + pointerHeight + cornerCurveSize);

  // check if pointer is too far right
  if (pointerDistance + pointerHeight > w - cornerCurveSize) {
    // top right corner
    context.quadraticCurveTo(x + w, y + pointerHeight, x + w - ((x + w - pointerDistance) / 2), y + pointerHeight);

    // pointer right side
    context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + pointerDistance, y);
  } else {
    // top right corner
    context.quadraticCurveTo(x + w, y + pointerHeight, x + w - cornerCurveSize, y + pointerHeight);

    // top line right side
    context.lineTo(x + pointerDistance + pointerHeight, y + pointerHeight);

    // pointer right side
    context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + pointerDistance, y);
  }

  // check if pointer is too far left
  if (pointerDistance - pointerHeight < cornerCurveSize) {
    // pointer left side
    context.quadraticCurveTo(x + pointerDistance, y + pointerHeight, x + (pointerDistance / 2), y + pointerHeight);

    // top left corner
    context.quadraticCurveTo(x, y + pointerHeight, x, y + pointerHeight + cornerCurveSize);
  } else {
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
  context.restore();
}

// Name: DrawCloud
// Author: Louis Bodnar
window.DrawCloud = function DrawCloud(c, x, y, w, h) {
  // BUG: Need to add raindrops
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");

  context.save();

  // draw cloud
  context.beginPath();
  context.moveTo(40 * (w / 430) + x, 75 * (h / 180) + y);
  context.bezierCurveTo(x, 95 * (h / 180) + y, x, 145 * (h / 180) + y, 100 * (w / 430) + x, 145 * (h / 180) + y);
  context.bezierCurveTo(120 * (w / 430) + x, 175 * (h / 180) + y, 190 * (w / 430) + x, 175 * (h / 180) + y, 210 * (w / 430) + x, 145 * (h / 180) + y);
  context.bezierCurveTo(290 * (w / 430) + x, 145 * (h / 180) + y, 290 * (w / 430) + x, 115 * (h / 180) + y, 260 * (w / 430) + x, 95 * (h / 180) + y);
  context.bezierCurveTo(300 * (w / 430) + x, 35 * (h / 180) + y, 240 * (w / 430) + x, 25 * (h / 180) + y, 210 * (w / 430) + x, 45 * (h / 180) + y);
  context.bezierCurveTo(190 * (w / 430) + x, y, 120 * (w / 430) + x, 15 * (h / 180) + y, 120 * (w / 430) + x, 45 * (h / 180) + y);
  context.bezierCurveTo(70 * (w / 430) + x, y, 20 * (w / 430) + x, 15 * (h / 180) + y, 40 * (w / 430) + x, 75 * (h / 180) + y);
  context.closePath();

  // make gradient
  var grd = context.createRadialGradient(238 * (w / 430) + x, 50 * (h / 180) + y, 10 * (w / 430), 238 * (w / 430) + x, 50 * (h / 180) + y, 200 * (w / 430));
  grd.addColorStop(0, "#DDDDDD"); // light grey
  grd.addColorStop(1, "#555555"); // dark grey
  context.fillStyle = grd;
  context.fill();
  context.restore();
}

// Name: DrawSun
// Author: Louis Bodnar
window.DrawSun = function DrawSun(c, x, y, r) {
  // BUG: Need to add sunbeams
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  var centerX = x;
  var centerY = y;
  var radius = r;

  context.beginPath();
  context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
  context.fillStyle = "#FFEF00";
  context.fill();
  context.restore();
}

// Name: DrawX
// Author: Louis Bodnar
window.DrawX = function DrawX(c, x, y) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  context.beginPath();
  context.moveTo(0, y);
  context.lineTo(canvas.width, y);
  context.lineWidth = 1;
  context.strokeStyle = "#FF0000";
  context.stroke();

  context.beginPath();
  context.moveTo(x, 0);
  context.lineTo(x, canvas.height);
  context.lineWidth = 1;
  context.strokeStyle = "#FF0000";
  context.stroke();
  context.restore();

}

// Name: DrawHouse
// Author: Louis Bodnar
window.DrawHouse = function DrawHouse(c, x, y, h) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  var houseColor = "#C04000";
  var windowColor = "#F0F8FF";
  var doorColor = "#808080";

  // draw house
  context.beginPath();
  context.moveTo(2 * (h / 10) + x, 8 * (h / 10) + y);
  context.lineTo(2 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(0 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(2 * (h / 10) + x, 1 * (h / 10) + y);
  context.lineTo(6 * (h / 10) + x, 1 * (h / 10) + y);
  context.lineTo(6 * (h / 10) + x, 0 * (h / 10) + y);
  context.lineTo(7 * (h / 10) + x, 0 * (h / 10) + y);
  context.lineTo(7 * (h / 10) + x, 1 * (h / 10) + y);
  context.lineTo(8 * (h / 10) + x, 1 * (h / 10) + y);
  context.lineTo(10 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(8 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(8 * (h / 10) + x, 8 * (h / 10) + y);
  context.fillStyle = houseColor;
  context.fill();

  // draw left window
  context.beginPath();
  context.moveTo(3 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(4 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(4 * (h / 10) + x, 4 * (h / 10) + y);
  context.lineTo(3 * (h / 10) + x, 4 * (h / 10) + y);
  context.fillStyle = windowColor;
  context.fill();

  // draw right window
  context.beginPath();
  context.moveTo(6 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(7 * (h / 10) + x, 3 * (h / 10) + y);
  context.lineTo(7 * (h / 10) + x, 4 * (h / 10) + y);
  context.lineTo(6 * (h / 10) + x, 4 * (h / 10) + y);
  context.fillStyle = windowColor;
  context.fill();

  // draw door
  context.beginPath();
  context.moveTo(5 * (h / 10) + x, 6 * (h / 10) + y);
  context.lineTo(6 * (h / 10) + x, 6 * (h / 10) + y);
  context.lineTo(6 * (h / 10) + x, 8 * (h / 10) + y);
  context.lineTo(5 * (h / 10) + x, 8 * (h / 10) + y);
  context.fillStyle = doorColor;
  context.fill();
  context.restore();
}

// Name: DrawPerson
// Author: Louis Bodnar
window.DrawPerson = function DrawPerson(c, x, y, h) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  var lineWidth = h / 10;
  var headRadius = h / 10;

  // draw head
  context.beginPath();
  context.arc(x + lineWidth * 2.4, y + headRadius, headRadius * .95, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();

  // draw left leg
  context.beginPath();
  context.moveTo(x + lineWidth * 1.65, y + h * 3 / 5);
  context.lineTo(x + lineWidth * 1.65, y + h);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw right leg
  context.beginPath();
  context.moveTo(x + lineWidth * 3.15, y + h * 3 / 5);
  context.lineTo(x + lineWidth * 3.15, y + h);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw body
  context.beginPath();
  context.moveTo(x + lineWidth * 2.4, y + headRadius * 2);
  context.lineTo(x + lineWidth * 2.4, y + h * 3 / 5);
  context.lineWidth = lineWidth * 5 / 2;
  context.lineCap = "butt";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw left arm
  context.beginPath();
  context.moveTo(x + lineWidth * .5, y + headRadius * 2 + lineWidth / 2);
  context.lineTo(x + lineWidth * .5, y + h * 3 / 5);
  context.lineWidth = lineWidth * 4 / 5;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw right arm
  context.beginPath();
  context.moveTo(x + lineWidth * 4.3, y + headRadius * 2 + lineWidth / 2);
  context.lineTo(x + lineWidth * 4.3, y + h * 3 / 5);
  context.lineWidth = lineWidth * 4 / 5;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.restore();
}

// Name: DrawStripes
// Author: Louis Bodnar
window.DrawStripes = function DrawStripes(c, x, y, w, h, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");

  context.save();
  //context.fillStyle = "#dddddd";
  //context.fillRect(x, y, w, h);
  var stripeWidth = 9;
  context.lineWidth = 1;
  //context.fillStyle = "#74c043";
  context.fillStyle = d;
  var i = 0;
  for(i = 0 - h; i < w; i = (i + (stripeWidth * 2))) {
    context.beginPath();
    if (i < 0) {
      context.moveTo(x, y - i);
      context.lineTo(x, y - i - stripeWidth);
      context.lineTo(x + i + stripeWidth + h, y + h);
      context.lineTo(x + i + h, y + h);
      context.lineTo(x, y - i);
    } else if (i + h < w) {
      context.moveTo(x + i, y);
      context.lineTo(x + i + stripeWidth, y);
      context.lineTo(x + i + stripeWidth + h, y + h);
      context.lineTo(x + i + h, y + h);
      context.lineTo(x + i, y);
    } else {
      context.moveTo(x + i, y);
      context.lineTo(x + i + stripeWidth, y);
      context.lineTo(x + w, y + h - (i + h - w) - stripeWidth);
      context.lineTo(x + w, y + h - (i + h - w));
      context.lineTo(x + i, y);
    }
    context.closePath();
    context.fill();
  }
  context.restore();
}

// Name: DrawPie
// Author: Louis Bodnar
window.DrawPie = function DrawPie(c, x, y, w, h, d) {
  d = Number(d.replace('%',''))/100;
  //clearCanvas(c);
  // data format
  //
  // accepts a percentage expressed as a decimal
  // example: DrawPie("myCanvas",0,0,100,100,.66); would display 66%

  var ringColor = "#000000";
  var highlightColor = "#FF0000";
  var textColor = "#FFFFFF";

  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var counterclockwise = false;
  var centerX = (w / 2) + x;
  var centerY = (h / 2) + y;
  var i = 0;
  var thickWidth = w / 10;
  var thinWidth = thickWidth / 4;
  var radius = (w / 2) - thickWidth;

  // Draw thin ring
  context.beginPath();
  context.moveTo(centerX, centerY - radius);
  context.arc(centerX, centerY, radius, (Math.PI / 2) * 3, (Math.PI / 2) * 7, counterclockwise);
  context.lineWidth = thinWidth;
  context.strokeStyle = ringColor;
  context.shadowColor = ringColor;
  context.shadowBlur = 2;
  context.stroke();

  // Draw thick ring
  context.beginPath();
  context.arc(centerX, centerY, radius, (Math.PI / 2) * 3, (d * 2 * Math.PI) + ((Math.PI / 2) * 3), counterclockwise);
  context.lineWidth = thickWidth;
  context.shadowColor = highlightColor;
  context.shadowBlur = 2;
  context.strokeStyle = highlightColor;
  context.stroke();

  // Draw text
  var text_offset = centerX - radius + thickWidth;
  var text_size = w / 5;
  context.font = text_size + "pt Calibri";
  context.shadowColor = textColor;
  context.shadowBlur = 2;
  context.fillStyle = textColor;
  context.fillText(((Math.round(d * 1000)) / 10) + "%", text_offset, centerY + (text_size / 2));

  context.restore();
}

// Name: DrawBox
// Author: Peter Chen
window.DrawBox = function DrawBox(c, x, y, w, h, d) {
  // Create fill gradient
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");
  ctx.save();

  ctx.scale(w / 120, h / 120);
  x = x / (w / 120);
  y = y / (h / 120);
  var text1 = d[0];
  var text2 = d[1];
  // Fill the path
  //ctx.fllStyle = gradient;
  //ntext.fill();

  ctx.strokeRect(x + 10, y + 10, 100, 100);
  var grd = ctx.createLinearGradient(x + 10, y + 10, 59.9, 100);

  grd.addColorStop(0, "purple");

  grd.addColorStop(1, "red");

  ctx.fillStyle = grd;
  ctx.fillRect(x + 10, y + 10, 29.9, 100);
  ctx.strokeRect(x, y, 120, 120);
  ctx.font = "16pt Arial";

  ctx.shadowColor = "white";
  ctx.shadowBlur = 2;
  ctx.fillStyle = "white";
  ctx.fillText(text1, x + 15, y + 50);
  ctx.fillText(text2, x + 15, y + 80);
  ctx.restore();
}

// Name: DrawCompetitiveSegmentSale
// Author: Lok Cheung
window.DrawCompetitiveSegmentSale = function DrawCompetitiveSegmentSale(c, x, y, w, h, Comp_Seg_Sale_data) {

  var canvas = document.getElementById(c);
  var ctx6 = canvas.getContext("2d");

  Comp_Seg_Sale_data.sort(function(a, b) {
    return (parseInt(b[0]) - parseInt(a[0]));
  });

  var textWidth = 160;
  var lineSpacing = 5;
  var img03 = new Image();

  img03.onload = function() {
    ctx6.save();
    ctx6.scale(w / 700, h / 200);
    x = x / (w / 700);
    y = y / (h / 200);
    ctx6.fillStyle = "#FFFFFF";
    var textSize = 12;
    ctx6.font = "bold 12pt Calibri";

    for(var i = 0; i < Comp_Seg_Sale_data.length; i++) {
      // draw dealership name
      ctx6.fillText(Comp_Seg_Sale_data[i][1], x, y + img03.height + i * (img03.height + lineSpacing));

      // calculate bar width
      var barWidth = (parseInt(Comp_Seg_Sale_data[i][0]) / parseInt(Comp_Seg_Sale_data[0][0])) * (650 - textWidth - img03.width);

      // draw bar
      ctx6.fillRect(x + textWidth, y + img03.height - textSize + i * (img03.height + lineSpacing), barWidth, textSize);

      // draw car at end of bar
      ctx6.drawImage(img03, x + textWidth + barWidth, y + 7 + i * (img03.height + lineSpacing));

      // draw kpi value
      ctx6.fillText(Comp_Seg_Sale_data[i][0], x + textWidth + barWidth + img03.width + 4, y + img03.height + i * (img03.height + lineSpacing));

    }
    ctx6.restore();
  }
  img03.src = car2;
}

// Name: DrawLostSale
// Author: Lok Cheung
window.DrawLostSale = function DrawLostSale(c, x, y, w, h, d) {
  //clearCanvas(c);
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");

  var img04 = new Image();

  img04.onload = function() {
    ctx.save();
    ctx.scale(w / 236, h / 230);
    x = x / (w / 236);
    y = y / (h / 230);
    ctx.drawImage(img04, x, y);
    ctx.font = "bold 34pt Calibri";
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 6;
    ctx.fillText("Lost", x + 120, y + 38);
    ctx.fillText("Sales", x + 120, y + 78);

    ctx.font = "bold 40pt Calibri";
    ctx.fillText(addCommas(d), x + 155, y + 120);
    ctx.restore();
  }
  img04.src = puzzle;
}

// Name: 		DrawLostProfit
// Author: 		Peter Chen
// Purpose:     Draw Lost Proffit infographic element
// Arguments:   DrawLostProfit(canvas_name, x_position, y_position, width, height, data);
// Data format: value
// Example:     DrawLostProfit("myCanvas", 0, 0, 100, 100, 1000);
window.DrawLostProfit = function DrawLostProfit(c, x, y, w, h, d) {
  //clearCanvas(c);
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");

  context.save();
  context.scale(w / 200, h / 200);
  x = x / (w / 200);
  y = y / (h / 200);

  var lineWidth = 8;
  var innerBorder = 5;
  var primaryColor = "#FFC821";
  var secondaryColor = "#FAF100";
  var tertiaryColor = "#DCAA09";
  // Load the context of the canvas

  var width = 200;
  var height = 200;
  var padding = 20;

  // Create a triangluar path
  context.beginPath();
  context.moveTo(x + padding + width / 2, y + padding);
  context.lineTo(x + padding + width, y + height + padding);
  context.lineTo(x + padding, y + height + padding);
  context.closePath();

  // Create fill gradient
  var gradient = context.createLinearGradient(x + 0, y + 0, x + 0, y + height);
  gradient.addColorStop(0, primaryColor);
  gradient.addColorStop(1, secondaryColor);

  // Add a shadow around the object
  context.shadowBlur = 10;
  context.shadowColor = "black";

  // Stroke the outer outline
  context.lineWidth = lineWidth * 2;
  context.lineJoin = "round";
  context.strokeStyle = gradient;
  context.stroke();

  // Turn off the shadow, or all future fills will have shadows
  context.shadowBlur = 0;

  // Fill the path
  context.fillStyle = gradient;
  context.fill();

  // Add a horizon reflection with a gradient to transparent
  gradient = context.createLinearGradient(x + 0, y + padding, x + 0, y + padding + height);
  gradient.addColorStop(0, "transparent");
  gradient.addColorStop(0.5, "transparent");
  gradient.addColorStop(0.5, tertiaryColor);
  gradient.addColorStop(1, secondaryColor);

  context.fillStyle = gradient;
  context.fill();

  // Stroke the inner outline
  context.lineWidth = lineWidth;
  context.lineJoin = "round";
  context.strokeStyle = "#333333";
  context.stroke();

  // Draw the text exclamation point
  context.font = "40px Arial";
  context.fillStyle = "red";
  context.fillText("$" + addCommas(d), x + 190, y + 100);

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 80px 'Times New Roman', Times, serif";
  context.fillStyle = "#333333";
  try {
    context.fillText("!", x + padding + width / 2, y + padding + height / 1.5);
  } catch(ex) {
  }
  context.restore();
}

// Name: DrawPlaid
// Author: Louis Bodnar
window.DrawPlaid = function DrawPlaid(c, x, y, w, h, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  var backgroundColor = "#FFFFFF";
  var lineColorOne = "#D9F28A";
  var lineColorTwo = "#81F28A";
  var lineColorThree = "#FFBE93";
  var lineColorFour = "#81F28A";

  // fill background
  context.fillStyle = backgroundColor;
  context.fillRect(x, y, w, h);

  // draw first set of vertical lines
  context.strokeStyle = lineColorOne;
  context.lineWidth = 20;
  var double = 0;
  for(var i = 60; i < w; i = i + 120) {
    context.beginPath();
    if (double == 1) {
      double = 0;
      context.moveTo(i - 10, y);
      context.lineTo(i - 10, y + h);
      context.moveTo(i + 10, y);
      context.lineTo(i + 10, y + h);
    } else {
      double = 1;
      context.moveTo(i, y);
      context.lineTo(i, y + h);
    }
    context.stroke();
  }

  // draw second set of vertical lines
  context.strokeStyle = lineColorTwo;
  context.lineWidth = 15;
  double = 0;
  for(var i = 60; i < w; i = i + 120) {
    context.beginPath();
    if (double == 1) {
      double = 0;
      context.moveTo(i - 10, y);
      context.lineTo(i - 10, y + h);
      context.moveTo(i + 10, y);
      context.lineTo(i + 10, y + h);
    } else {
      double = 1;
      context.moveTo(i, y);
      context.lineTo(i, y + h);
    }
    context.stroke();
  }

  // draw set of horizontal lines
  context.strokeStyle = lineColorThree;
  context.lineWidth = 10;
  var double = 0;
  for(var i = 60; i < h; i = i + 120) {
    context.beginPath();
    if (double == 1) {
      double = 0;
      context.moveTo(x, y + i - 20);
      context.lineTo(x + w, y + i - 20);
      context.moveTo(x, y + i + 20);
      context.lineTo(x + w, y + i + 20);
    } else {
      double = 1;
      context.moveTo(x, y + i);
      context.lineTo(x + w, y + i);
    }
    context.stroke();
  }
  context.restore();
}

// Usage: navigator_Go("index.html");
// Author: Kevin Shreve
// Description: This changes the url in the address bar, without using <a href="index.html"></a>
//  	This allows us to stay in fullscreen mode on the iPad
window.navigator_Go = function navigator_Go(url) {
  window.location.assign(url);
}

//LEAD INFOGRAPHIC STUFF BELOW//
/*---------------------*/

// Name:        DrawTable
// Author:      Peter Chen
// Purpose:     Draw Table
// Arguments:   DrawTable(canvas_name, x_position, y_position);
// Data format:
// Example:     DrawTable("myCanvas", 0, 0);
window.DrawTable = function DrawTable(c, x, y) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var lineWidth = 7;

  context.beginPath();
  context.fillStyle = "#000000";
  context.beginPath();
  context.rect(x, y, 100, -60);
  context.fill();

  context.beginPath();
  context.moveTo(x - 30, y - 60);
  context.lineTo(x + 130, y - 60);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();
  context.restore();

}

// Name:        DrawChairL
// Author:      Peter Chen
// Purpose:     Draw chair (toward to the left)
// Arguments:   DrawChairL(canvas_name, x_position, y_position);
// Data format:
// Example:     DrawChairL("myCanvas", 0, 0);
window.DrawChairL = function DrawChairL(c, x, y) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var lineWidth = 7;

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + 110);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x, y + 70);
  context.lineTo(x - 40, y + 70);
  context.lineTo(x - 40, y + 110);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();
  context.restore();
}

// Name:        DrawChairR
// Author:      Peter Chen
// Purpose:     Draw chair (toward to the right)
// Arguments:   DrawChairR(canvas_name, x_position, y_position);
// Data format:
// Example:     DrawChairR("myCanvas", 0, 0);
window.DrawChairR = function DrawChairR(c, x, y) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var lineWidth = 7;

  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x, y + 110);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.moveTo(x, y + 70);
  context.lineTo(x + 40, y + 70);
  context.lineTo(x + 40, y + 110);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();
  context.restore();
}

// Name: 		Draw Unique Custmers
// Author: 		Peter Chen
// Purpose: 	Draws unique customers infographic element
// Arguments:   DrawUniqueCustomers(canvas_name, x_position, y_position);
// Data format:
// Example:     DrawUniqueCustomers("myCanvas", 0, 0);
window.DrawUniqueCustomers = function DrawUniqueCustomers(c, x, y) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");

  var lineWidth = 7;

  context.save();
  //draw man's head
  context.beginPath();
  context.arc(x + 170, y - 50, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man
  context.beginPath();
  context.moveTo(x + 130, y + 30);
  context.lineTo(x + 170, y + 30);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man
  context.moveTo(x + 170, y - 30);
  context.lineTo(x + 170, y + 30);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man
  context.moveTo(x + 170, y - 20);
  context.lineTo(x + 100, y - 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw Table
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 100, y);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw Table
  context.moveTo(x - 20, y + 40);
  context.lineTo(x + 120, y + 40);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw table's leg
  context.moveTo(x + 30, y);
  context.lineTo(x + 10, y + 80);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw table's legs
  context.moveTo(x + 65, y);
  context.lineTo(x + 85, y + 80);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw umbrella
  context.moveTo(x + 10, y);
  context.lineTo(x + 10, y - 70);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw umbrella
  context.beginPath();
  context.moveTo(x - 60, y - 70);
  context.lineTo(x + 80, y - 70);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  // draw umbrella
  context.moveTo(x - 60, y - 70);
  context.quadraticCurveTo(x + 10, y - 120, x + 80, y - 70);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.fillStyle = "#000000";
  context.fill();
  context.stroke();

  //draw computer
  context.moveTo(x + 50, y - 10);
  context.lineTo(x + 90, y - 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw computer
  context.moveTo(x + 50, y - 10);
  context.lineTo(x + 40, y - 40);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw chair
  context.moveTo(x + 140, y + 80);
  context.lineTo(x + 140, y + 40);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw chair
  context.moveTo(x + 180, y + 80);
  context.lineTo(x + 180, y - 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw chair
  context.moveTo(x + 140, y + 40);
  context.lineTo(x + 180, y + 40);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man's leg
  context.beginPath();
  context.moveTo(x + 130, y + 30);
  context.lineTo(x + 130, y + 80);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.restore();
}

// Name: 		Draw Response
// Author: 		Peter Chen
// Purpose: 	Response infographic elements, both phone and email
// Arguments:   DrawResponse(canvas_name, x_position, y_position, Response_by_Mail_data, Response_by_Phone_data);
// Data format: value
// Example:     DrawResponse("myCanvas", 0, 0, 1000, 1200);
window.DrawResponse = function DrawResponse(c, x, y, kpiMail, kpiPhone) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var img = new Image();
  context.fillStyle = "#8ED6FF";
  //find out the percentage between Mail and Phone
  var kpiTotal = kpiMail + kpiPhone;
  var MailP = kpiMail / kpiTotal;
  var PhoneP = kpiPhone / kpiTotal;
  var fillW;
  var fillH;

  context.beginPath();
  context.rect(x + 1, y, 373, -120);
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = "white";
  context.stroke();

  //draw rectangle in the back of the mail image
  if (MailP <= 0.5) {
    fillW = 700 * MailP;
    fillH = 50;
    MailP = 0;
  } else if (MailP > 0.5) {
    MailP = MailP - 0.5;
    fillW = 350;
    fillH = 50;
  }
  context.fillRect(x + 10, y + 10, fillW, fillH);
  if (MailP > 0) {
    fillW = 700 * MailP;
    fillH = 50;
    context.fillRect(x + 10, y + 100, fillW, fillH);
  }

  context.fillStyle = "#FFA54F";
  context.beginPath();
  context.rect(x + 376, y, 370, -120);
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = "white";
  context.stroke();

  //draw rectangle in the back of the phone image
  if (PhoneP <= 0.5) {
    fillW = 760 * PhoneP;
    fillH = 80;
    PhoneP = 0;
  } else if (PhoneP > 0.5) {
    PhoneP = PhoneP - 0.5;
    fillW = 720 / 2;
    fillH = 80;
  }
  context.fillRect(x + 740, y + 80, x - 20 - fillW, fillH);
  if (PhoneP > 0) {
    fillW = 720 * PhoneP;
    fillH = 80;
    context.fillRect(x + 740, y + 8, x - 20 - fillW, fillH);
  }

  //load the response.png
  img.onload = function() {
    context.drawImage(img, x, y, img.width / 4.29, img.height / 4.29);
  }
  img.src = response;
  context.restore();

}

// Name: 		Draw Sales
// Author: 		Peter Chen
// Purpose: 	Sales from lead infographic elements; new, used, and lost
// Arguments:   DrawSales(canvas_name, x_position, y_position, Sales_from_Lead_Lost_data, Sales_from_Lead_New_data, Sales_from_Lead_Used_data);
// Data format: value
// Example:     DrawSales("myCanvas", 0, 0, 1000, 1200, 200);
window.DrawSales = function DrawSales(c, x, y, kpiLost, kpiNew, kpiOld) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var lineWidth = 7;
  var img1 = new Image();
  img1.src = leadUsed;
  var img2 = new Image();
  img2.src = leadNew;

  //draw man's head
  context.beginPath();
  context.arc(x - 50, y, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();

  //draw man body
  context.moveTo(x - 50, y);
  context.quadraticCurveTo(x - 40, y + 30, x - 50, y + 65);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man
  context.moveTo(x - 50, y + 65);
  context.lineTo(x - 80, y + 100);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man
  context.moveTo(x - 50, y + 65);
  context.lineTo(x - 20, y + 80);
  context.lineTo(x - 35, y + 100);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.moveTo(x - 50, y + 40);
  context.quadraticCurveTo(x - 60, y + 20, x - 100, y + 15);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.moveTo(x - 50, y + 45);
  context.quadraticCurveTo(x - 60, y + 30, x - 100, y + 30);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw door
  context.beginPath();
  context.fillStyle = "#000000";
  context.beginPath();
  context.rect(x, y - 60, 80, 170);
  context.fill();

  context.beginPath();
  context.arc(x + 15, y + 20, 5, 0, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();

  //draw whiteboard
  context.beginPath();
  context.moveTo(x - 410, y - 50);
  context.lineTo(x - 130, y - 50);
  context.lineTo(x - 130, y - 130);
  context.lineTo(x - 410, y - 130);
  context.lineTo(x - 410, y - 50);
  context.moveTo(x - 410, y - 43);
  context.lineTo(x - 130, y - 43);
  context.lineWidth = lineWidth;
  context.lineCap = "square";
  context.strokeStyle = "#000000";
  context.stroke();
  context.fillStyle = "#FFFFFF";
  context.fill();

  //draw marker
  context.beginPath();
  context.moveTo(x - 240, y - 45);
  context.lineTo(x - 200, y - 45);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#FFFFFF";
  context.stroke();

  //draw tables
  DrawTable(c, x - 300, y + 110);
  DrawTable(c, x - 565, y + 110);

  //draw chairs
  DrawChairL(c, x - 125, y);
  DrawChairL(c, x - 395, y);
  DrawChairR(c, x - 635, y);
  DrawChairR(c, x - 375, y);

  //draw man (big)
  context.beginPath();
  context.arc(x - 150, y, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();

  context.beginPath();
  context.moveTo(x - 150, y);
  context.lineTo(x - 150, y + 60);
  context.lineTo(x - 180, y + 60);
  context.lineTo(x - 180, y + 100);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 150, y + 40);
  context.quadraticCurveTo(x - 210, y + 50, x - 150, y + 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.arc(x - 420, y, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();

  context.beginPath();
  context.moveTo(x - 420, y);
  context.lineTo(x - 420, y + 60);
  context.lineTo(x - 450, y + 60);
  context.lineTo(x - 450, y + 100);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 420, y + 40);
  context.quadraticCurveTo(x - 490, y + 50, x - 420, y + 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw man (small)
  context.beginPath();
  context.arc(x - 350, y, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.beginPath();

  context.moveTo(x - 350, y);
  context.lineTo(x - 350, y + 60);
  context.lineTo(x - 320, y + 60);
  context.lineTo(x - 320, y + 100);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 350, y + 40);
  context.quadraticCurveTo(x - 330, y + 50, x - 320, y + 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.arc(x - 610, y, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.beginPath();

  context.moveTo(x - 610, y);
  context.lineTo(x - 610, y + 60);
  context.lineTo(x - 580, y + 60);
  context.lineTo(x - 580, y + 100);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 610, y + 40);
  context.quadraticCurveTo(x - 590, y + 50, x - 570, y + 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //load two cars' images
  img1.onload = function() {
    context.drawImage(img1, x - 295, y + 8, img1.width / 4, img1.height / 4);
  }

  img2.onload = function() {
    context.drawImage(img2, x - 565, y + 10, img2.width / 1.75, img2.height / 1.75);
  }
  context.restore();
}

//DrawAvgRespTime: Infographic Element
//Author: Kevin Shreve
//Usage: DrawAvgRespTime("myCanvas",0,100,60);
window.DrawAvgRespTime = function DrawAvgRespTime(c, x, y, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  context.font = "28pt Calibri";
  context.fillStyle = "#000000";
  context.fillText("Average Response Time", x + 105, y - 50);
  context.fillText(" minutes", x + 175, y - 10);
  context.font = "bold  28pt Calibri";
  context.fillText(d, x + 105, y - 10);
  DrawClockFace(c, x, y, d);
  context.restore();
}

//DrawClockDial: Draws the small nub on the side of the watch
//Author: Kevin Shreve
//Helper function for placing the nub on the sie of Average Response Time
window.DrawClockDial =function DrawClockDial(c, x, y) {
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "C9C9C9";
  ctx.fillRect(x + 85, y - (15 / 2), 10, 15);
  ctx.fillStyle = "#000000";
  ctx.fillRect(x + 87, y - 5, 5, 10);
}

//DrawClockFace: Draws the circles and the tick marks
//Author: Kevin Shreve
//Helper function for average respone time, to draw the background of the watch
window.DrawClockFace = function DrawClockFace(c, x, y, d) {
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");

  DrawCircle(c, x, y, 90, "#C9C9C9");
  DrawCircle(c, x, y, 70, "#FFFFFF");
  DrawCircle(c, x, y, 65, "#C9C9C9");
  DrawCircle(c, x, y, 10, "#FFFFFF");

  ctx.fillStyle = "#000000";
  for(var k = 1; k < 13; k++) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(2 * k * Math.PI / 12);
    ctx.translate(-x, -y);
    ctx.fillRect(x - 5, y - 75, 10, 20);
    ctx.restore();
  }
  DrawHand(c, x, y, d);
}

//DrawHand : Draws the minute and hour hands of the clock
//Author: Kevin Shreve
//Helper function for average response time, to be able to position the arms of
//the clock without messing with context of everything else.
window.DrawHand = function DrawHand(c, x, y, d) {
  var canvas = document.getElementById(c);
  var ctx = canvas.getContext("2d");

  var hand = new Image;
  hand.src = watcharm;
  hand.onload = function() {
    ctx.save();
    ctx.translate(x, y)
    ctx.rotate(d / 2 * (Math.PI / 180));
    ctx.translate(-x, -y)
    //hour hand
    ctx.drawImage(hand, x - (hand.width / 2), y - (hand.height / 2) - 30, 50, 60);
    ctx.restore();

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(d * 6 * (Math.PI / 180));
    ctx.translate(-x, -y);
    //minute hand
    ctx.drawImage(hand, x - (hand.width / 2), y - (hand.height / 2) - 45);
    ctx.restore();
  }
}

//DrawCircle: Cirlce with color option
//Author: Kevin Shreve
//Usage: DrawCircle("myCanvas",0,100,5,"#FFF");
window.DrawCircle = function DrawCircle(c, x, y, r, color) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  var centerX = x;
  var centerY = y;
  var radius = r;

  context.beginPath();
  context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

// Name:		Draw Close Rate
// Author: 		Peter Chen
// Purpose: 	Close Rate infographic elements
// Arguments:   DrawCloseRate(canvas_name, x_position, y_position, Close_Rate_data);
// Data format: value
// Example:     DrawCloseRate("myCanvas", 0, 0, 1000);
window.DrawCloseRate = function DrawCloseRate(c, x, y, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  var lineWidth = 10;
  context.save();
  //draw ATM machine
  DrawMachine(c, x - 35, y - 5);
  DrawMachine(c, x + 100, y - 5);

  context.font = "32pt Calibri";
  context.fillStyle = "#FFFFFF";
  context.fillText("Close Rate", x - 70, y - 230);

  context.font = "24pt Calibri";
  context.fillStyle = "#000000";
  context.fillText(d * 100 + "%", x - 19, y - 150);

  //draw door
  context.save();
  context.beginPath();
  context.fillStyle = "#000000";
  context.beginPath();
  context.rect(x - 180, y - 175, 80, 170);
  context.fill();

  context.beginPath();
  context.arc(x - 115, y - 80, 5, 0, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
  context.restore();

  //draw walking man
  context.beginPath();
  context.arc(x - 50, y - 140, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.beginPath();

  context.moveTo(x - 50, y - 140);
  context.lineTo(x - 50, y - 80);
  context.lineTo(x - 70, y - 40);
  context.lineTo(x - 75, y - 10);
  context.moveTo(x - 50, y - 80);
  context.lineTo(x - 45, y - 40);
  context.lineTo(x - 30, y - 10);
  context.moveTo(x - 50, y - 110);
  context.lineTo(x - 60, y - 90);
  context.lineTo(x - 75, y - 70);
  context.moveTo(x - 50, y - 110);
  context.lineTo(x - 30, y - 80);
  context.lineTo(x - 25, y - 70);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw stand man
  context.beginPath();
  context.arc(x + 150, y - 150, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.beginPath();

  context.moveTo(x + 150, y - 150);
  context.lineTo(x + 150, y - 80);
  context.lineTo(x + 155, y - 40);
  context.lineTo(x + 160, y - 10);
  context.moveTo(x + 150, y - 80);
  context.lineTo(x + 145, y - 40);
  context.lineTo(x + 140, y - 10);
  context.moveTo(x + 150, y - 120);
  context.quadraticCurveTo(x + 190, y - 100, x + 150, y - 80);
  context.moveTo(x + 150, y - 120);
  context.quadraticCurveTo(x + 110, y - 100, x + 120, y - 80);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();
  context.restore();
}

// Name: 		Draw Machine
// Author: 		Peter Chen
// Purpose: 	ATM machine infographic elements
// Arguments:   DrawMachine(canvas_name, x_position, y_position);
// Data format:
// Example:     DrawMachine("myCanvas", 0, 0);
window.DrawMachine = function DrawMachine(c, x, y) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  var lineWidth = 3;

  context.save();

  //draw machine
  context.beginPath();
  context.fillStyle = "#383838";
  context.beginPath();
  context.rect(x, y, 100, -200);
  context.fill();

  context.beginPath();
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.rect(x + 10, y - 130, 80, -60);
  context.fill();

  context.beginPath();
  context.moveTo(x + 5, y - 125);
  context.lineTo(x + 95, y - 125);
  context.lineTo(x + 95, y - 195);
  context.lineTo(x + 5, y - 195);
  context.lineTo(x + 5, y - 125);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#C0C0C0";
  context.stroke();

  context.beginPath();
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.rect(x + 10, y - 60, 60, -50);
  context.fill();

  context.beginPath();
  context.moveTo(x + 5, y - 55);
  context.lineTo(x + 75, y - 55);
  context.lineTo(x + 75, y - 115);
  context.lineTo(x + 5, y - 115);
  context.lineTo(x + 5, y - 55);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#C0C0C0";
  context.stroke();
  context.restore();

  context.beginPath();
  context.fillStyle = "#383838";
  context.beginPath();
  context.rect(x + 12, y - 62, 16, -15);
  context.rect(x + 31, y - 62, 16, -15);
  context.rect(x + 50, y - 62, 16, -15);
  context.rect(x + 12, y - 78, 16, -15);
  context.rect(x + 31, y - 78, 16, -15);
  context.rect(x + 50, y - 78, 16, -15);
  context.rect(x + 12, y - 94, 16, -15);
  context.rect(x + 31, y - 94, 16, -15);
  context.rect(x + 50, y - 94, 16, -15);
  context.fill();

  //write numbers
  context.font = "12pt Calibri";
  context.fillStyle = "#FFFFFF";
  context.fillText("1", x + 15, y - 97);
  context.fillText("2", x + 34, y - 97);
  context.fillText("3", x + 53, y - 97);
  context.fillText("4", x + 15, y - 80);
  context.fillText("5", x + 34, y - 80);
  context.fillText("6", x + 53, y - 80);
  context.fillText("7", x + 15, y - 65);
  context.fillText("8", x + 34, y - 65);
  context.fillText("9", x + 53, y - 65);

  context.beginPath();
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.rect(x + 83, y - 70, 10, -40);
  context.fill();

  context.beginPath();
  context.fillStyle = "#C0C0C0";
  context.beginPath();
  context.rect(x + 85, y - 72, 6, -36);
  context.fill();

  context.beginPath();
  context.fillStyle = "#FFFFFF";
  context.beginPath();
  context.rect(x + 20, y - 25, 50, -20);
  context.fill();

  context.beginPath();
  context.fillStyle = "#383838";
  context.beginPath();
  context.rect(x + 22, y - 27, 46, -16);
  context.fill();

  context.restore();
}

// Name: 		Draw Prospect Count
// Author: 		Peter Chen
// Purpose: 	Prospect Count infographic elements
// Arguments:   DrawProspectCount(canvas_name, x_position, y_position, data);
// Data format: value
// Example:     DrawProspectCount("myCanvas", 0, 0, 1000);
window.DrawProspectCount = function DrawProspectCount(c, x, y, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  var lineWidth = 10;
  context.save();
  //draw tables
  context.beginPath();
  context.fillStyle = "#000000";
  context.beginPath();
  context.rect(x + 20, y, 130, -60);
  context.fill();

  context.beginPath();
  context.moveTo(x, y - 65);
  context.lineTo(x + 170, y - 65);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //
  context.beginPath();
  context.arc(x + 130, y - 80, 25, Math.PI, 2 * Math.PI, false);
  context.rect(x + 105, y - 70, 50, -10);
  context.fillStyle = "#000000";
  context.fill();

  context.beginPath();
  context.moveTo(x + 100, y - 113);
  context.lineTo(x + 160, y - 113);
  context.lineTo(x + 150, y - 140);
  context.lineTo(x + 110, y - 140);
  context.lineTo(x + 100, y - 113);
  context.lineWidth = lineWidth;
  context.lineCap = "square";
  context.strokeStyle = "#000000";
  context.stroke();
  context.fillStyle = "#000000";
  context.fill();

  //draw sit man
  context.beginPath();
  context.arc(x + 50, y - 120, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.beginPath();

  context.moveTo(x + 50, y - 120);
  context.lineTo(x + 40, y - 70);
  context.moveTo(x + 48, y - 90);
  context.quadraticCurveTo(x + 90, y - 45, x + 50, y - 110);
  context.moveTo(x + 48, y - 90);
  context.quadraticCurveTo(x + 30, y - 85, x + 10, y - 110);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //draw stand man
  context.beginPath();
  context.arc(x - 45, y - 140, 20, 0, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
  context.beginPath();

  context.moveTo(x - 45, y - 150);
  context.lineTo(x - 45, y - 5);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 45, y - 70);
  context.quadraticCurveTo(x - 60, y - 25, x - 70, y - 10);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 45, y - 110);
  context.quadraticCurveTo(x - 30, y - 45, x - 10, y - 110);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  context.beginPath();
  context.moveTo(x - 45, y - 110);
  context.lineTo(x - 70, y - 70);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#000000";
  context.stroke();

  //write text
  context.font = "32pt Calibri";
  context.fillStyle = "#FFFFFF";
  context.fillText(d, x + 40, y - 20);

  context.font = "32pt Calibri";
  context.fillStyle = "#FFFFFF";
  context.fillText("Prospect Count", x - 100, y - 230);

  context.restore();
}

// Name: 		Draw unopned and new brand lead
// Author: 		Peter Chen
// Purpose: 	Unopened and new brand lead infographic elements
// Arguments:   DrawUnopenedLead(canvas_name, x_position, y_position, unopened_data, new_data);
// Data format: value
// Example:     DrawUnopenedLead("myCanvas", 0, 0, 1000, 1200);
window.DrawUnopenedLead = function DrawUnopenedLead(c, x, y, d, d2) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();
  var img_unopened = new Image();
  //write text
  context.beginPath();
  context.fillStyle = "#FFFFFF";
  context.font = "24pt Calibri";
  context.fillText("The Number of Leads", x + 400, y - 50);
  context.font = "28pt Calibri";
  context.fillText("Unopened", x + 400, y - 10);
  context.fillText(d, x + 640, y - 10);
  context.fillText("New Brand", x + 400, y + 30);
  context.fillText(d2, x + 640, y + 30);
  //load image
  img_unopened.onload = function() {
    context.drawImage(img_unopened, x, y - 100, img_unopened.width / 1.4, img_unopened.height / 1.4);
  }

  img_unopened.src = leadUnopened;
  context.restore();

}

// Name: 		Draw New 3PL Lead
// Author: 		Peter Chen
// Purpose: 	New 3PL Lead infographic elements
// Arguments:   Draw3PL(canvas_name, x_position, y_position, width, height, new_3PL_data);
// Data format: value
// Example:     Draw3PL("myCanvas", 0, 0, 400, 400, 1000);
window.Draw3PL = function Draw3PL(c, x, y, w, h, myArray) {
  var canvas = document.getElementById(c);
  var cxt = canvas.getContext("2d");
  cxt.save();
  //Adjust chart width and height
  w = w - 20;
  h = h - 50;
  var max = 0; //Innitialise maximum bar height to zero
  var len = 0; //Innitialise no of bars to zero
  var c1 = "#7FFF24";
  var c2 = "#FFFFFF";
  var sum = 0;
  for(var key in myArray) {
    if (myArray[key] > max) max = myArray[key];
    sum += myArray[key];
    len++;
  }
  var border = 4;  //Changing the border mar distort the graph
  var bar_h = (h - border) / len;
  var gradient = cxt.createLinearGradient(w / 2, 50, w / 2, h);
  gradient.addColorStop(0, '#000000');
  gradient.addColorStop(0.1, '#EEEEEE');
  gradient.addColorStop(0.5, '#FFFFFF');
  gradient.addColorStop(1, '#000000');

  max = max - border;
  txtArea = w * 0.2;
  full = w - (border * 2) - txtArea;
  cxt.strokeStyle = '#FFFFFF';
  cxt.save();

  cxt.shadowOffsetX = border / 2;
  cxt.shadowOffsetY = border / 2;
  cxt.shadowBlur = border / 2;
  cxt.shadowColor = "black";
  cxt.fillStyle = c1;
  n = 0;
  for(key in myArray) {
    cxt.fillRect(border + txtArea + x, (border * 2) + (bar_h * n) + y, (myArray[key] / max) * full, bar_h - border);
    n++;
  }

  cxt.shadowColor = "#FFFFFF";
  n = 0;
  for(key in myArray) {
    cxt.strokeRect(border + txtArea + x, (border * 2) + (bar_h * n) + y, (myArray[key] / max) * full, bar_h - border);
    n++;
  }

  cxt.shadowOffsetX = border / -2;
  n = 0;
  for(key in myArray) {
    cxt.strokeRect(border + txtArea + x, (border * 2) + (bar_h * n) + y, ((myArray[key] / max) * full), bar_h - border);
    n++;
  }
  cxt.shadowOffsetY = border / -2;
  n = 0;
  for(key in myArray) {
    cxt.strokeRect(border + txtArea + x, (border * 2) + (bar_h * n) + y, ((myArray[key] / max) * full), bar_h - border);
    n++;
  }
  cxt.restore();
  cxt.save();
  cxt.font = 'bold 14px sans-serif';
  cxt.shadowOffsetX = 1;
  cxt.shadowOffsetY = 1;
  cxt.shadowBlur = 1;
  cxt.shadowColor = "white";
  n = 0;
  for(key in myArray) {
    cxt.fillStyle = c2;
    cxt.fillText(key, (border + 10) + x - 45, (border * 2) + (bar_h * n) + (bar_h / 1.8) + y, txtArea - 15);
    cxt.fillText(myArray[key], (border + 10 + txtArea) + x,
      (border * 2) + (bar_h * n) + (bar_h / 1.8) + y, full);
    n++;
  }
  cxt.restore();

  cxt.fillStyle = c2;
  cxt.font = '28pt Calibri';
  cxt.fillText("New 3PL Leads", (border * 1.5) + x + 40, y, w);

}

// Name: 		DrawEffectiveness
// Author: 		Peter Chen
// Purpose: 	New 3PL Lead infographic elements
// Arguments:   DrawEffectiveness(canvas_name, x_position, y_position, date, Dealer_data, Brand_data);
// Data format: value
// Example:     DrawEffectiveness("myCanvas", 0, 0, 01/01/2012, 400, 1000);
window.DrawEffectiveness = function DrawEffectiveness(c, x, y, date, d, b) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");
  context.save();

  var lineWidth = 7;
  var maxHeight = 200;
  var bHeight = 0;
  var dHeight = 0;

  bHeight = maxHeight * (b - 1);
  dHeight = maxHeight * (d - 1);
  //write text
  context.beginPath();
  context.fillStyle = "#FFFFFF";
  context.font = "24pt Calibri";
  context.fillText("Effectiveness", x, y);
  context.fillText("100%", x + 640, y + 15);
  context.fillText(monthname[date.getMonth()], x, y + 30);

  context.beginPath();
  context.moveTo(x + 60, y + 20);
  context.lineTo(x + 700, y + 20);
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.strokeStyle = "#FFFFFF";
  context.stroke();

  context.beginPath();
  context.arc(x + 310, y + 17 - bHeight, 75, Math.PI, 2 * Math.PI, false);
  context.rect(x + 235, y + 17, 150, -bHeight);
  context.fillStyle = "#2554C7";
  context.fill();

  context.beginPath();
  context.arc(x + 510, y + 23 - dHeight, 75, 0, Math.PI, false);
  context.rect(x + 435, y + 23, 150, -dHeight);
  context.fillStyle = "#38ACEC";
  context.fill();

  context.beginPath();
  context.fillStyle = "#000000";
  context.font = "24pt Calibri";
  context.fillText("Brand", x + 270, y - 30);
  context.fillText(Math.round(b * 100) + "%", x + 280, y);
  context.fillText(Math.round(d * 100) + "%", x + 490, y + 60);
  context.fillText("Dealer", x + 470, y + 90);

  context.restore();
}

window.talkBub = function talkBub(c, talkbubX, talkbubY, d) {
  var canvas = document.getElementById(c);
  var context = canvas.getContext("2d");

  context.save();
  context.translate(talkbubX, talkbubY);
  context.rotate(-Math.PI / 2);
  context.translate(-talkbubX, -talkbubY);
  DrawSection(c, talkbubX, talkbubY, 120, 120, [20, d]);
  context.restore();

  talkbubX = talkbubX + 225;
  talkbubY = talkbubY - 120;

  //Draw the other half of the bubble with rounded edges
  context.save();
  context.translate(talkbubX, talkbubY);
  context.rotate(Math.PI / 2);
  context.translate(-talkbubX, -talkbubY);
  DrawSection(c, talkbubX, talkbubY, 120, 120, [, d]);
  context.restore();
}

window.addCommas = function addCommas(nStr) {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  while(rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }

  return x1 + x2;
}
