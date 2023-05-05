(function ($) {
  'use strict'

  function toggleBlock () {
    /* Toggle Box --------------------- */
    $('.obb-toggle-trigger').click(function (e) {
      // $(this).toggleClass('active').next().fadeToggle('slow')
      $(this).toggleClass('active')
      e.preventDefault()
    })
  }

  $(document)
    .ready(toggleBlock)
})(jQuery)
