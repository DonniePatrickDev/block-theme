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
  $('iframe.edit-site-visual-editor__editor-canvas').ready(function (e) {
    setTimeout(function () {
      isotopeSetup()
      masonrySetup()
    }, 1500)
    // On scroll within FSE iframe.
    // $(this).on('scroll', function () {
    //   isotopeSetup()
    //   masonrySetup()
    // })
  })
  // if ($('.obb-masonry-container.obb-isotope').length) {
  //   $(window).on('scroll', function () {
  //     // This is then function used to detect if the element is scrolled into view.
  //     function elementScrolled (elem) {
  //       // if ($(elem).length === 0) {
  //       //   return
  //       // }
  //       var docViewTop = $(window).scrollTop()
  //       var docViewBottom = docViewTop + $(window).height()
  //       var elemTop = $(elem).offset.top
  //       return ((elemTop <= docViewBottom) && (elemTop >= docViewTop))
  //     }
  //     // This is where we use the function to detect if element is scrolled into view.
  //     if (elementScrolled('.obb-masonry-container.obb-isotope')) {
  //       isotopeSetup()
  //     }
  //   })
  // }
  // $('iframe.edit-site-visual-editor__editor-canvas').ready(function (e) {
  //   // On initial load.
  //   // setTimeout(function () {
  //   //   // console.log('I loaded!')
  //   //   isotopeSetup()
  //   // }, 4500)
  //   // On scroll within FSE iframe.
  //   $(this).on('scroll', function () {
  //     // console.log('I scrolled!')
  //     isotopeSetup()
  //   })
  //   // On click within FSE iframe.
  //   $(this).contents().bind('click', function (e) {
  //     setTimeout(function () {
  //       // console.log('I clicked!')
  //       window.triggerReload = function () {
  //         isotopeSetup()
  //       }
  //       window.triggerReload()
  //     }, 500)
  //   })
  // })
})(jQuery)
