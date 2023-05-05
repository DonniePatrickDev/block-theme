(function ($) {
  'use strict'

  /* Flexslider --------------------- */
  function obbFlexSliderSetup () {
    $('.obb-slideshow').each(function (index, obj) {
      var slideshowID = obj.getAttribute('data-slide-id')
      var slideCount = $('#' + slideshowID + ' .obb-flexslider').data('per-slide')
      var smoothHeight = $('#' + slideshowID + ' .obb-flexslider').data('type') == 'testimonials' ? false : $('#' + slideshowID + ' .obb-flexslider').data('height')
      // var slideshowID = $('.obb-content-slideshow').data('slide-id')
      if (($).flexslider) {
        if ($(window).width() <= 1024) {
          $('#' + slideshowID + ' .obb-flexslider').flexslider({
            slideshowSpeed: $('#' + slideshowID + ' .obb-flexslider').data('speed'),
            animationDuration: 800,
            animation: $('#' + slideshowID + ' .obb-flexslider').data('transition'),
            video: false,
            useCSS: false,
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>',
            touch: false,
            controlNav: true,
            animationLoop: true,
            smoothHeight: $('#' + slideshowID + ' .obb-flexslider').data('height'),
            pauseOnAction: true,
            pauseOnHover: true,
            itemMargin: 0,
            maxItems: 1,
            minItems: 1,

            start: function (slider) {
              slider.removeClass('loading')
              $('.preloader').hide()
              $('.obb-flexslider').resize()
              // $(window).trigger('resize')
            }
          })
        } else if (slideCount !== 1) {
          $('#' + slideshowID + ' .obb-flexslider').flexslider({
            slideshowSpeed: $('#' + slideshowID + ' .obb-flexslider').data('speed'),
            animationDuration: 800,
            animation: $('#' + slideshowID + ' .obb-flexslider').data('transition'),
            video: false,
            useCSS: false,
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>',
            touch: false,
            controlNav: true,
            animationLoop: true,
            smoothHeight: smoothHeight,
            pauseOnAction: true,
            pauseOnHover: true,
            itemWidth: 320, // Causes width load issue.
            itemMargin: 0,
            maxItems: $('#' + slideshowID + ' .obb-flexslider').data('per-slide'),
            minItems: 1,
            move: 1,

            start: function (slider) {
              slider.removeClass('loading')
              slider.doMath()
              $('.preloader').hide()
              $('.obb-flexslider').resize()
              // $(window).trigger('resize')
            }
          })
        } else {
          $('#' + slideshowID + ' .obb-flexslider').flexslider({
            slideshowSpeed: $('#' + slideshowID + ' .obb-flexslider').data('speed'),
            animationDuration: 800,
            animation: $('#' + slideshowID + ' .obb-flexslider').data('transition'),
            video: false,
            useCSS: false,
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>',
            touch: false,
            controlNav: true,
            animationLoop: true,
            smoothHeight: smoothHeight,
            pauseOnAction: true,
            pauseOnHover: true,
            itemWidth: 320, // Fixes width load issue.
            itemMargin: 0,
            maxItems: $('#' + slideshowID + ' .obb-flexslider').data('per-slide'),
            minItems: 1,

            start: function (slider) {
              slider.removeClass('loading')
              $('.preloader').hide()
              $('.obb-flexslider').resize()
              // $(window).trigger('resize')
            }
          })
        }
      }
    })
  }

  function modifyStyles () {
    $('.obb-slideshow').each(function (index, obj) {
      var slideshowID = obj.getAttribute('data-slide-id')
      var slideNav = $('#' + slideshowID).data('slide-nav')
      var slideArrows = $('#' + slideshowID).data('slide-arrows')
      var slideCount = $('#' + slideshowID + ' .obb-flexslider').data('per-slide')
      if (slideNav === '') {
        $('#' + slideshowID + ' .flex-control-nav').css('display', 'none')
      }
      if (slideArrows === '') {
        $('#' + slideshowID + ' .flex-direction-nav').css('display', 'none')
      }
      if (slideCount === 1) {
        $('#' + slideshowID).removeClass('obb-multi-posts-slide')
      }
    })
  }

  // When certain blocks are clicked or after a delay, trigger the window resize event
  function resizeSlider() {
    $('.wp-block[data-type="obb/slideshow-block"], .wp-block[data-type="obb/testimonial-block"], .edit-post-visual-editor .organic-slideshow-block, .edit-post-visual-editor .organic-testimonial-block')
      .on('click', function () {
        $(window).trigger('resize');
      });
    setTimeout(function () {
      $(window).trigger('resize');
    }, 3500);
  }

  $(window).on('load', obbFlexSliderSetup)
  $(window).on('resize', obbFlexSliderSetup)
  $(window).on('load', modifyStyles)
  $(window).on('resize', modifyStyles)
  $(document).ready(resizeSlider)

  // Load flexslider in FSE. Hacky, but necessary until editor improves.
  $('iframe.edit-site-visual-editor__editor-canvas').ready(function (e) {
    // On initial load.
    setTimeout(function () {
      // console.log('I loaded!')
      resizeSlider()
    }, 4500)
    // On scroll within FSE iframe.
    $(this).on('scroll', function () {
      // console.log('I scrolled!')
      resizeSlider()
    })
    // On click within FSE iframe.
    $(this).contents().bind('click', function (e) {
      setTimeout(function () {
        // console.log('I clicked!')
        window.triggerReload = function () {
          resizeSlider()
        }
        window.triggerReload()
      }, 1500)
    })
    // $(this).contents().bind('keyup', function (e) {
    //   console.log('I changed!')
    //   obbFlexSliderSetup()
    // })
  })
})(jQuery)
