---
---

// var rellax = new Rellax('.rellax', {
//     speed: 2
// });
//
// var rellax2 = new Rellax('.rellax2', {
//     speed: -1
// });

const gutter = 70,
      work1  = Math.round($('.work-1').offset().top - gutter),
      work2  = Math.round($('.work-2').offset().top - gutter),
      work3  = Math.round($('.work-3').offset().top - gutter);

      console.log(work1 + " " + work2 + " " + work3);

$(window).on('scroll', function() {
  const scroll = Math.round($(this).scrollTop());
});

function scrollHandler(value, scroll) {
  console.log(value);
  console.log(scroll);
}

$('#works > div').on("click", function() {
  let   that   = $(this);
  const scroll = that.offset().top - 70;
  const time   = Math.abs($(window).scrollTop() - scroll) + 100;

  $('html, body').animate({
    scrollTop: that.offset().top - 70
  }, time).promise().done(function() {
    $('#works > .work').addClass('hide');
    that.removeClass('hide').addClass('grow');
    $('#works').addClass('appear');
    $('.hud-top').addClass('transparent');
  });
});
