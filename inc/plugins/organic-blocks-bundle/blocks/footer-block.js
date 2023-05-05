(function (data, blocks, element, editor, components, serverSideRender, i18n, apiFetch) {
  // Load Components
  var __ = i18n.__
  var el = element.createElement
  var withSelect = data.withSelect
  var useSetting = wp.blockEditor.useSetting
  var MediaUpload = editor.MediaUpload
  var ServerSideRender = serverSideRender
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var ColorIndicator = components.ColorIndicator
  var PanelBody = components.PanelBody
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var TextControl = components.TextControl
  var RangeControl = components.RangeControl
  var Button = components.Button

  // Dropdown Options
  var obbColors = [
    { name: __('White', 'obb'), color: '#fff' },
    { name: __('Black', 'obb'), color: '#000' },
    { name: __('Light Gray', 'obb'), color: '#eee' },
    { name: __('Medium Gray', 'obb'), color: '#808080' },
    { name: __('Brown', 'obb'), color: '#996633' },
    { name: __('Red', 'obb'), color: '#f00' },
    { name: __('Blue', 'obb'), color: '#006699' },
    { name: __('Green', 'obb'), color: '#99cc33' },
    { name: __('Pink', 'obb'), color: '#ff33cc' },
    { name: __('Teal', 'obb'), color: '#00cccc' },
    { name: __('Gold', 'obb'), color: '#cc9900' },
    { name: __('Purple', 'obb'), color: '#660099' }
  ]
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(135deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
      slug: 'california-dusk'
    },
    {
      name: 'Subtle Teal',
      gradient: 'linear-gradient(135deg, rgb(0, 219, 255), rgb(0, 197, 93) 100%)',
      slug: 'subtle-teal'
    },
    {
      name: 'Tokyo Sunset',
      gradient: 'linear-gradient(135deg, rgb(255, 0, 116), rgb(0, 40, 205) 100%)',
      slug: 'tokyo-sunset'
    },
    {
      name: 'Fire Blaze',
      gradient: 'linear-gradient(135deg, rgb(244, 182, 0), rgb(200, 0, 0) 100%)',
      slug: 'fire-blaze'
    },
    {
      name: 'Lime Light',
      gradient: 'linear-gradient(320deg, rgb(151, 236, 5), rgb(251, 230, 0) 100%)',
      slug: 'lime-light'
    }
  ]

  // Get Site Menus
  var wpmenus = []
  var wpmenuCall = apiFetch({ path: '/obbroute/menu' }).then(menus => {
    var menuArr = []
    menuArr.push({ name: __('None', 'obb') })
    jQuery.each(menus, function (key, val) {
      menuArr.push({ name: val.name })
    })
    wpmenus = menuArr
    return menuArr
  }).catch(err => {
    console.log(err.stack)
  })

  // Get Google Fonts
  var gfonts = []
  var gfontsCall = apiFetch({ path: '/obbroute/fonts' }).then(fonts => {
    var fontArr = []
    fontArr.push({ name: __('Theme Default', 'obb') })
    jQuery.each(fonts, function (key, val) {
      fontArr.push({ name: val })
    })
    gfonts = fontArr
    return fontArr
  }).catch(err => {
    console.log(err.stack)
  })

  // Create custom Content Slideshow icon SVG.
  const footerIcon = el('svg',
    {
      class: 'organic-footer-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z M7,20H5v-1h2V20z M16,22H8v-1h8V22zM8,20v-1h2v1H8z M13,19v1h-2v-1H13z M11,17c0-0.6,0.4-1,1-1s1,0.4,1,1s-0.4,1-1,1S11,17.6,11,17z M16,20h-2v-1h2V20z M19,20h-2v-1h2V20z M22,15H2V7h20V15z M22,6H2V2h20V6z'
        }
      ),
      el('circle',
        {
          fill: '#99cc33',
          cx: '4',
          cy: '4',
          r: 1
        }
      ),
      el('circle',
        {
          fill: '#99cc33',
          cx: '7',
          cy: '4',
          r: 1
        }
      ),
      el('circle',
        {
          fill: '#99cc33',
          cx: '10',
          cy: '4',
          r: 1
        }
      )
    )
  )

  // Register Block.
  const organicFooterBlock = blocks.registerBlockType('obb/footer-block', {
    title: 'Footer',
    description: __('Display a custom site footer', 'obb'),
    icon: footerIcon,
    category: 'organic-blocks',
    supports: {
      align: ['wide', 'full']
      // spacing: { // Requires add_theme_support('custom-spacing');
      //   margin: true, // Enable margin UI control.
      //   padding: true // Enable padding UI control.
      // }
    },
    attributes: {
      align: {
        type: 'string',
        default: 'full'
      },
      // style: {
      //   margin: {
      //     type: 'string'
      //   },
      //   padding: {
      //     type: 'string'
      //   }
      // },
      mediaID: {
        type: 'number'
      },
      mediaURL: {
        type: 'string'
      },
      iconsize: {
        type: 'number',
        default: 50
      },
      copyright: {
        type: 'string',
        default: __('Copyright © 2020 · All Rights Reserved', 'obb')
      },
      copyrightsize: {
        type: 'number',
        default: 12
      },
      footermenu: {
        type: 'string'
      },
      retlinkdisp: {
        type: 'boolean',
        default: true
      },
      footermenufont: {
        type: 'string'
      },
      footermenusize: {
        type: 'number',
        default: 14
      },
      footermenulinkgap: {
        type: 'number',
        default: 12
      },
      footeralign: {
        type: 'string',
        default: 'center'
      },
      toppadding: {
        type: 'string',
        default: '24'
      },
      bottompadding: {
        type: 'string',
        default: '24'
      },
      leftpadding: {
        type: 'string',
        default: '24'
      },
      rightpadding: {
        type: 'string',
        default: '24'
      },
      copyrightcolor: {
        type: 'string',
        default: '#999'
      },
      retarrowcolor: {
        type: 'string',
        default: '#fff'
      },
      retlinkcolor: {
        type: 'string',
        default: '#333'
      },
      menulinkcolor: {
        type: 'string',
        default: '#666'
      },
      menuhovercolor: {
        type: 'string',
        default: '#000'
      },
      footerbgcolor: {
        type: 'string'
      },
      footerbggradient: {
        type: 'string'
      }
    },
    edit: withSelect(function (select, props) {
      return {
        menus: wpmenus,
        fonts: gfonts,
        entities: select('core').getSite()
      }
    })(function (props) {
      // Load all attributes
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var copyright = props.attributes.copyright
      var copyrightsize = props.attributes.copyrightsize
      var footermenu = props.attributes.footermenu
      var retlinkdisp = props.attributes.retlinkdisp
      var footermenufont = props.attributes.footermenufont
      var footermenusize = props.attributes.footermenusize
      var footermenulinkgap = props.attributes.footermenulinkgap
      var footeralign = props.attributes.footeralign
      var toppadding = props.attributes.toppadding
      var bottompadding = props.attributes.bottompadding
      var leftpadding = props.attributes.leftpadding
      var rightpadding = props.attributes.rightpadding
      var copyrightcolor = props.attributes.copyrightcolor
      var retarrowcolor = props.attributes.retarrowcolor
      var retlinkcolor = props.attributes.retlinkcolor
      var menulinkcolor = props.attributes.menulinkcolor
      var menuhovercolor = props.attributes.menuhovercolor
      var footerbgcolor = props.attributes.footerbgcolor
      var footerbggradient = props.attributes.footerbggradient
      var mediaID = props.attributes.mediaID
      var mediaURL = props.attributes.mediaURL
      var iconsize = props.attributes.iconsize
      var navOptions = ''
      var fontOptions = ''
      var editmenuhref = ''

      // Once site entities load, get current site title, desc and add edit menu link
      if (props.entities) {
        editmenuhref = props.entities.url + '/wp-admin/nav-menus.php'
      }

      if (props.menus) {
        navOptions = []
        jQuery.each(props.menus, function (key, val) {
          navOptions.push({ label: val.name, value: val.name })
        })
      }

      if (props.fonts) {
        fontOptions = []
        jQuery.each(props.fonts, function (key, val) {
          fontOptions.push({ label: val.name, value: val.name })
        })
      }

      var editmenulink = el('a', {
        className: 'obb-edit-menu',
        href: editmenuhref,
        target: '_blank'
      },
      __('Edit or Create Menus', 'obb')
      )

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      // OnChange functions for media images
      var onSelectImage = function (media) {
        return props.setAttributes({
          mediaURL: media.url,
          mediaID: media.id
        })
      }

      var removeImage = function () {
        return props.setAttributes({
          mediaURL: '',
          mediaID: ''
        })
      }

      // Default media variables and elements
      var mediaButtonTxt = ''
      var mediaControlClass = 'components-base-control obb-media-upload-control'
      var removeButton = el(Button, {
        className: 'is-secondary',
        onClick: removeImage
      }, __('Remove Icon', 'obb'))

      if (mediaURL) {
        mediaControlClass = 'components-base-control obb-media-upload-control'
        mediaButtonTxt = __('Change Icon', 'obb')
      } else {
        mediaControlClass = 'components-base-control obb-media-upload-control obb-media-empty'
        mediaButtonTxt = __('Add Icon', 'obb')
        removeButton = ''
      }

      if (mediaURL) {
        var mediaImg = el('img', { src: mediaURL })
      }

      var mediaButtons = el(MediaUpload, {
        onSelect: onSelectImage,
        type: 'image',
        value: mediaID,
        render: function (obj) {
          return el(Button, {
            className: 'is-secondary',
            onClick: obj.open
          },
          mediaButtonTxt
          )
        }
      })

      displayEditor = el(
        ServerSideRender,
        {
          block: 'obb/footer-block',
          className: 'organic-footer-block',
          attributes: {
            mediaURL: mediaURL,
            iconsize: iconsize,
            copyright: copyright,
            copyrightsize: copyrightsize,
            footermenu: footermenu,
            retlinkdisp: retlinkdisp,
            footermenufont: footermenufont,
            footermenusize: footermenusize,
            footermenulinkgap: footermenulinkgap,
            footeralign: footeralign,
            toppadding: toppadding,
            bottompadding: bottompadding,
            leftpadding: leftpadding,
            rightpadding: rightpadding,
            copyrightcolor: copyrightcolor,
            retarrowcolor: retarrowcolor,
            retlinkcolor: retlinkcolor,
            menulinkcolor: menulinkcolor,
            menuhovercolor: menuhovercolor,
            footerbgcolor: footerbgcolor,
            footerbggradient: footerbggradient
          }
        }
      )

      // Return editor content and controls/settings
      return [
        el(BlockControls,
          { key: 'controls' },
          el(AlignmentToolbar, {
            value: footeralign,
            onChange: function (val) { props.setAttributes({ footeralign: val }) }
          })
        ),
        displayEditor,
        el(InspectorControls,
          null,
          el(PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el('div',
              {
                className: mediaControlClass
              },
              el('div',
                { className: 'obb-media-upload-image' },
                mediaImg
              ),
              mediaButtons,
              removeButton
            ),
            el(RangeControl, {
              label: __('Footer Icon Size', 'obb'),
              min: 24,
              max: 320,
              step: 2,
              value: iconsize,
              onChange: function (val) { props.setAttributes({ iconsize: val }) }
            }),
            el(TextControl, {
              label: __('Copyright Text', 'obb'),
              placeholder: __('Copyright © 2020 · All Rights Reserved', 'obb'),
              value: copyright,
              onChange: function (val) {
                props.setAttributes({ copyright: val })
              }
            }),
            el(RangeControl, {
              label: __('Copyright Font Size', 'obb'),
              help: __('Pixel font size for copyright text.', 'obb'),
              allowReset: true,
              resetFallbackValue: 12,
              min: 8,
              max: 60,
              step: 1,
              value: copyrightsize,
              onChange: function (val) { props.setAttributes({ copyrightsize: val }) }
            }),
            el(SelectControl, {
              label: __('Footer Menu', 'obb'),
              value: footermenu,
              options: navOptions,
              onChange: function (val) { props.setAttributes({ footermenu: val }) }
            }),
            editmenulink,
            (footermenu && footermenu !== 'None') && (
              el(SelectControl, {
                label: __('Footer Menu Font', 'obb'),
                value: footermenufont,
                options: fontOptions,
                onChange: function (val) { props.setAttributes({ footermenufont: val }) }
              })
            ),
            (footermenu && footermenu !== 'None') && (
              el(RangeControl, {
                label: __('Footer Menu Font Size', 'obb'),
                help: __('Pixel font size for footer menu.', 'obb'),
                allowReset: true,
                resetFallbackValue: 14,
                min: 10,
                max: 60,
                step: 1,
                value: footermenusize,
                onChange: function (val) { props.setAttributes({ footermenusize: val }) }
              })
            ),
            (footermenu && footermenu !== 'None') && (
              el(RangeControl, {
                label: __('Footer Menu Link Spacing', 'obb'),
                help: __('Horizontal spacing between menu links.', 'obb'),
                allowReset: true,
                resetFallbackValue: 12,
                min: 4,
                max: 60,
                step: 1,
                value: footermenulinkgap,
                onChange: function (val) { props.setAttributes({ footermenulinkgap: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Return To Top Link', 'obb'),
              checked: retlinkdisp,
              help: __('The top page return link is visible.', 'obb'),
              onChange: function (val) { props.setAttributes({ retlinkdisp: val }) }
            })
          ),
          el(PanelBody,
            {
              title: __('Layout', 'obb'),
              initialOpen: false,
              icon: 'move'
            },
            el(
              'div', {
                className: 'obb-layout-padding'
              },
              el(TextControl, {
                label: __('Top Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: toppadding,
                onChange: function (val) { props.setAttributes({ toppadding: val }) }
              }),
              el(TextControl, {
                label: __('Bottom Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: bottompadding,
                onChange: function (val) { props.setAttributes({ bottompadding: val }) }
              }),
              el(TextControl, {
                label: __('Left Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: leftpadding,
                onChange: function (val) { props.setAttributes({ leftpadding: val }) }
              }),
              el(TextControl, {
                label: __('Right Padding', 'obb'),
                type: 'number',
                min: 1,
                max: 999,
                value: rightpadding,
                onChange: function (val) { props.setAttributes({ rightpadding: val }) }
              })
            )
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'obb'),
            initialOpen: false,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Background', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: footerbgcolor,
                gradientValue: footerbggradient,
                onChange: function (val) { props.setAttributes({ footerbgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ footerbggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Copyright Color', 'obb'),
                value: copyrightcolor,
                onChange: function (val) { props.setAttributes({ copyrightcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Return Link Arrow Color', 'obb'),
                value: retarrowcolor,
                onChange: function (val) { props.setAttributes({ retarrowcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Return Link Background', 'obb'),
                value: retlinkcolor,
                onChange: function (val) { props.setAttributes({ retlinkcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Menu Link Color', 'obb'),
                value: menulinkcolor,
                onChange: function (val) { props.setAttributes({ menulinkcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Menu Hover Color', 'obb'),
                value: menuhovercolor,
                onChange: function (val) { props.setAttributes({ menuhovercolor: val }) }
              }
            ]
          })
        )
      ]
    }),
    save: function (props) {
      return null
    }
  })
}(
  window.wp.data,
  window.wp.blocks,
  window.wp.element,
  window.wp.blockEditor,
  window.wp.components,
  window.wp.serverSideRender,
  window.wp.i18n,
  window.wp.apiFetch
))
