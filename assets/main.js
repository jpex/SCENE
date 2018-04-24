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

function homePageTransition(element) {
  let   that   = $('.work-1');
  const scroll = that.offset().top + gutter;
  const time   = Math.abs($(window).scrollTop() - scroll) + 300;
  scrollControl = false;

  that.removeClass('fix');
  $('html, body').animate({
    scrollTop: that.offset().top - gutter
  }, time).promise().done(function() {
    $('#works .work').addClass('hide');
    that.removeClass('hide').addClass('grow');
    $('#works').addClass('appear');
    $('.hud-top').addClass('transparent');
  });
}

let ele = $('.work-1');

function transitionManager() {
  if ($('#home-page').length) {
    homePageTransition();
  } else if ($('#case-page').length) {
  }
}

$('document').ready(function(){
  var transEffect = Barba.BaseTransition.extend({
      start: function(){
        const that = this;
        $.when(transitionManager()).done(function() {
          setTimeout(function(){
            that.newContainerLoading
              .then(val => {
                that.newPage($(that.newContainer))
              });
          }, 1500);
        });

      },
      newPage: function(nc) {

        var _this = this;
        nc.addClass('page-fixed');
        nc.css('visibility','visible');
        nc.find('.hide').removeClass('hide');
        nc.fadeIn(0).promise().done(() => {

          $(_this.oldContainer).fadeOut(0, function(){
            nc.removeClass('page-fixed');
            _this.done();
          })
        });
      },
      test2: function() {
        console.log("test ele");
        let   that   = $('.work-1');
        const scroll = that.offset().top + gutter;
        const time   = Math.abs($(window).scrollTop() - scroll) + 300;
        scrollControl = false;

        that.removeClass('fix');
        $('html, body').animate({
          scrollTop: that.offset().top - gutter
        }, time).promise().done(function() {
          $('#works > .work').addClass('hide');
          that.removeClass('hide').addClass('grow');
          $('#works').addClass('appear');
          $('.hud-top').addClass('transparent');
        });
      }
  });
  Barba.Pjax.getTransition = function() {
    return transEffect;
  }
  Barba.Pjax.start();
});
