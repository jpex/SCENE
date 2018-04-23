/*
    Style Helper
*/
let   pageWidth   = $(window).width(), gutter, scrollControl = true;
const mqTablet    = 768,
      mqDesktop   = 1280,
      mqLgDesktop = 1700;

function mq() {
  pageWidth = $(window).width();
  if (pageWidth < mqTablet) { gutter = 40; }
  else if (pageWidth >= mqTablet && pageWidth < mqLgDesktop) { gutter = 70; }
  else { gutter = 120; }
} mq();

const w1 = $('.work-1'), w1top = w1.position().top;
const w2 = $('.work-2'), w2top = w2.position().top;
const w3 = $('.work-3'), w3top = w3.position().top;

$(window).scroll(function(){
  if (scrollControl) {
    window.requestAnimationFrame(fixer);
  }
});

function fixer() {
  const st = $(window).scrollTop();
  if (st >= 0 - gutter) { w1.addClass('fix'); }
  else { w1.removeClass('fix'); }
  if (st >= w1top - gutter) { w2.addClass('fix'); }
  else { w2.removeClass('fix'); }
  if (st >= w2top - gutter) { w3.addClass('fix'); }
  else { w3.removeClass('fix'); }
}

$('#works > div').on("click", function() {
  let   that   = $(this);
  const scroll = that.offset().top + gutter;
  const time   = Math.abs($(window).scrollTop() - scroll) + 300;
  scrollControl = false;

  $(this).removeClass('fix');
  $('html, body').animate({
    scrollTop: that.offset().top - gutter
  }, time).promise().done(function() {
    $('#works > .work').addClass('hide');
    that.removeClass('hide').addClass('grow');
    $('#works').addClass('appear');
    $('.hud-top').addClass('transparent');
  });
});
