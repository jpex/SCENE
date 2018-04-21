/*
    Style Helper
*/
let pageWidth = $(window).width(), gutter;
const mqTablet    = 768,
      mqDesktop   = 1280,
      mqLgDesktop = 1700;


function mq() {
  pageWidth = $(window).width();
  if (pageWidth < mqTablet) { gutter = 40; }
  else if (pageWidth >= mqTablet && pageWidth < mqLgDesktop) { gutter = 70; }
  else { gutter = 120; }
} mq();

const work1  = Math.round($('.work-1').offset().top),
      work2  = Math.round($('.work-2').offset().top),
      work3  = Math.round($('.work-3').offset().top);


$('#works > div').on("click", function() {
  let   that   = $(this);
  const scroll = that.offset().top;
  const time   = Math.abs($(window).scrollTop() - scroll) + 100;

  $('html, body').animate({
    scrollTop: that.offset().top - gutter
  }, time).promise().done(function() {
    $('#works > .work').addClass('hide');
    that.removeClass('hide').addClass('grow');
    $('#works').addClass('appear');
    $('.hud-top').addClass('transparent');
  });
});
