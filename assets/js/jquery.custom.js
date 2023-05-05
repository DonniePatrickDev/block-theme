(function ($) {
  'use strict'

  /* Animate On Scroll --------------------- */
  function animateScroll(){
    $('[class*=animate__]').each(function(){
      var elemPos = $(this).offset().top,
      topOfWindow = $(window).scrollTop();

      $(this).css("animationPlayState", "paused")
      $(this).css("animationDelay", "0.2s")
      
      if ( elemPos <= topOfWindow + $(window).height() + 50 ) {
        $(this).addClass('animate__animated')
        $(this).css("animationPlayState", "running")
      } else {
        $(this).removeClass('animate__animated')
      }
    });
  }

  /* Header Position --------------------- */
  function headerSetup () {
    // Resize Spacer Block
    $(".site-header + .wp-block-spacer").css({'height':($(".header-wrapper.position-fixed").outerHeight() + 48 + 'px')});

    // Check For Image Banners
    if ($('.page-template-template-blank .site-main > .entry-content > .alignfull:first-child').hasClass('obb-hero') ||
    $('.page-template-template-blank .site-main > .entry-content > .alignfull:first-child').hasClass('obb-slideshow') ||
    $('.page-template-template-blank .site-main > .entry-content > .alignfull:first-child').hasClass('wp-block-cover') ||
    $('.page-template-template-blank .site-main > .entry-content > .alignfull:first-child').hasClass('wp-block-image') ||
    $('.site-main > .alignfull:first-child').hasClass('site-banner') ||
    $('.site-main > .alignfull:first-child').hasClass('wp-block-cover')) {
      $('.site-header .header-wrapper').addClass('is-transparent')
    }
    if ($('.header-wrapper').hasClass('position-fixed')) {
      $('.header-wrapper').attr('data-position', 'position-fixed')
    }
    if ($('.header-wrapper').hasClass('position-absolute')) {
      $('.header-wrapper').attr('data-position', 'position-absolute')
    }
    if ($(this).scrollTop() > 80) {
      $('.is-transparent').addClass('scrolling')
    } else {
      $('.is-transparent').removeClass('scrolling')
    }
  }

  /* Mobile Submenu Dropdowns --------------------- */
  function subMenuSetup() {
    $('.wp-block-navigation__responsive-container-open').click(function() {
      $(".wp-block-navigation__responsive-container .wp-block-navigation__container > .wp-block-navigation-submenu").append("<span class='dropdown-arrow'><i class='fas fa-chevron-down'></i></span>");
      if ($('.wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation__submenu-container').css('display') == 'none') {
        // Toggle submenus
        var subMenuToggle = $('.wp-block-navigation__container .wp-block-navigation-submenu > .dropdown-arrow').unbind();
        subMenuToggle.on('click touchstart', function(e) {
          e.preventDefault();
          var submenu = $(this).parent().children('.wp-block-navigation__responsive-container.is-menu-open .wp-block-navigation__submenu-container');
          if ($(submenu).is(':hidden')) {
            $(submenu).slideDown(200);
          } else {
            $(submenu).slideUp(200);
          }
        })
      }
    })
    $('.wp-block-navigation__responsive-container-close').click(function() {
      $(".wp-block-navigation__responsive-container .wp-block-navigation__container > .wp-block-navigation-submenu .dropdown-arrow").remove();
    })
  }

  $(document)
    .ready(headerSetup)

  $(window)
    .on('scroll', headerSetup)
    .on('scroll', animateScroll)
    .on('load', subMenuSetup)
})(jQuery)
