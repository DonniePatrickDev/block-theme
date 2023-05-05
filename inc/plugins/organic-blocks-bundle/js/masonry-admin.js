(function ($) {
  'use strict'

  /* Masonry --------------------- */
  function masonrySetup () {
    var $container = $('.obb-masonry-container')
    $container.masonry({
      gutter: '.obb-grid-spacer',
      itemSelector: '.obb-masonry-wrapper'
    })
  }

  /* Isotope --------------------- */
  function isotopeSetup () {
    $('.obb-portfolio, .obb-posts').each(function (index, obj) {
      var filterID = obj.getAttribute('data-id')
      var $grid = $('#' + filterID + ' .obb-masonry-container.obb-isotope')
      // Quick search regex
      var qsRegex

      // init Isotope
      $grid.imagesLoaded(function () {
        $grid.isotope({
          itemSelector: '.obb-masonry-wrapper',
          percentPosition: true,
          masonry: {
            gutter: '.obb-grid-spacer'
          }
        })
      })

      // use value of search field to filter
      $('#' + filterID + ' .obb-filter-search').on('click', 'input', function () {
        $('.obb-filter-buttons button').off('click')
        var $quicksearch = $('.quicksearch').keyup(debounce(function () {
          qsRegex = new RegExp($quicksearch.val(), 'gi')
          $grid.isotope({
            filter: function () {
              return qsRegex ? $(this).text().match(qsRegex) : true
            }
          })
        }, 200))
      })

      $('#' + filterID + ' .obb-filter-buttons').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter')
        $grid.isotope({ filter: filterValue })
      })

      // debounce so filtering doesn't happen every millisecond
      function debounce (fn, threshold) {
        var timeout
        threshold = threshold || 100
        return function debounced () {
          clearTimeout(timeout)
          var args = arguments
          var _this = this
          function delayed () {
            fn.apply(_this, args)
          }
          timeout = setTimeout(delayed, threshold)
        }
      }
    })
  }

  $(window).on('load', isotopeSetup)
  $(window).on('load', masonrySetup)
  $(window).on('resize', masonrySetup)
  $(window).on('resize', isotopeSetup)
  if (wp.data) {
    wp.data.subscribe(function () {
      var isSuccess = wp.data.select('core/editor').didPostSaveRequestSucceed()
      var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost()
      var contentChanged = wp.data.select('core/editor').hasChangedContent()
      if (isSuccess || isAutosavingPost || contentChanged) {
        setTimeout(function () {
          isotopeSetup()
        }, 500)
      }
    })
  }
})(jQuery)
