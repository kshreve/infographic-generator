var currentWidth;
var orient = "";

window.currentWidth =currentWidth;
window.orient=orient;

window.updateLayout = var updateLayout = function() {
  if (window.innerWidth !== currentWidth) {
    currentWidth = window.innerWidth;

    if (currentWidth === 320) {
      orient = "portrait";
    } else {
      orient = "landscape";
    }
    document.body.setAttribute("orient", orient);
    window.scrollTo(0, 1);
  }
};
setInterval(updateLayout, 400);

$(document).ready(function() {
  $('ul').roundabout({
    minScale: 0.6,
    reflect: true,
    enableDrag: true,
    tilt: -3
  });
});

// This technique is almost exactly the same as a full <a> page refresh, but it prevents Mobile Safari from jumping out of full-screen mode
window.navigator_Go = (url) => {
  window.location.assign(url);
}
