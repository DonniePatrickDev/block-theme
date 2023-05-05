(function ($) {
  'use strict'

  function alertBlock () {
    /* Close Alert Box --------------------- */
    $('.obb-alert-box button.obb-alert-close').click(function () {
      $(this).parent().parent().stop().fadeOut('slow', function () {
      })
    })
  }

  function alertPopup (e) {
    /* Open Alert Popup On Window Exit --------------------- */
    if (e.pageY - $(window).scrollTop() <= 0 || e.pageX - $(window).scrollTop() <= 0 || (e.pageY >= window.innerWidth || e.pageX >= window.innerHeight)) {
      $('.obb-alert.obb-alert-popup').show()
      $(document).unbind('mouseleave')
    }
  }

  $(document)
    .ready(alertBlock)
    .bind('mouseleave', alertPopup)
})(jQuery)
