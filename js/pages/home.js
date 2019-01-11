$(".cross-btn, .colors-btn").mouseover(function() {
  TweenMax.to(".fake-cursor", .5, {autoAlpha: .5, backgroundColor: $(this).css("background-color"), width: 70, height: 70, x: "-50%", y: "-50%", ease: Power3.easeOut});
});

$(".cross-btn, .colors-btn").mouseleave(function() {
  TweenMax.to(".fake-cursor", .5, {autoAlpha: 0, width: 13, height: 13, x: "0", y: "0", ease: Power3.easeOut});
});
