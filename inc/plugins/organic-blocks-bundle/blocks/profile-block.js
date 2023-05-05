(function (blocks, editor, components, i18n, element, apiFetch) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var useSetting = wp.blockEditor.useSetting
  var MediaUpload = editor.MediaUpload
  var InnerBlocks = wp.blockEditor.InnerBlocks
  var BlockControls = wp.blockEditor.BlockControls
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var BlockVerticalAlignmentToolbar = wp.blockEditor.BlockVerticalAlignmentToolbar
  var ColorGradientControl = wp.blockEditor.__experimentalColorGradientControl
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var InspectorControls = wp.blockEditor.InspectorControls
  var SelectControl = components.SelectControl
  var RangeControl = components.RangeControl
  var ColorPicker = components.ColorPicker
  var ColorPalette = components.ColorPalette
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
  var Button = components.Button
  var IconButton = components.IconButton
  var Dashicon = components.Dashicon
  var PanelBody = components.PanelBody
  var TextControl = components.TextControl

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
  var styleOptions = [
    { label: __('Minimal', 'obb'), value: 'minimal' },
    { label: __('Modern', 'obb'), value: 'modern' },
    { label: __('Angular', 'obb'), value: 'angular' },
    { label: __('Bordered', 'obb'), value: 'bordered' },
    { label: __('Rounded', 'obb'), value: 'rounded' }
  ]
  var orientationOptions = [
    { label: __('Horizontal', 'obb'), value: 'horizontal' },
    { label: __('Vertical', 'obb'), value: 'vertical' }
  ]
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(225deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
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
  var profileTemplate = [
    ['core/group', { className: 'obb-profile-content' }, [
      ['core/heading', { className: 'obb-profile-title', level: 4, placeholder: 'Profile Name', textColor: 'black' }],
      ['core/heading', { className: 'obb-profile-subtitle', level: 6, placeholder: 'Profile Title', textColor: '#808080' }],
      ['core/paragraph', { className: 'obb-profile-bio', placeholder: 'Write a brief profile bio...', align: 'center' }]
    ]]
  ]

  // Create custom Content Slideshow icon SVG.
  const profileIcon = el('svg',
    {
      class: 'organic-profile-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M22 0h-20c-1.103 0-2 0.897-2 2v20c0 1.103 0.897 2 2 2h20c1.103 0 2-0.897 2-2v-20c0-1.103-0.897-2-2-2zM22 22h-20l-0.003-20c0 0 0 0 0.003 0h20v20z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M3.5 17h17c0.275 0 0.5-0.225 0.5-0.5v-13c0-0.275-0.225-0.5-0.5-0.5h-17c-0.275 0-0.5 0.225-0.5 0.5v13c0 0.275 0.225 0.5 0.5 0.5zM15.491 16h-6.981c0.966-1.256 2.238-2 3.491-2s2.525 0.744 3.491 2zM4 4h16v12h-2.134c-0.619-1.141-1.45-2.109-2.406-2.806-0.444-0.322-0.906-0.584-1.384-0.778 1.153-0.703 1.925-1.972 1.925-3.416 0-2.206-1.794-4-4-4s-4 1.794-4 4c0 1.444 0.772 2.712 1.922 3.416-0.478 0.194-0.941 0.453-1.384 0.778-0.953 0.697-1.784 1.666-2.406 2.806h-2.131v-12zM12 12c-1.653 0-3-1.347-3-3s1.347-3 3-3 3 1.347 3 3-1.347 3-3 3z'
        }
      ),
      el('path',
        {
          fill: '#99cc33',
          d: 'M12 19h8v1h-8v-1z'
        }
      )
    )
  )

  const organicProfileBlock = registerBlockType('obb/profile-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Profile', 'obb'), // The title of our block.
    description: __('A custom block for displaying personal profiles.', 'obb'), // The description of our block.
    icon: profileIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
      anchor: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    attributes: { // Necessary for saving block content.
      items: {
        source: 'query',
        default: [],
        selector: '.item',
        query: {
          socialURL: {
            type: 'string',
            source: 'attribute',
            selector: '.social-link',
            attribute: 'href'
          },
          index: {
            type: 'number',
            source: 'attribute',
            attribute: 'data-index'
          }
        }
      },
      authorID: {
        type: 'string'
      },
      mediaID: {
        type: 'number'
      },
      mediaURL: {
        type: 'string',
        source: 'attribute',
        selector: 'img',
        attribute: 'src'
      },
      mediasize: {
        type: 'number',
        default: 320
      },
      profilestyle: {
        type: 'string',
        default: 'minimal'
      },
      profileorientation: {
        type: 'string',
        default: 'horizontal'
      },
      stackmobile: {
        type: 'boolean',
        default: true
      },
      styleradius: {
        type: 'number',
        default: 0
      },
      styleshadow: {
        type: 'number',
        default: 12
      },
      styleborderwidth: {
        type: 'number',
        default: 0
      },
      stylebordercolor: {
        type: 'string',
        default: '#ccc'
      },
      styleshadowcolor: {
        type: 'string'
      },
      iconcolor: {
        type: 'string',
        default: '#999'
      },
      iconbg: {
        type: 'string',
        default: '#f4f4f4'
      },
      bgcolor: {
        type: 'string',
        default: '#fff'
      },
      bggradient: {
        type: 'string'
      },
      alignment: {
        type: 'string',
        default: 'center'
      },
      verticalAlign: {
        type: 'string',
        default: 'center'
      }
      // padding: {
      //   type: 'string'
      // }
    },

    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var alignment = props.attributes.alignment
      var verticalAlign = props.attributes.verticalAlign
      // var padding = props.attributes.style.spacing.paddingSize
      var mediaID = props.attributes.mediaID
      var mediaURL = props.attributes.mediaURL
      var mediasize = props.attributes.mediasize
      var profilestyle = props.attributes.profilestyle
      var profileorientation = props.attributes.profileorientation
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var iconcolor = props.attributes.iconcolor
      var iconbg = props.attributes.iconbg
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient

      // Get author info.
      // wp.apiFetch({ path: '/wp-json/wp/v2/users/' + attributes.authorID }).then(author => {
      //   var authorName = author.name
      //   var authorInfo = author.description
      //   var authorImage = author.avatar_urls['96']
      //   jQuery('.obb-profile-bio-user').html('<p>' + authorInfo + '</p>')
      // })

      var itemList = attributes.items.sort(function (a, b) {
        return a.index - b.index
      }).map(function (item) {
        return el('div', { className: 'obb-repeater-field item' },
          el(TextControl, {
            className: 'obb-repeater-field-url',
            // label: __('Social Media URL', 'obb'),
            placeholder: 'https://twitter.com',
            value: item.socialURL,
            onChange: function (value) {
              var newObject = Object.assign({}, item, {
                socialURL: value
              })
              return props.setAttributes({
                items: [].concat(_cloneArray(props.attributes.items.filter(function (itemFilter) {
                  return itemFilter.index !== item.index
                })), [newObject])
              })
            }
          }),
          el(IconButton,
            {
              className: 'obb-repeater-field-delete is-secondary',
              icon: 'no-alt',
              label: __('Remove', 'obb'),
              onClick: function () {
                var items = props.attributes.items
                console.log(items)
                return props.setAttributes({
                  items: items.filter(function (itemFilter) {
                    return itemFilter.index !== item.index
                  })
                })
              }
            }
          )
        )
      })

      function _cloneArray (arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i]
          }
          console.log(arr2)
          return arr2
        } else {
          return Array.from(arr)
        }
      }

      function onChangeAlignment (newAlignment) {
        props.setAttributes({ alignment: newAlignment })
      }

      function onChangeVerticalAlignment (newAlignment) {
        props.setAttributes({ verticalAlign: newAlignment })
      }

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
        className: 'is-button is-default is-secondary',
        onClick: removeImage
      }, __('Remove Image', 'obb'))

      if (mediaURL) {
        mediaControlClass = 'components-base-control obb-media-upload-control'
        mediaButtonTxt = __('Change Image', 'obb')
      } else {
        mediaControlClass = 'components-base-control obb-media-upload-control obb-media-empty'
        mediaButtonTxt = __('Add Image', 'obb')
        removeButton = ''
      }

      var mediaImg = el('img', { src: mediaURL })

      var mediaButtons = el(MediaUpload, {
        onSelect: onSelectImage,
        type: 'image',
        value: mediaID,
        render: function (obj) {
          return el(Button, {
            className: 'is-button is-default is-secondary',
            onClick: obj.open
          },
          mediaButtonTxt
          )
        }
      })

      if (attributes.items.length > 0) {
        var socialLinks = attributes.items.map(function (item) {
          return el('li', { className: 'item', 'data-index': item.index },
            el('a', {
              className: 'social-link',
              href: item.socialURL,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { color: attributes.iconcolor, backgroundColor: attributes.iconbg }
            })
          )
        })
      }

      return [
        el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
          el('div', { className: 'components-toolbar' },
            el(MediaUpload, {
              onSelect: onSelectImage,
              type: 'image',
              render: function (obj) {
                return el(Button, {
                  className: 'components-icon-button components-toolbar__control',
                  onClick: obj.open
                },
                // Add Dashicon for media upload button.
                el('svg', { className: 'dashicon dashicons-edit', width: '24', height: '24' },
                  el('path', { d: 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z' })
                ))
              }
            })
          ),
          // Display alignment toolbar within block controls.
          el(AlignmentToolbar, {
            value: alignment,
            onChange: onChangeAlignment
          }),
          attributes.profileorientation === 'horizontal' && el(BlockVerticalAlignmentToolbar, {
            value: verticalAlign,
            onChange: onChangeVerticalAlignment
          })
        ),
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(
            PanelBody,
            {
              title: __('Settings', 'obb')
            },
            el('div', {
              className: mediaControlClass
            },
            mediaImg,
            mediaButtons,
            removeButton
            ),
            el(RangeControl, {
              label: __('Profile Image Size', 'obb'),
              withInputField: false,
              min: 80,
              max: 1200,
              step: 10,
              value: mediasize,
              onChange: function (val) { props.setAttributes({ mediasize: val }) }
            }),
            el(SelectControl, {
              label: __('Style Presets', 'obb'),
              value: profilestyle,
              options: styleOptions,
              onChange: function (val) { props.setAttributes({ profilestyle: val }) }
            }),
            el(SelectControl, {
              label: __('Orientation', 'obb'),
              value: profileorientation,
              options: orientationOptions,
              onChange: function (val) { props.setAttributes({ profileorientation: val }) }
            })
            // el(TextControl, {
            //   label: __('User ID', 'obb'),
            //   value: authorID,
            //   onChange: function (val) {
            //     props.setAttributes({ authorID: val })
            //   }
            // })
          ),
          el(PanelBody,
            {
              title: __('Social Media Links', 'obb'),
              className: 'block-social-links',
              initialOpen: true
            },
            el('p', {}, __('Add links to your social media profiles.', 'obb')),
            el('div', { className: 'components-base-control' },
              itemList,
              el(Button,
                {
                  className: 'button add-row',
                  onClick: function () {
                    return props.setAttributes({
                      items: [].concat(_cloneArray(props.attributes.items), [{
                        index: props.attributes.items.length,
                        socialURL: ''
                      }])
                    })
                  }
                },
                el(Dashicon, {
                  icon: 'plus'
                }),
                el('span', null,
                  __('Add Social Media Link', 'obb')
                )
              )
            )
          ),
          el(PanelColorSettings, {
            title: __('Background', 'obb'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Background Color', 'obb'),
                colors: colorOptions,
                gradients: gradientOptions,
                value: bgcolor,
                gradientValue: bggradient,
                onChange: function (val) { props.setAttributes({ bgcolor: val }) },
                onGradientChange: function (val) { props.setAttributes({ bggradient: val }) }
              },
              {
                colors: colorOptions,
                label: __('Icon Color', 'obb'),
                value: iconcolor,
                onChange: function (val) { props.setAttributes({ iconcolor: val }) }
              },
              {
                colors: colorOptions,
                label: __('Icon Background', 'obb'),
                value: iconbg,
                onChange: function (val) { props.setAttributes({ iconbg: val }) }
              },
              {
                label: __('Border Color', 'obb'),
                colors: colorOptions,
                value: stylebordercolor,
                onChange: function (val) { props.setAttributes({ stylebordercolor: val }) }
              },
              {
                label: __('Shadow Color', 'obb'),
                colors: colorOptions,
                value: styleshadowcolor,
                onChange: function (val) { props.setAttributes({ styleshadowcolor: val }) }
              }
            ]
          },
          el(RangeControl, {
            label: __('Border Radius', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleradius,
            onChange: function (val) { props.setAttributes({ styleradius: val }) }
          }),
          el(RangeControl, {
            label: __('Border Width', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 20,
            step: 1,
            value: styleborderwidth,
            onChange: function (val) { props.setAttributes({ styleborderwidth: val }) }
          }),
          el(RangeControl, {
            label: __('Shadow Size', 'obb'),
            withInputField: true,
            allowReset: true,
            resetFallbackValue: 0,
            min: 0,
            max: 100,
            step: 1,
            value: styleshadow,
            onChange: function (val) { props.setAttributes({ styleshadow: val }) }
          })
          )
        ),
        el('div',
          {
            className: 'organic-block obb-profile' + ' obb-style-' + attributes.profilestyle + ' obb-orientation-' + attributes.profileorientation + ' obb-vertical-align-' + attributes.verticalAlign + ' ' + props.className,
            style: {
              textAlign: attributes.alignment,
              // padding: attributes.padding,
              backgroundColor: attributes.bgcolor,
              backgroundImage: attributes.bggradient !== '' ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('div',
            {
              className: attributes.mediaID ? 'obb-featured-img obb-profile-image image-active' : 'obb-featured-img obb-profile-image image-inactive',
              style: attributes.mediaID ? {
                width: attributes.mediasize + 'px',
                minHeight: attributes.mediasize + 'px',
                backgroundImage: 'url(' + attributes.mediaURL + ')'
              } : {
                minWidth: attributes.mediasize + 'px',
                minHeight: attributes.mediasize + 'px'
              }
            },
            !attributes.mediaURL && el(MediaUpload, {
              onSelect: onSelectImage,
              type: 'image',
              value: attributes.mediaID,
              render: function (obj) {
                return el(Button, {
                  className: 'is-button is-default is-secondary image-button',
                  onClick: obj.open
                },
                !attributes.mediaID ? __('Upload Image', 'obb') : ''
                )
              }
            }),
            attributes.mediaURL && el('figure', { class: 'obb-profile-image-container' },
              el('img', { src: attributes.mediaURL })
            )
          ),
          el('div', { className: 'obb-profile-body', style: { textAlign: alignment } },
            el(InnerBlocks, { template: profileTemplate }),
            attributes.items.length > 0 && el('div', { className: 'obb-profile-social' },
              el('ul', { className: 'obb-menu obb-social-menu' },
                socialLinks
              )
            )
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes
      var imageClass = 'wp-image-' + props.attributes.mediaID

      if (attributes.items.length > 0) {
        var socialLinks = attributes.items.map(function (item) {
          return el('li', { className: 'item', 'data-index': item.index },
            el('a', {
              className: 'social-link',
              href: item.socialURL,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { color: attributes.iconcolor, backgroundColor: attributes.iconbg }
            })
          )
        })
      }

      return (
        el('div',
          {
            className: 'organic-block obb-profile' + ' obb-style-' + attributes.profilestyle + ' obb-orientation-' + attributes.profileorientation + ' obb-vertical-align-' + attributes.verticalAlign,
            style: {
              textAlign: attributes.alignment,
              // padding: attributes.padding,
              backgroundColor: attributes.bgcolor,
              backgroundImage: attributes.bggradient !== '' ? attributes.bggradient : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          attributes.mediaURL && el('div',
            {
              className: 'obb-featured-img obb-profile-image',
              style: {
                width: attributes.mediasize + 'px',
                minHeight: attributes.mediasize + 'px',
                backgroundImage: 'url(' + attributes.mediaURL + ')'
              }
            },
            el('figure', { class: imageClass },
              el('img',
                {
                  src: attributes.mediaURL,
                  alt: __('Profile Image', 'obb')
                }
              )
            )
          ),
          el('div', { className: 'obb-profile-body', style: { textAlign: attributes.alignment } },
            el(InnerBlocks.Content),
            attributes.items.length > 0 && el('div', { className: 'obb-profile-social' },
              el('ul', { className: 'obb-menu obb-social-menu' },
                socialLinks
              )
            )
          )
        )
      )
    }
  })
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
  window.wp.apiFetch
)
