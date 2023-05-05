(function ($) {
  'use strict'

  /* Submenu Offset Fix --------------------- */
  function menuOffset () {
    var mainWindowWidth = $(window).width() + 120

    $('ul.obb-menu li.menu-item-has-children').mouseover(function () {
      // Checks if third level menu exist
      var subMenuExist = $(this).find('.sub-menu').length
      if (subMenuExist > 0) {
        var subMenuWidth = $(this).find('.sub-menu').width()
        var subMenuOffset = $(this).find('.sub-menu').parent().offset().left + subMenuWidth

        // If sub menu is off screen, give new position
        if ((subMenuOffset + subMenuWidth) > mainWindowWidth) {
          var newSubMenuPosition = subMenuWidth
          $(this).find('.sub-menu').css({
            left: 'auto',
            right: '0'
          })
          $(this).find('.sub-menu .sub-menu').css({
            left: -newSubMenuPosition - 32,
            right: '0'
          })
        }
      }
    })
  }

  /* Header Block Position --------------------- */
  function headerSetup () {
    if ($('.obb-header').hasClass('position-fixed')) {
      $('.site-header').attr('data-position', 'position-fixed')
    }
    if ($('.obb-header').hasClass('position-absolute')) {
      $('.site-header').attr('data-position', 'position-absolute')
    }
    if ($(this).scrollTop() > 80) {
      $('.header-transparent-scroll').addClass('scrolling')
      $('.obb-mobile-menu-container').addClass('scrolling')
    } else {
      $('.header-transparent-scroll').removeClass('scrolling')
      $('.obb-mobile-menu-container').removeClass('scrolling')
    }
  }

  /* Header Block Mobile Submenus --------------------- */
  function subMenuSetup() {
    if ($(window).width() <= 768) {
      if ($('.obb-mobile-menus #mobile-nav-large ul.obb-menu ul.sub-menu').css('display') == 'none') {
        // Toggle submenus
        var subMenuToggle = $('.obb-menu li.menu-item-has-children > .dropdown').unbind();
        subMenuToggle.on('click', function(e) {
          e.preventDefault();
          var submenu = $(this).parent().children('.obb-mobile-menus ul.obb-menu ul.sub-menu');
          if ($(submenu).is(':hidden')) {
            $(submenu).slideDown(200);
          } else {
            $(submenu).slideUp(200);
          }
        })
        subMenuToggle.on('dblclick', function (e) {
          window.location.replace($(this).attr('href'))
        })
      }
    }
  }

  function generalFunctions () {
    /* Add Mobile Menu Dropdown Arrows --------------------- */
    $(".obb-mobile-menus #mobile-nav-large ul.obb-menu li.menu-item-has-children").append("<span class='dropdown'><i class='fas fa-chevron-down'></i></span>");

    /* Toggle Mobile Menu --------------------- */
    $('.obb-mobile-menu-container').each(function (index, obj) {
      var mobileMenuID = obj.getAttribute('data-mobile-id')
      $('#' + mobileMenuID + ' .obb-menu-toggle.open').on('click touchstart', function () {
        $('.' + mobileMenuID + '.obb-mobile-menu-container').addClass('revealed')
        $('body').addClass('mobile-menu-open')
      })
      $('.' + mobileMenuID + ' .obb-menu-toggle.close, .' + mobileMenuID + ' .obb-mobile-menus li a').on('click swipeleft', function () {
        $('.' + mobileMenuID + '.obb-mobile-menu-container').removeClass('revealed')
        $('body').removeClass('mobile-menu-open')
      })
    })

    /* Scroll To Top Button --------------------- */
    $('button.obb-footer-return').click(function () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })

    /* Animate Page Scroll --------------------- */
    $('.scroll-link a').on('click', function (event) {
      event.preventDefault()
      var dest = $(this).attr('href')
      // console.log(dest)
      if (dest.length) {
        $('html,body').animate({ scrollTop: $(dest).offset().top }, 500)
      }
    })

    /* Remove Links From Link Container Content --------------------- */
    $('.obb-link-content a').removeAttr('href')

    /* Modal Button -------------------- */
    $('.obb-modal-open[rel~="modal:open"]').click(function (event) {
      $(this).modal()
      return false
    })
  }

  $(document)
    .ready(generalFunctions)
    .ready(menuOffset)
    .ready(headerSetup)

  $(window)
    .on('scroll', headerSetup)
    .on('load', subMenuSetup)
    .on('resize', subMenuSetup)
})(jQuery)
