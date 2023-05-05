(function (data, blocks, blockEditor, editor, components, i18n, element, apiFetch, editPost, coreData) {
  var __ = i18n.__
  var el = element.createElement
  var registerBlockType = blocks.registerBlockType
  var createBlock = blocks.createBlock
  var useSetting = wp.blockEditor.useSetting
  var InnerBlocks = blockEditor.InnerBlocks
  var BlockControls = blockEditor.BlockControls
  var BlockAlignmentMatrixControl = blockEditor.__experimentalBlockAlignmentMatrixControl
  var ColorGradientControl = blockEditor.__experimentalColorGradientControl
  var InspectorControls = blockEditor.InspectorControls
  var RangeControl = components.RangeControl
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorPalette = components.ColorPalette
  var ColorPicker = components.ColorPicker
  var ColorIndicator = components.ColorIndicator
  var BaseControl = components.BaseControl
  var PanelBody = components.PanelBody
  var ToggleControl = components.ToggleControl
  var TextControl = components.TextControl
  var UnitControl = components.__experimentalUnitControl
  var Button = components.Button
  var MediaUpload = editor.MediaUpload

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
  var unitTypes = [
    { value: 'px', label: 'px', default: 0 },
    { value: '%', label: '%', default: 10 },
    { value: 'em', label: 'em', default: 0 }
  ]
  var heroTemplate = [
    ['core/group', { className: 'obb-content', align: 'center' }, [
      ['core/post-title', { level: 2, fontSize: 'huge', textAlign: 'center', textColor: 'white' }],
      ['core/post-excerpt', { fontSize: 'medium', textAlign: 'center', textColor: 'white', linkColor: 'white' }]
    ]],
    ['core/group', { className: 'obb-featured-img' }, [
      ['core/post-featured-image', { isLink: false }]
    ]]
  ]

  // Create custom Content Slideshow icon SVG.
  const heroIcon = el('svg',
    {
      class: 'organic-hero-icon',
      width: 24,
      height: 24
    },
    el('g', {},
      el('path',
        {
          fill: '#99cc33',
          d: 'M18.969 21.25c0.022-0.081 0.031-0.166 0.031-0.25v-3c0-1.653-1.347-3-3-3h-1.106c-0.112-0.603-0.312-1.263-0.559-1.844-0.138-0.325-0.284-0.603-0.431-0.841 0.272-0.206 0.537-0.456 0.797-0.753 0.381-0.438 0.744-0.972 1.084-1.594 0.438-0.066 1.425-0.25 2.422-0.7 1.828-0.822 2.794-2.125 2.794-3.769 0-1.378-1.122-2.5-2.5-2.5-0.219 0-0.431 0.028-0.634 0.081 0.044-0.366 0.078-0.728 0.1-1.081h1.034v-2h-14v2h1.034c0.022 0.353 0.056 0.716 0.1 1.081-0.203-0.053-0.416-0.081-0.634-0.081-1.378 0-2.5 1.122-2.5 2.5 0 1.644 0.966 2.947 2.794 3.769 0.997 0.45 1.984 0.634 2.422 0.7 0.341 0.622 0.703 1.156 1.084 1.594 0.259 0.297 0.525 0.547 0.797 0.753-0.147 0.237-0.291 0.516-0.431 0.841-0.247 0.581-0.444 1.244-0.559 1.844h-1.106c-1.653 0-3 1.347-3 3v3c0 0.087 0.012 0.172 0.031 0.25-0.616 0.341-1.031 0.997-1.031 1.75v0.5c0 0.275 0.225 0.5 0.5 0.5h15c0.275 0 0.5-0.225 0.5-0.5v-0.5c0-0.753-0.416-1.406-1.031-1.75zM18.5 4c0.828 0 1.5 0.672 1.5 1.5 0 1.231-0.734 2.187-2.184 2.847-0.525 0.237-1.059 0.397-1.484 0.497 0.044-0.1 0.087-0.2 0.128-0.306 0.541-1.313 0.966-2.816 1.228-4.3 0.237-0.15 0.516-0.237 0.813-0.237zM6.184 8.347c-1.45-0.659-2.184-1.616-2.184-2.847 0-0.828 0.672-1.5 1.5-1.5 0.297 0 0.575 0.087 0.809 0.237 0.266 1.484 0.687 2.984 1.228 4.3 0.044 0.103 0.084 0.206 0.128 0.306-0.422-0.1-0.953-0.256-1.481-0.497zM9.387 7.775c-0.725-1.759-1.219-3.891-1.353-5.775h5.919c-0.116 1.403-0.459 3-0.95 4.378l-0.169 0.472 0.941 0.334 0.169-0.472c0.528-1.481 0.894-3.206 1.013-4.716h1.003c-0.134 1.884-0.628 4.016-1.353 5.775-0.8 1.962-1.825 3.228-2.606 3.228s-1.806-1.266-2.613-3.225zM11.403 14.194c0.231-0.616 0.456-0.953 0.597-1.109 0.138 0.156 0.366 0.497 0.597 1.109 0.103 0.278 0.188 0.553 0.25 0.806h-1.694c0.063-0.253 0.147-0.528 0.25-0.806zM7 18c0-0.55 0.45-1 1-1h8c0.55 0 1 0.45 1 1v2h-10v-2zM5 23c0-0.55 0.45-1 1-1h12c0.55 0 1 0.45 1 1h-14z'
        }
      )
    )
  )

  // const applyWithSelect = withSelect((select, props) => {
  //   var editor = data.select('core/editor')
  //   var featuredImgID = editor.getEditedPostAttribute('featured_media')
  //   var featuredImgObj = data.select('core').getMedia(featuredImgID)
  //
  //   return {
  //     featuredimgid: featuredImgID,
  //     featuredImgURL: featuredImgObj ? featuredImgObj.source_url : null
  //     // postID: data.select('core/editor').getCurrentPostId(),
  //     // postType: data.select('core/editor').getCurrentPostType()
  //   }
  // })

  const organicHeroBlock = registerBlockType('obb/hero-block', { // The name of our block. Must be a string with prefix. Example: my-plugin/my-custom-block.
    title: __('Hero', 'obb'), // The title of our block.
    description: __('Hero banner with background videos and images.', 'obb'), // The description of our block.
    icon: heroIcon, // Dashicon icon for our block. Custom icons can be added using inline SVGs.
    category: 'organic-blocks', // The category of the block.
    supports: {
      align: true,
      alignWide: true,
      spacing: { // Requires add_theme_support( 'custom-spacing' );
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    transforms: {
      from: [
        {
          type: 'block',
          blocks: ['core/group', 'core/columns'],
          transform: function (attributes, innerBlocks) {
            return createBlock(
              'obb/hero-block',
              attributes,
              innerBlocks
            )
          }
        }
      ],
      to: [
        {
          type: 'block',
          blocks: ['*'],
          transform: function (attributes, innerBlocks) {
            return createBlock(
              'core/group',
              attributes,
              innerBlocks
            )
          }
        }
      ]
    },
    styles: [
      {
        name: 'obb-no-crop',
        label: __('No Cropping', 'obb'),
        isDefault: true
      },
      {
        name: 'obb-clip-bottom-bulge',
        label: __('Bulge', 'obb')
      },
      {
        name: 'obb-clip-angle-bottom-right',
        label: __('Angle Right', 'obb')
      },
      {
        name: 'obb-clip-angle-bottom-left',
        label: __('Angle Left', 'obb')
      },
      {
        name: 'obb-clip-wave-curve-right',
        label: __('Wave Right', 'obb')
      },
      {
        name: 'obb-clip-wave-curve-left',
        label: __('Wave Left', 'obb')
      },
      {
        name: 'obb-clip-arrow-up',
        label: __('Arrow Up', 'obb')
      },
      {
        name: 'obb-clip-arrow-down',
        label: __('Arrow Down', 'obb')
      }
    ],
    attributes: { // Necessary for saving block content.
      align: {
        type: 'string',
        default: 'full'
      },
      position: {
        type: 'string',
        default: 'center center'
      },
      videoID: {
        type: 'number',
        default: 0
      },
      videoURL: {
        type: 'string',
        default: ''
      },
      imgID: {
        type: 'number',
        default: 0
      },
      imgURL: {
        type: 'string',
        default: ''
      },
      featuredimgbg: {
        type: 'boolean',
        default: false
      },
      imgparallax: {
        type: 'boolean',
        default: true
      },
      youtubeurl: {
        type: 'string'
        // default: 'https://www.youtube.com/embed/1t7g690boao'
      },
      videooverlaycolor: {
        type: 'string',
        default: '#000'
      },
      videooverlayopacity: {
        type: 'number',
        default: 0.4
      },
      videoheight: {
        type: 'string',
        default: '640px'
      },
      contentwidth: {
        type: 'string',
        default: '920px'
      },
      fullwindowheight: {
        type: 'boolean',
        default: false
      },
      styleradius: {
        type: 'number',
        default: 0
      },
      styleshadow: {
        type: 'number',
        default: 0
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
      bgcolor: {
        type: 'string',
        default: '#000'
      },
      bggradient: {
        type: 'string'
      }
    },
    edit: function (props) {
      var colorOptions = useSetting( 'color.palette' ).concat(obbColors)
      var attributes = props.attributes
      var position = props.attributes.position
      var youtubeurl = props.attributes.youtubeurl
      var videooverlaycolor = props.attributes.videooverlaycolor
      var videooverlayopacity = props.attributes.videooverlayopacity
      var videoheight = props.attributes.videoheight
      var contentwidth = props.attributes.contentwidth
      var fullwindowheight = props.attributes.fullwindowheight
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var bgcolor = props.attributes.bgcolor
      var bggradient = props.attributes.bggradient
      var videoID = props.attributes.videoID
      var videoURL = props.attributes.videoURL
      var imgID = props.attributes.imgID
      var imgURL = props.attributes.imgURL
      var featuredimgbg = props.attributes.featuredimgbg
      var imgparallax = props.attributes.imgparallax
      var featuredImgClass = props.attributes.featuredimgbg === true ? ' obb-has-featured-img' : ''
      var parallaxImgClass = props.attributes.imgparallax === true ? ' obb-featured-img-parallax' : ''
      var fullHeightClass = props.attributes.fullwindowheight === true ? ' obb-window-height' : ''

      // apiFetch({ path: '/wp/v2/' + posttype + 's/' + postid + '?_embed' }).then(function (post) {
      //   // console.log(post._embedded['wp:featuredmedia'][0].source_url) // <-- Post Thumbnail ID
      //   return props.setAttributes({
      //     featuredImgURL: post._embedded['wp:featuredmedia'][0].source_url
      //   })
      // })

      // const postType = useSelect((select) => {
      //   return select('core/editor').getCurrentPostType()
      // })
      // const postID = useSelect((select) => {
      //   return data.select('core/editor').getCurrentPostId()
      // })
      // const [featuredImage, setFeaturedImage] = useEntityProp('postType', postType, 'featured_media', postID)
      // const featuredImgObj = useSelect((select) => {
      //   return data.select('core').getMedia(featuredImage)
      // })
      // if (featuredImgObj) {
      //   console.log(featuredImgObj.source_url)
      // }

      // data.subscribe(_.debounce(() => {
      //   const newFeaturedImgID = data.select('core/editor').getEditedPostAttribute('featured_media')
      //   const newFeaturedImgObj = data.select('core').getMedia(newFeaturedImgID)
      //   if (featuredimgid !== newFeaturedImgID) {
      //     return props.setAttributes({
      //       featuredImgURL: newFeaturedImgObj ? newFeaturedImgObj.source_url : null
      //     })
      //   }
      //   // Update reference.
      //   featuredimgid = newFeaturedImgID
      // }, 500))

      // OnChange functions for media images
      var updateFeaturedImg = function (val) {
        return props.setAttributes({
          featuredimgbg: val
        })
      }
      var onSelectVideo = function (media) {
        return props.setAttributes({
          videoURL: media.url,
          videoID: media.id
        })
      }
      var removeVideo = function () {
        return props.setAttributes({
          videoURL: '',
          videoID: 0
        })
      }
      var onSelectCustomImg = function (media) {
        return props.setAttributes({
          imgURL: media.url,
          imgID: media.id
        })
      }
      var removeImg = function () {
        return props.setAttributes({
          imgURL: '',
          imgID: 0
        })
      }

      // Default media variables and elements
      var videoButtonText = ''
      var videoControlClass = 'components-base-control obb-media-upload-control'
      var imgButtonTxt = ''
      var imgControlClass = 'components-base-control obb-media-upload-control'

      var removeVideoButton = el(Button, {
        className: 'is-secondary',
        onClick: removeVideo
      }, __('Remove Video', 'obb'))
      var removeImgButton = el(Button, {
        className: 'is-secondary',
        onClick: removeImg
      }, __('Remove Image', 'obb'))

      if (videoURL) {
        videoControlClass = 'components-base-control obb-media-upload-control'
        videoButtonText = __('Change Video', 'obb')
      } else {
        videoControlClass = 'components-base-control obb-media-upload-control obb-media-empty'
        videoButtonText = __('Add Video', 'obb')
        removeVideoButton = ''
      }

      if (imgURL) {
        imgControlClass = 'components-base-control obb-media-upload-control'
        imgButtonTxt = __('Change Image', 'obb')
      } else {
        imgControlClass = 'components-base-control obb-media-upload-control obb-media-empty'
        imgButtonTxt = __('Add Custom Image', 'obb')
        removeImgButton = ''
      }

      if (videoURL) {
        var videoPreview = el('video', { src: videoURL })
      }
      if (imgURL) {
        var imgPreview = el('img', { src: imgURL })
      }

      var videoButtons = el(MediaUpload, {
        onSelect: onSelectVideo,
        type: 'video',
        value: videoID,
        render: function (obj) {
          return el(Button, {
            className: 'is-secondary',
            onClick: obj.open
          },
          videoButtonText
          )
        }
      })
      var imgButtons = el(MediaUpload, {
        onSelect: onSelectCustomImg,
        type: 'image',
        value: imgID,
        render: function (obj) {
          return el(Button, {
            className: 'is-secondary',
            onClick: obj.open
          },
          imgButtonTxt
          )
        }
      })

      return [
        el(
          BlockControls,
          { key: 'controls' },
          el('div', { className: 'components-toolbar-group' },
            el(BlockAlignmentMatrixControl, {
              value: position,
              onChange: function (val) { props.setAttributes({ position: val }) }
            })
          )
        ),
        el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
          el(PanelBody,
            {
              title: __('Background Media', 'obb')
            },
            el(TextControl, {
              label: __('YouTube Embed URL', 'obb'),
              help: __('Note: Enter the YouTube embed URL, not a link to the video on YouTube.', 'obb'),
              type: 'url',
              value: youtubeurl,
              onChange: function (val) { props.setAttributes({ youtubeurl: val }) }
            }),
            el('div', {
              className: videoControlClass
            },
            el('div',
              { className: 'obb-media-upload-image' },
              videoPreview
            ),
            videoButtons,
            removeVideoButton
            ),
            el(BaseControl, {
              id: imgControlClass,
              label: __('Custom Image', 'obb'),
              help: __('Display a custom fallback image if video is not displayed.', 'obb')
            },
            el('div', {
              className: imgControlClass
            },
            el('div',
              {
                className: 'obb-media-upload-image'
              },
              imgPreview
            ),
            imgButtons,
            removeImgButton
            )
            ),
            (imgURL !== '') && (
              el(ToggleControl, {
                label: __('Custom Image Parallax', 'obb'),
                help: __('Add parallax effect to custom image.', 'obb'),
                checked: imgparallax,
                onChange: function (val) { props.setAttributes({ imgparallax: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Featured Image Background', 'obb'),
              help: __('Display Featured Image as background.', 'obb'),
              checked: featuredimgbg,
              onChange: updateFeaturedImg
            })
          ),
          el(PanelBody,
            {
              title: __('Layout', 'obb'),
              initialOpen: true,
              icon: 'move'
            },
            el(BaseControl,
              {
                help: __('Set a custom width for hero content.', 'obb')
              },
              el(UnitControl, {
                label: __('Content Width', 'obb'),
                type: 'number',
                units: unitTypes,
                value: contentwidth,
                onChange: function (val) { props.setAttributes({ contentwidth: val }) }
              })
            ),
            el(BaseControl,
              {
                help: __('Set a custom height for the block.', 'obb')
              },
              el(UnitControl, {
                label: __('Container Height', 'obb'),
                type: 'number',
                min: 50,
                units: unitTypes,
                value: videoheight,
                onChange: function (val) { props.setAttributes({ videoheight: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Full Window Height', 'obb'),
              checked: fullwindowheight,
              onChange: function (val) { props.setAttributes({ fullwindowheight: val }) }
            })
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
                label: __('Overlay Color', 'obb'),
                colors: colorOptions,
                value: videooverlaycolor,
                onChange: function (val) { props.setAttributes({ videooverlaycolor: val }) }
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
            label: __('Overlay Opacity', 'obb'),
            max: 1.0,
            min: 0.0,
            step: 0.1,
            value: videooverlayopacity,
            onChange: function (val) { props.setAttributes({ videooverlayopacity: val }) }
          }),
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
            className: 'organic-block obb-hero' + ' obb-position-' + attributes.position.replace(/\s+/g, '-') + ' ' + props.className + featuredImgClass + parallaxImgClass + fullHeightClass,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#000',
              backgroundImage: attributes.imgURL !== '' ? 'url(' + attributes.imgURL + ')' : attributes.bggradient !== '' ? attributes.bggradient : null,
              // height: attributes.fullwindowheight !== false ? '100vh' : null,
              // maxHeight: attributes.fullwindowheight !== false ? '100vh' : null,
              minHeight: attributes.videoheight !== 0 ? attributes.videoheight : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('svg',
            {
              class: 'clipping-path',
              width: 0,
              height: 0
            },
            el('defs', {},
              el('clipPath',
                {
                  id: 'wave-curve-right',
                  clipPathUnits: 'objectBoundingBox',
                  transform: 'scale(0.01, 0.02)'
                },
                el('path',
                  {
                    d: 'M100,0H0v44.7c0,0,8.1,4.8,26.4,5C48.7,49.8,59,38.5,79,37.3c12.7-0.7,21,4.6,21,4.6V0z'
                  }
                )
              )
            )
          ),
          el('svg',
            {
              class: 'clipping-path',
              width: 0,
              height: 0
            },
            el('defs', {},
              el('clipPath',
                {
                  id: 'wave-curve-left',
                  clipPathUnits: 'objectBoundingBox',
                  transform: 'scale(0.01, 0.02)'
                },
                el('path',
                  {
                    d: 'M0,0l100,0v44.7c0,0-8.1,4.8-26.4,5C51.3,49.8,41,38.5,21,37.3C8.2,36.6,0,41.9,0,41.9L0,0z'
                  }
                )
              )
            )
          ),
          el('svg',
            {
              class: 'clipping-path',
              width: 0,
              height: 0
            },
            el('defs', {},
              el('clipPath',
                {
                  id: 'bulge',
                  clipPathUnits: 'objectBoundingBox',
                  transform: 'scale(0.01, 0.02)'
                },
                el('path',
                  {
                    d: 'M100,40c0,0-20.7,10-50,10S0,40,0,40V0h100V40z'
                  }
                )
              )
            )
          ),
          el('div',
            {
              className: 'obb-content-overlay',
              style: {
                backgroundColor: attributes.videooverlaycolor,
                opacity: attributes.videooverlayopacity
              }
            }
          ),
          attributes.youtubeurl && el('div',
            {
              className: 'obb-background-video-container youtube-video',
              style: {
                backgroundImage: attributes.imgURL !== '' ? 'url(' + attributes.imgURL + ')' : null
              }
            },
            el('iframe',
              {
                className: 'obb-background-video',
                src: attributes.youtubeurl + '?&autoplay=1&mute=1&loop=1​'
              }
            )
          ),
          attributes.videoURL && !attributes.youtubeurl && el('div',
            {
              className: 'obb-background-video-container',
              style: {
                backgroundImage: attributes.imgURL !== '' ? 'url(' + attributes.imgURL + ')' : null
              }
            },
            el('video',
              {
                className: 'obb-background-video',
                autoplay: '',
                muted: '',
                loop: ''
              },
              el('source',
                {
                  type: 'video/mp4',
                  src: attributes.videoURL
                }
              )
            )
          ),
          el('div',
            {
              className: 'obb-hero-content',
              style: {
                maxWidth: attributes.contentwidth !== '' ? attributes.contentwidth : null
              }
            },
            el(InnerBlocks, { template: heroTemplate })
          )
        )
      ]
    },

    example: function () {},

    save: function (props) {
      var attributes = props.attributes
      var featuredId = encodeURIComponent(wp.data.select('core/editor').getEditedPostAttribute('featured_media'))
      var featuredImgClass = attributes.featuredimgbg === true ? ' obb-has-featured-img' : ''
      var parallaxImgClass = attributes.imgparallax === true ? ' obb-featured-img-parallax' : ''
      var fullHeightClass = attributes.fullwindowheight === true ? ' obb-window-height' : ''

      return (
        el('div',
          {
            className: 'organic-block obb-hero' + ' obb-position-' + attributes.position.replace(/\s+/g, '-') + featuredImgClass + parallaxImgClass + fullHeightClass,
            style: {
              backgroundColor: attributes.bgcolor ? attributes.bgcolor : '#000',
              backgroundImage: attributes.imgURL !== '' ? 'url(' + attributes.imgURL + ')' : attributes.bggradient !== '' ? attributes.bggradient : null,
              // height: attributes.fullwindowheight !== false ? '100vh' : null,
              // maxHeight: attributes.fullwindowheight !== false ? '100vh' : null,
              minHeight: attributes.videoheight !== 0 ? attributes.videoheight : null,
              borderRadius: attributes.styleradius !== 0 ? attributes.styleradius : null,
              borderWidth: attributes.styleborderwidth !== 0 ? attributes.styleborderwidth : null,
              borderStyle: attributes.styleborderwidth !== 0 ? 'solid' : null,
              borderColor: attributes.styleborderwidth !== 0 ? attributes.stylebordercolor : null,
              boxShadow: attributes.styleshadow !== 0 ? '0 0 ' + attributes.styleshadow + 'px ' + attributes.styleshadowcolor : null
            }
          },
          el('svg',
            {
              class: 'clipping-path',
              width: 0,
              height: 0
            },
            el('defs', {},
              el('clipPath',
                {
                  id: 'wave-curve-right',
                  clipPathUnits: 'objectBoundingBox',
                  transform: 'scale(0.01, 0.02)'
                },
                el('path',
                  {
                    d: 'M100,0H0v44.7c0,0,8.1,4.8,26.4,5C48.7,49.8,59,38.5,79,37.3c12.7-0.7,21,4.6,21,4.6V0z'
                  }
                )
              )
            )
          ),
          el('svg',
            {
              class: 'clipping-path',
              width: 0,
              height: 0
            },
            el('defs', {},
              el('clipPath',
                {
                  id: 'wave-curve-left',
                  clipPathUnits: 'objectBoundingBox',
                  transform: 'scale(0.01, 0.02)'
                },
                el('path',
                  {
                    d: 'M0,0l100,0v44.7c0,0-8.1,4.8-26.4,5C51.3,49.8,41,38.5,21,37.3C8.2,36.6,0,41.9,0,41.9L0,0z'
                  }
                )
              )
            )
          ),
          el('svg',
            {
              class: 'clipping-path',
              width: 0,
              height: 0
            },
            el('defs', {},
              el('clipPath',
                {
                  id: 'bulge',
                  clipPathUnits: 'objectBoundingBox',
                  transform: 'scale(0.01, 0.02)'
                },
                el('path',
                  {
                    d: 'M100,40c0,0-20.7,10-50,10S0,40,0,40V0h100V40z'
                  }
                )
              )
            )
          ),
          el('div',
            {
              className: 'obb-content-overlay',
              style: {
                backgroundColor: attributes.videooverlaycolor,
                opacity: attributes.videooverlayopacity
              }
            }
          ),
          attributes.youtubeurl && el('div',
            {
              className: 'obb-background-video-container youtube-video',
              style: {
                backgroundImage: attributes.imgURL !== '' ? 'url(' + attributes.imgURL + ')' : null
              }
            },
            el('iframe',
              {
                className: 'obb-background-video',
                src: attributes.youtubeurl + '?&autoplay=1&mute=1&loop=1​'
              }
            )
          ),
          attributes.videoURL && !attributes.youtubeurl && el('div',
            {
              className: 'obb-background-video-container',
              style: {
                backgroundImage: attributes.imgURL !== '' ? 'url(' + attributes.imgURL + ')' : null
              }
            },
            el('video',
              {
                className: 'obb-background-video',
                autoplay: '',
                muted: '',
                loop: ''
              },
              el('source',
                {
                  type: 'video/mp4',
                  src: attributes.videoURL
                }
              )
            )
          ),
          el('div',
            {
              className: 'obb-hero-content',
              style: {
                maxWidth: attributes.contentwidth !== '' ? attributes.contentwidth : null
              }
            },
            el(InnerBlocks.Content)
          )
        )
      )
    }
  })
})(
  window.wp.data,
  window.wp.blocks,
  window.wp.blockEditor,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
  window.wp.apiFetch,
  window.wp.editPost,
  window.wp.coreData
)
