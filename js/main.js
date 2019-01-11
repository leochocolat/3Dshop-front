window.addEventListener('mousemove', function(e) {

  var posX = e.clientX;
  var posY = e.clientY;

  TweenMax.to(".fake-cursor", .3, {left: posX, top: posY, ease:Power3.easeOut});

});
