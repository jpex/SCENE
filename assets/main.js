/*
    Style Helper
*/
let   pageWidth   = $(window).width(), gutter;
const mqTablet    = 768,
      mqDesktop   = 1280,
      mqLgDesktop = 1700;

const work1  = Math.round($('.work-1').offset().top),
      work2  = Math.round($('.work-2').offset().top),
      work3  = Math.round($('.work-3').offset().top);

let work1Pos = work1 + gutter,
    work2Pos = work2 + gutter,
    work3Pos = work3 + gutter;

function mq() {
  pageWidth = $(window).width();
  if (pageWidth < mqTablet) { gutter = 40; }
  else if (pageWidth >= mqTablet && pageWidth < mqLgDesktop) { gutter = 70; }
  else { gutter = 120; }
  work1Pos = work1 + gutter;
  work2Pos = work2 + gutter;
  work3Pos = work3 + gutter;
} mq();


//////////

const w1 = $('.work-1'), w1top = w1.position().top;
const w2 = $('.work-2'), w2top = w2.position().top;
const w3 = $('.work-3'), w3top = w3.position().top;

console.log(gutter + " " + w1top + " " + w2top + " " + w3top);

$(window).scroll(function(){
  const st = $(window).scrollTop();
  if (st >= 0 - gutter) { w1.addClass('fix'); }
  else { w1.removeClass('fix'); }
  if (st >= w1top - gutter) { w2.addClass('fix'); }
  else { w2.removeClass('fix'); }
  if (st >= w2top - gutter) { w3.addClass('fix'); }
  else { w3.removeClass('fix'); }
});

//////////
// $(window).on("scroll", function() {
//   const scroll = Math.round($(window).scrollTop());
//   if (scroll < work1Pos) {
//     console.log("fire this if statement " + scroll + " " + work2Pos);
//     $('.work').removeClass('fix');
//     $('.work-1').addClass('fix');
//   } else if (scroll < work2Pos) {
//     console.log("fire this ELSE/if statement");
//     $('.work').removeClass('fix');
//     $('.work-2').addClass('fix');
//   } else {
//     console.log("fire this ELSE ONLY statement");
//     $('.work').removeClass('fix');
//   }
// });


// // var rellax1 = new Rellax('.rellax', {
// //   speed: 2
// // });
// var rellax2 = new Rellax('.rellax2', {
//   speed: 6
// });
// var rellax3 = new Rellax('.rellax3', {
//   speed: 6
// });

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
