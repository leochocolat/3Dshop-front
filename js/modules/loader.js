var windowHeight = window.innerHeight;
var containerWidth = $(".container-brand").width();
var containerHeight = $(".container-brand").height();
var brandWidth = $(".brand").width();
var brandHeight = $(".brand").height();
var brandName = "NIKE 3D ";
var fontSize = 200;
var newSize = 0;
var colNumber = 0;
var colNumberMax = 8;
let divNumber = 0;
let divNumberMax = 0;

function createElements() {

  divNumber = Math.ceil( windowHeight / containerHeight );

  for(n = 0; n < divNumber * 10; n++) {
    $(".brand")[0].innerHTML = brandName;
    let line = document.createElement("DIV");
    line.setAttribute("class", "line");
    document.getElementById("container-brand").appendChild(line);

     for(i=0; i < colNumberMax; i++) {
       let span = document.createElement("span");
       span.setAttribute("class", "brand");
       span.innerHTML = brandName;
       document.getElementsByClassName("line")[n].appendChild(span);
     }
  }

}



function resize() {

  $(".brand").innerHTML = brandName;
  var letterSizeAverage = brandWidth / $(".brand")[0].innerText.length;
  var fontFactor = fontSize / letterSizeAverage;

  newLetterSizeAverage = containerWidth / ($(".brand")[0].innerText.length * colNumber);
  newFontSize = newLetterSizeAverage * fontFactor;

  $(".line").css("opacity", 1);
  $(".brand").css("font-size", newFontSize + "px");
  $(".brand").css("line-height", newFontSize + "px");
  $(".line").css("line-height", newFontSize + "px");

}

function explosion() {

  console.log($(".brand").length);

  for(i=0; i < $(".brand").length; i++) {
    var randomTranslateX = Math.random() * window.innerWidth;
    var randomTranslateY = Math.random() * window.innerHeight;
    // var explose = new TimelineMax();
    // explose.add([
      TweenMax.to($(".brand")[i], 1, {x: randomTranslateX - windowHeight, y: randomTranslateY, ease: Power3.easeOut})
    // ]);
  }

}


function init() {
  colNumber = 3;
  createElements();
  resize();
  update();
}

function update() {

  // var firstTiming = 200;
  var timing = 300;

  setTimeout( function() {
    colNumber = 3;
    resize();
  }, 1 * timing);
  setTimeout( function() {
    colNumber = 4;
    resize();
  }, 2 * timing);
  setTimeout( function() {
    colNumber = 5;
    createElements();
    resize();
  }, 3 * timing);
  setTimeout( function() {
    colNumber = 6;
    resize();
  }, 4 * timing);
  // setTimeout( function() {
  //   colNumber = 7;
  //   resize();
  // }, 1000);
  // setTimeout( function() {
  //   colNumber = 8;
  //   resize();
  // }, 1200);
  setTimeout( function() {
    colNumber = 3;
    resize();
  }, 5 * timing);
  setTimeout( function() {
    colNumber = 4;
    resize();
  }, 6 * timing);
  setTimeout( function() {
    colNumber = 5;
    resize();
  }, 7 * timing);
  setTimeout( function() {
    colNumber = 6;
    resize();
    explosion();
  }, 8 * timing);

}

$(document).ready(function() {
  init();
});

window.addEventListener("resize", function() {
  resize();
});
