/*
    Style Helper
*/
let   pageWidth   = $(window).width(), gutter, scrollControl = true;
const mqTablet    = 768,
      mqDesktop   = 1280,
      mqLgDesktop = 1700;

let lastClickEl;

let homePage = $('#home-page').length;
let w1, w2, w3, w4, w1top, w2top, w3top, w4top = 0;

homePage ? scrollControl = true : scrollControl = false;

function mq() {
  pageWidth = $(window).width();
  if (pageWidth < mqTablet) { gutter = 40; }
  else if (pageWidth >= mqTablet && pageWidth < mqLgDesktop) { gutter = 70; }
  else { gutter = 120; }
} mq();



if (homePage) {
  w1 = $('.work-1'), w1top = w1.position().top;
  w2 = $('.work-2'), w2top = w2.position().top;
  w3 = $('.work-3'), w3top = w3.position().top;
  w4 = $('.work-4'), w4top = w4.position().top;
  fixer();
}

$(window).scroll(function(){
  if (scrollControl && homePage) {
    window.requestAnimationFrame(fixer);
  }
});

function fixer() {
  const st = $(window).scrollTop();
  $('.dot').removeClass('active');
  if (st >= 0 - gutter - 15) {
    $('.dot').removeClass('active');
    $('.dot-1').addClass('active');
    w1.addClass('fix');
  }
  else { w1.removeClass('fix'); }
  if (st >= w1top - gutter - 15) {
    $('.dot').removeClass('active');
    $('.dot-2').addClass('active');
    w2.addClass('fix');
  }
  else { w2.removeClass('fix'); }
  if (st >= w2top - gutter - 15) {
    $('.dot').removeClass('active');
    $('.dot-3').addClass('active');
    w3.addClass('fix');
  }
  else { w3.removeClass('fix'); }
  if (st >= w3top - gutter - 15) {
    $('.dot').removeClass('active');
    $('.dot-4').addClass('active');
    w4.addClass('fix');
  }
  else { w4.removeClass('fix'); }
}

function hudFixer() {
  fixer();
  $('.header-container').removeClass('reveal-in-down');
  $('.hud-h-list').removeClass('reveal-in');
  setTimeout(function () {
    $('.hud-h-list').addClass('reveal-in');
    $('.header-container').addClass('reveal-in-down');
  }, 200);
}

const homePageTransition = (element) => {
  let   that   = $(element);
  const scroll = that.offset().top + gutter;
  const time   = Math.abs($(window).scrollTop() - scroll) + 300;
  $('.hud-h-list').addClass('reveal-out-down');
  that.removeClass('fix');
  $('html, body').animate({
    scrollTop: that.offset().top - gutter
  }, time).promise().done(function() {
    that.addClass('work-fixed');
    $('html, body').scrollTop(0);
    $('#works .work').addClass('hide');
    that.removeClass('hide').addClass('grow');
    $('#works').addClass('appear');
    $('.hud-top').addClass('transparent');
  });
}


const casePageTransition = () => {
  const time = Math.round($(window).scrollTop() / 1.5);
  $('html, body').delay(100).animate({
    scrollTop: 0 }, time)
    .delay(200).promise().done(
      function() {
        $('.hud-top').removeClass().addClass('hud-top transparent');
        $('.header-container').addClass('hide');
        $('#works').removeClass('appear fixed').delay(600).promise().done(
          function() {
            $('.hud-top').removeClass('transparent');
            $('#case-page ~ #works .work').removeClass('no-animation').addClass('fade-out');
          }
        );
      }
    );
    return 1500;
}

function transitionManager(element) {
  if ($('#home-page').length) {
    homePageTransition(element);
  } else if ($('#case-page').length) {
    casePageTransition();
  }
}

$(document.body).on('click', '.dot' ,function(){
  const goTo = $('#works').find(`.work-${$(this).data("work")}`);
  const time = Math.round(Math.abs($(window).scrollTop() - goTo.offset().top - gutter) / 3);

  $('html, body').animate({
    scrollTop: goTo.offset().top - gutter
  }, time).promise().done(function() {
    fixer();
  });

});

$('document').ready(function(){
  var transEffect = Barba.BaseTransition.extend({

      start: function(){
        const that = this;
        $.when(transitionManager(lastClickEl)).done(function() {
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
          nc.addClass('homePageSlide');
          $(_this.oldContainer).fadeOut(0, function(){
            nc.removeClass('page-fixed');
            homePage ? hudFixer() : '';
            _this.done();
          })
        });
      }
  });
  Barba.Pjax.getTransition = function() {
    return transEffect;
  }
  Barba.Dispatcher.on('linkClicked', (el) => {
    lastClickEl = el;
    if ($(el).attr('href') == '/') { homePage = true; }
  });

  Barba.Pjax.start();
});
