(function ($) {
  'use strict'

  function clipboardBlock () {
    var clipboard = new ClipboardJS('.obb-clipboard a')
    var opt = {
      dialogClass: 'obb-ui-dialog',
      title: null,
      height: 'auto',
      minHeight: 0,
      modal: true,
      autoOpen: false,
      show: 'fade',
      open: function () {
        var $this = $(this)
        setTimeout(function () {
          $('.obb-ui-dialog, .ui-widget-overlay').fadeOut(300)
        }, 1200)
        setTimeout(function () {
          $this.dialog('close')
        }, 1500)
      },
      close: function () {
        $(this).closest('.ui-dialog-content').dialog('destroy')
      }
    }
    clipboard.on('success', function (e) {
      var alertID = e.trigger.getAttribute('data-alert-target')
      $('#' + alertID).dialog(opt).dialog('open')
      // let oldtext = e.trigger.textContent
      // e.trigger.textContent = e.trigger.getAttribute('data-alert-target')
      // setTimeout(function () {
      //   e.trigger.textContent = oldtext
      // }, 2000)
    })
  }

  $(document)
    .ready(clipboardBlock)
})(jQuery)
